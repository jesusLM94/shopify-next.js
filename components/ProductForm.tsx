import React, { useContext, useState } from 'react'
import ProductOptions from './ProductOptions'
import { CartContext } from '../context/shopContext'
import { formatter } from '../utils/helpers'
import { Product, VariantNode, VariantOptions, ReduceReturnType } from '../lib/Types'

const ProductForm = ({ product }: { product: Product }) => {
  const { title, variants, options } = product
  const { addToCart } = useContext(CartContext)

  const defaultOptions = options.reduce<ReduceReturnType>(
    (accum: ReduceReturnType, option: { name: string; values: string[] }) => {
      accum[option.name] = option.values[0]

      return accum
    },
    {},
  )

  const allVariantOptions = variants.edges?.map((variant: { node: VariantNode }) => {
    const allOptions: ReduceReturnType = {}

    variant.node.selectedOptions.map((item: { name: string; value: string }) => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price,
      variantQuantity: 1,
    }
  })

  const [selectedOptions, setSelectedOptions] = useState<ReduceReturnType>(defaultOptions)
  const [selectedVariant, setSelectedVariant] = useState<VariantOptions>(allVariantOptions[0])

  const setOptions = (optionName: string, optionValue: string) => {
    const selection = {
      ...selectedOptions,
      [optionName]: optionValue,
    }

    setSelectedOptions(selection)

    allVariantOptions.map((item: VariantOptions) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="pb-6">
        {
          // @ts-ignore
          // ignore until these types are updated by Typescript
          formatter.format(variants.edges[0].node.price)
        }
      </span>
      {options.map((option: { name: string; values: string[] }) => {
        return (
          <ProductOptions
            key={option.name}
            name={option.name}
            values={option.values}
            setOptions={setOptions}
            selectedOptions={selectedOptions}
          />
        )
      })}
      <button
        onClick={() => addToCart(selectedVariant)}
        className="bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductForm
