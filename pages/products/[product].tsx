import React, { ReactElement } from 'react'
import Image from 'next/image'
import ProductForm from '../../components/ProductForm'
import RecommendedList from '../../components/RecommendedList'
import { getAllProducts, getProduct } from '../../lib/shopify'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Product, ProductPaths, Images } from '../../lib/Types'

const ProductPage = ({ product }: { product: Product }) => {
  const images: ReactElement[] = []

  const relatedProducts =
    product.collections.edges[1]?.node?.products?.edges ??
    product.collections.edges[0]?.node?.products?.edges ??
    []

  product.images.edges.map((image: Images, i: number) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image src={image.node.url} alt={image.node.altText} layout="fill" objectFit="cover" />
      </SwiperSlide>,
    )
  })

  SwiperCore.use([Navigation, Pagination])

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-96 w-full">
            <Swiper
              style={
                // @ts-ignore
                //Leave until Swiper fixes this
                { '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }
              }
              navigation
              pagination={{ clickable: true }}
              className="h-96 rounded-2xl"
              loop={true}
            >
              {images}
            </Swiper>
          </div>
        </div>
        <ProductForm product={product} />
      </div>
      <p className="pt-16 space-y-8 md:space-x-4 lg:space-x-8 max-w-3xl w-11/12 mx-auto">
        {product.description}
      </p>
      <RecommendedList current={product.id} products={relatedProducts} />
    </div>
  )
}

export async function getStaticPaths() {
  const products = await getAllProducts()

  const paths = products.map((product: ProductPaths) => ({
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
