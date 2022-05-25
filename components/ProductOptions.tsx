import React from 'react'

type ReduceReturnType = {
  [key: string]: string
}

type VariantOptions = {
  id: string
  title: string
  handle: string
  image: string
  options: ReduceReturnType
  variantTitle: string
  variantPrice: number
  variantQuantity: number
}

type Props = {
  name: string
  values: string[]
  setOptions: (optionName: string, optionValue: string) => void
  selectedOptions: { [key: string]: string }
  selectedVariant?: VariantOptions
}

const ProductOptions = ({ name, values, selectedOptions, setOptions }: Props) => {
  return (
    <fieldset className="mt-3">
      <legend className="text-xl font-semibold ">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map((value: string) => {
          const id = `option-${name}-${value}`
          const checked = selectedOptions[name] === value

          return (
            <label key={id} htmlFor={id}>
              <input
                id={id}
                type="radio"
                value={value}
                checked={checked}
                className="sr-only"
                name={`option-${name}`}
                onChange={() => setOptions(name, value)}
              />
              <div
                className={`p-2 mt-3 text-lg rounded-full cursor-pointer mr-3 ${
                  checked ? 'text-white bg-gray-900' : 'text-gray-900 bg-gray-200'
                }`}
              >
                <span className="px-2">{value}</span>
              </div>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default ProductOptions
