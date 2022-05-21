import React from 'react'
import ProductOptions from './ProductOptions'
import { formatter } from '../utils/helpers'
import { Product } from '../lib/Types'

type ReduceReturnType = {
  [key: string]: string
}

const ProductForm = ({ product }: { product: Product }) => {
  const { title, variants, options } = product

  const defaultOptions = options.reduce<ReduceReturnType>(
    (accum: ReduceReturnType, option: { name: string; values: string[] }) => {
      accum[option.name] = option.values[0]

      return accum
    },
    {},
  )

  console.log(defaultOptions)
  const [selectedOptions, setSelectedOptions] = React.useState(defaultOptions)

  const setOptions = (optionName: string, optionValue: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: optionValue,
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
    </div>
  )
}

export default ProductForm
