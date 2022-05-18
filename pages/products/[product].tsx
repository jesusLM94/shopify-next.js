import React from 'react'
import { getAllProducts, getProduct } from '../../lib/shopify'

interface ProductForPaths {
  node: {
    handle: string
    id: string
  }
}

interface Product {
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

const ProductPage = ({ product }: { product: Product }) => {
  return <div>{product.title}</div>
}

export async function getStaticPaths() {
  const products = await getAllProducts()

  const paths = products.map((product: ProductForPaths) => ({
    params: {
      product: product.node.handle.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { product: string } }) {
  const product = await getProduct(params.product)

  return {
    props: {
      product,
    },
  }
}

export default ProductPage
