import React from 'react'
import Image from 'next/image'
import { getAllProducts, getProduct } from '../../lib/shopify'
import ProductForm from '../../components/ProductForm'

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
  const image = product.images.edges[0].node

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-96 w-full">
            <Image src={image.url} alt={image.altText} layout="fill" objectFit="cover" />
          </div>
        </div>
        <ProductForm />
      </div>
    </div>
  )
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
