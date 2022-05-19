import { getProductsInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'
import { CollectionProduct } from '../lib/Types'

const Home = ({ products }: { products: CollectionProduct[] }) => {
  return (
    <div>
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
