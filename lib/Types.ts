export type Images = {
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

export interface Option {
  name: string
  values: string[]
  id: string
}

export interface VariantNode {
  selectedOptions: {
    name: string
    value: string
  }[]
  image: { url: string; altText: string }
  title: string
  id: string
  price: string
}

export interface Product {
  id: string
  title: string
  handle: string
  description: string
  options: Option[]
  variants: { edges: { node: VariantNode }[] }
  images: {
    edges: {
      node: {
        url: string
        altText: string
      }
    }[]
  }
}

export type ReduceReturnType = {
  [key: string]: string
}

export type VariantOptions = {
  id: string
  title: string
  handle: string
  image: string
  options: ReduceReturnType
  variantTitle: string
  variantPrice: string
  variantQuantity: number
}
