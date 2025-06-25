// import Share, { ShareSingleOptions } from 'react-native-share'
// type ShareContentProps = {
//   title: string
//   message?: string
//   url?: string
//   filename?: string
// }
// export const handleShare = async (content: ShareContentProps | 'invite') => {
//   switch (content) {
//     case 'invite':
//       return await Share.open({
//         message: 'Join me in creating and smashing targets.',
//         title: 'I invite you to Domivue app',
//         url: 'https://domivue.app/',
//       } as ShareSingleOptions).catch((err) => handleError(err as IError))
//     default:
//       return await Share.open({
//         ...content,
//         message: content.message || 'Here is the transaction receipt',
//       } as ShareSingleOptions).catch((err) => handleError(err as IError))
//   }
// }

interface DynamicObject {
  [key: string]: any
}

interface SearchDataProps<ItemT> {
  query: string
  queryArr: keyof ItemT | (keyof ItemT)[]
  queryData: ItemT[] | undefined
}

// export const searchData = <ItemT extends DynamicObject>({
//   queryData,
//   query,
//   queryArr,
// }: SearchDataProps<ItemT>) => {
//   if (!query) {
//     return queryData
//   }

//   return queryData?.filter((item) => {
//     if (typeof queryArr === 'string') {
//       const result = item[queryArr]?.toLowerCase().includes(query.toLowerCase())
//       return result
//     } else if (Array.isArray(queryArr)) {
//       const result2 = queryArr.find((lst) =>
//         item[lst]?.toLowerCase().includes(query.toLowerCase())
//       )
//       return result2
//     }
//   })
// }

// Type for the searchData function's props
interface SearchDataProps<ItemT> {
  queryData: ItemT[] | undefined
  query: string
  queryArr: keyof ItemT | (keyof ItemT)[] // Use keyof for type safety if ItemT is well-defined
  // Or stick to string | string[] if properties are dynamic
}

// The searchData function (optimized)
export const searchData = <ItemT extends { [key: string]: any }>({
  // Using a generic object type for ItemT
  queryData,
  query,
  queryArr, // This will be 'label' in the SelectDropdown
}: SearchDataProps<ItemT>): ItemT[] => {
  if (!query || !queryData) {
    return queryData || [] // Return original or empty array if no query or data
  }

  const lowerCaseQuery = query.toLowerCase() // Calculate once

  return queryData.filter((item) => {
    if (typeof queryArr === 'string') {
      const value = item[queryArr]
      // Ensure the property exists and is a string before calling toLowerCase()
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(lowerCaseQuery)
      )
    } else if (Array.isArray(queryArr)) {
      // Ensure properties exist and are strings before calling toLowerCase()
      return queryArr.some((key) => {
        const value = item[key]
        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery)
        )
      })
    }
    return false // If queryArr is not a string or array, item doesn't match
  })
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
