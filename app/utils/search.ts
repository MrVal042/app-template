interface Property {
  id: string
  title: string
  location: {
    address: string
    state: string
    area: string
  }
  propertyType: string
  price: number
  tags: {
    [key: string]: string[]
  }
  // Add other fields as needed
}

export const searchProperties = (
  data: Property[],
  keyword: string,
  filters: {
    location?: string
    propertyType?: string
    minPrice?: number
    maxPrice?: number
  }
): Property[] => {
  const keywordLower = keyword.toLowerCase()

  return data.filter((property) => {
    const inTitle = property.title.toLowerCase().includes(keywordLower)
    const inLocation =
      property.location.address.toLowerCase().includes(keywordLower) ||
      property.location.area.toLowerCase().includes(keywordLower) ||
      property.location.state.toLowerCase().includes(keywordLower)

    const matchKeyword = inTitle || inLocation

    const matchLocation = filters.location
      ? property.location.area
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      : true

    const matchType = filters.propertyType
      ? property.propertyType.toLowerCase() ===
        filters.propertyType.toLowerCase()
      : true

    const matchPrice =
      (filters.minPrice ? property.price >= filters.minPrice : true) &&
      (filters.maxPrice ? property.price <= filters.maxPrice : true)

    return matchKeyword && matchLocation && matchType && matchPrice
  })
}
