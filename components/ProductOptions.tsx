import React from 'react'

interface Props {
  //Tamaño
  name: string
  //Mediano, Grande, etc
  values: string[]
  setOptions: (optionName: string, optionValue: string) => void
  selectedOptions: { [key: string]: string }
}

const ProductOptions = ({ name, values, selectedOptions, setOptions }: Props) => {
  return (
    <fieldset>
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
                className={`p-2 my-3 text-lg rounded-full cursor-pointer mr-3 ${
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
