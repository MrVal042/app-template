export const capitalize = (text: string | null) =>
  !text || text == null
    ? text
    : text.charAt?.(0).toUpperCase?.() + text?.toLowerCase?.()?.slice?.(1)

export const formatNumber = (value: number, fixedTo?: number): string => {
  const abs = Math.abs(value)
  if (fixedTo) {
    if (abs >= 1_000_000_000)
      return `${(value / 1_000_000_000).toFixed(fixedTo)}B`
    if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(fixedTo)}M`
    if (abs >= 1_000) return `${(value / 1_000).toFixed(fixedTo)}K`
    return value.toString()
  }
  if (abs >= 1_000_000_000)
    return `${(value / 1_000_000_000).toLocaleString()}B`
  if (abs >= 1_000_000) return `${(value / 1_000_000).toLocaleString()}M`
  if (abs >= 1_000) return `${(value / 1_000).toLocaleString()}K`
  return value?.toString?.()
}

export const convertToFormItems = (arr: string[]) =>
  arr.map((lst) => ({ label: lst, value: lst }))

type CurrencySymbol = 'NGN' | 'USD' | 'GBP' | 'EUR'

const currencySymbols: Record<CurrencySymbol, string> = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  EUR: '€',
}

export function formatCurrency(
  value: number | string | null,
  currency?: null | CurrencySymbol | string
): string {
  if (!value) return 'NA'
  const symbol = currencySymbols[(currency as CurrencySymbol) || 'GBP']
  const _value = typeof value === 'string' ? Number(value) : value
  const isNegative = _value < 0
  const formatted = formatNumber(Math.abs(_value))

  return `${isNegative ? '-' : ''}${symbol}${formatted}`
}

export function slugify(name: string): string {
  return name
    .normalize('NFKD') // Normalize accents/diacritics
    .replace(/[’‘']/g, '') // Remove smart quotes/apostrophes
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, '') // Trim leading/trailing dashes
    .toLowerCase()
}

export const filterPayload = <T extends Record<string, any>>(payload: T) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'number') return Number.isFinite(value) && value > 0
      if (typeof value === 'string') return value.trim().length > 0
      return value !== null && value !== undefined
    })
  ) as T
}

export const getIdentifier = (uri: string) => {
  const base = uri.split('/').pop() || ''
  const match = base.match(/^(.*?)(?:\.[^.]+)?$/) // strip extension if exists
  return match?.[1] || base
}

export const formatLikes = (count: number) => {
  const K = 1000
  const M = 1000000
  const B = 1000000000

  if (count >= B) {
    return `${(count / B).toFixed(1)}B`
  }
  if (count >= M) {
    return `${(count / M).toFixed(1)}M`
  }
  if (count >= K) {
    return `${(count / K).toFixed(1)}k`
  }
  return count ? count.toString() : 0
}
