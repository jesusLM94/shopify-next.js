interface Images {
  node: {
    altText: string
    url: string
  }
}

export interface CollectionProduct {
  node: {
    id: string
    title: string
    handle: string
    images: { edges: Images[] }
    priceRange: {
      minVariantPrice: {
        amount: string
      }
    }
  }
}

export interface ProductPaths {
  node: {
    handle: string
    id: string
  }
}

export interface Product {
  id: string
  title: string
  handle: string
  description: string
  options: {
    name: string
    values: string[]
    id: string
  }[]
  images: {
    edges: {
      node: {
        url: string
        altText: string
      }
    }[]
  }
}
