export interface SearchDataProps<ItemT> {
  queryData: ItemT[] | undefined
  query: string
  queryArr?: keyof ItemT | (keyof ItemT)[]
}

export function searchData<ItemT extends Record<string, any>>({
  queryData,
  query,
  queryArr,
}: SearchDataProps<ItemT>): ItemT[] {
  if (!queryData || !query || query.trim().length < 2) return queryData || []

  const lowerQuery = query.toLowerCase().trim()

  // --- Helper: deep flatten object values (recursive)
  const extractValues = (obj: any): string[] => {
    if (obj == null) return []
    if (typeof obj === 'string' || typeof obj === 'number') return [String(obj)]
    if (Array.isArray(obj)) return obj.flatMap(extractValues)
    if (typeof obj === 'object')
      return Object.values(obj).flatMap(extractValues)
    return []
  }

  return queryData.filter((item) => {
    // 1️⃣ If queryArr is specified, search only in those keys
    if (queryArr) {
      const keys = Array.isArray(queryArr) ? queryArr : [queryArr]
      return keys.some((key) => {
        const value = item[key]
        if (value == null) return false

        if (typeof value === 'string' || typeof value === 'number') {
          return String(value).toLowerCase().includes(lowerQuery)
        }

        // Deep search in nested arrays or objects under specified keys
        const flattened = extractValues(value)
        return flattened.some((v) => v.toLowerCase().includes(lowerQuery))
      })
    }

    // 2️⃣ Otherwise, do a full deep search across all object fields
    const allValues = extractValues(item)
    return allValues.some((v) => v.toLowerCase().includes(lowerQuery))
  })
}

interface DynamicObject {
  [key: string]: any
}
interface SortDataProps<ItemT> {
  sortBy: keyof ItemT
  dataToSort: ItemT[] | undefined
}

export const sortDataBy = <ItemT extends DynamicObject>({
  dataToSort,
  sortBy,
}: SortDataProps<ItemT>) => {
  if (!dataToSort) {
    return []
  }
  const sortedData = dataToSort.slice().sort((a, b) => {
    const idA = typeof a[sortBy] === 'number' ? a[sortBy] : Number(a[sortBy])
    const idB = typeof b[sortBy] === 'number' ? b[sortBy] : Number(b[sortBy])
    return idB - idA
  })
  return sortedData.reverse()
}

interface SmartSearch<ItemT> {
  queryData: ItemT[] | undefined
  query: string
  queryArr?: (keyof ItemT)[] // optional: specify fields to prioritize
  weights?: Partial<Record<keyof ItemT, number>> // optional weighting system
}

/**
 * WeightedSmartSearch – relevance-based search with scoring & ranking.
 */
export const weightedSmartSearch = <ItemT extends Record<string, any>>({
  queryData,
  query,
  queryArr,
  weights = {},
}: SmartSearch<ItemT>): ItemT[] => {
  if (!query || !queryData) return queryData || []

  const queryLower = query.toLowerCase().trim()
  if (queryLower.length < 2) return queryData

  // Recursive extractor for nested data
  const extractValues = (obj: any): string[] => {
    if (!obj) return []
    if (typeof obj === 'string' || typeof obj === 'number') return [String(obj)]
    if (Array.isArray(obj)) return obj.flatMap(extractValues)
    if (typeof obj === 'object')
      return Object.values(obj).flatMap(extractValues)
    return []
  }

  // Compute score for one item
  const computeScore = (item: ItemT): number => {
    let score = 0

    const fields = queryArr?.length
      ? queryArr
      : (Object.keys(item) as (keyof ItemT)[])

    for (const key of fields) {
      const val = item[key]
      const weight = weights[key] ?? 1

      if (typeof val === 'string' || typeof val === 'number') {
        const valueLower = String(val).toLowerCase()
        if (valueLower === queryLower) score += 5 * weight // perfect match
        else if (valueLower.includes(queryLower)) score += 3 * weight
      } else if (typeof val === 'object') {
        const flattened = extractValues(val)
        flattened.forEach((v) => {
          const valueLower = v.toLowerCase()
          if (valueLower === queryLower) score += 2 * weight
          else if (valueLower.includes(queryLower)) score += 1 * weight
        })
      }
    }

    return score
  }

  // Rank by score
  const scored = queryData
    .map((item) => ({ item, score: computeScore(item) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map((s) => s.item)
}

interface SmartSearch2<ItemT> {
  queryData: ItemT[] | undefined
  query: string
  queryArr?: (keyof ItemT)[]
  weights?: Partial<Record<keyof ItemT, number>>
  fuzziness?: number // e.g. 0.8 means allow up to 20% deviation
}

/**
 * weightedSmartSearchV2 — fuzzy + weighted + recursive search
 * Handles typos, nested data, and prioritization.
 */
export const weightedSmartSearchV2 = <ItemT extends Record<string, any>>({
  queryData,
  query,
  queryArr,
  weights = {},
  fuzziness = 0.8,
}: SmartSearch2<ItemT>): ItemT[] => {
  if (!query || !queryData) return queryData || []

  const queryLower = query.toLowerCase().trim()
  if (queryLower.length < 2) return queryData

  // ---- Utility: Recursive flattener ----
  const extractValues = (obj: any): string[] => {
    if (!obj) return []
    if (typeof obj === 'string' || typeof obj === 'number') return [String(obj)]
    if (Array.isArray(obj)) return obj.flatMap(extractValues)
    if (typeof obj === 'object')
      return Object.values(obj).flatMap(extractValues)
    return []
  }

  // ---- Utility: Fast Levenshtein Similarity ----
  const similarity = (a: string, b: string): number => {
    if (a === b) return 1
    const lenA = a.length,
      lenB = b.length
    if (Math.abs(lenA - lenB) > 3) return 0 // early exit optimization

    const dp = Array.from({ length: lenA + 1 }, (_, i) => [i])
    for (let j = 1; j <= lenB; j++) dp[0][j] = j

    for (let i = 1; i <= lenA; i++) {
      for (let j = 1; j <= lenB; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        )
      }
    }
    const distance = dp[lenA][lenB]
    return 1 - distance / Math.max(lenA, lenB)
  }

  // ---- Core Scoring Function ----
  const computeScore = (item: ItemT): number => {
    let score = 0
    const fields = queryArr?.length
      ? queryArr
      : (Object.keys(item) as (keyof ItemT)[])

    for (const key of fields) {
      const val = item[key]
      const weight = weights[key] ?? 1

      const checkAndScore = (v: string) => {
        const valueLower = v.toLowerCase()
        if (valueLower === queryLower) score += 5 * weight
        else if (valueLower.includes(queryLower)) score += 3 * weight
        else {
          const sim = similarity(valueLower, queryLower)
          if (sim >= fuzziness) score += sim * 2 * weight
        }
      }

      if (typeof val === 'string' || typeof val === 'number')
        checkAndScore(String(val))
      else if (val && typeof val === 'object')
        extractValues(val).forEach(checkAndScore)
    }

    return score
  }

  // ---- Rank results ----
  const ranked = queryData
    .map((item) => ({ item, score: computeScore(item) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  return ranked.map((r) => r.item)
}
