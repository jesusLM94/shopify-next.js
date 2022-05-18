import { Product } from '../pages'
import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '../utils/helpers'

const ProductCard = ({ product }: { product: Product }) => {
  const { handle, title, priceRange } = product.node
  const { url, altText } = product.node.images.edges[0].node
  const price = priceRange.minVariantPrice.amount

  return (
    <Link href={`/products/${handle}`}>
      <a className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
          <div className="relative group-hover:opacity-75 h-72">
            <Image src={url} alt={altText} layout="fill" objectFit="cover" />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">{
          // @ts-ignore
          // ignore until these types are updated by Typescript
          formatter.format(price)}
        </p>
      </a>
    </Link>
  )
}

export default ProductCard
