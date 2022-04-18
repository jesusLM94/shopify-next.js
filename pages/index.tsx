import { getProductsInCollection } from '../lib/shopify'
import ProductList from '../components/ProductList'

interface Images {
  node: {
    altText: string
    url: string
  }
}

export interface Product {
  node: {
    id: string
    title: string
    handle: string
    images: { edges: Images[] }
  }
}

const Home = ({ products }: { products: Product[] }) => {
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
