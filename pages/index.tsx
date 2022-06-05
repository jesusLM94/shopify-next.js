import { getProductsInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import { CollectionProduct } from '../lib/Types'
import Hero from '../components/Hero'

const Home = ({ products }: { products: CollectionProduct[] }) => {
  return (
    <div>
      <Hero />
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: { products },
  }
}

export default Home
