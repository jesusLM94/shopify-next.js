import React, { ReactElement, createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'
import { VariantOptions } from '../lib/Types'

interface CartContextI {
  cart: VariantOptions[]
  cartOpen: boolean
  setCartOpen: (cartOpen: boolean) => void
  addToCart: (newItem: VariantOptions) => void
  checkoutUrl: string
  removeCartItem: (itemToRemove: string) => void
}

const CartContext = createContext<CartContextI>({
  cart: [],
  cartOpen: false,
  setCartOpen: () => {},
  addToCart: () => {},
  checkoutUrl: '',
  removeCartItem: () => {},
})

export default function ShopProvider({ children }: { children: ReactElement }) {
  const [cart, setCart] = useState<VariantOptions[]>([])
  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const [checkoutId, setCheckoutId] = useState<string>('')
  const [checkoutUrl, setCheckoutUrl] = useState<string>('')

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id)

      if (cartObject[0].id) {
        setCart([cartObject[0]])
      } else if (cartObject[0].length > 0) {
        setCart([...cartObject[0]])
      }

      setCheckoutId(cartObject[1].id)
      setCheckoutUrl(cartObject[1].webUrl)
    }
  }, [])

  const addToCart = async (newItem: VariantOptions) => {
    setCartOpen(true)
    if (cart.length === 0) {
      setCart([newItem])
      const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
    } else {
      let newCart: VariantOptions[] = []
      let added = false

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
          added = true
        }
      })

      if (!added) {
        newCart = [...cart, newItem]
      }

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
    }
  }

  async function removeCartItem(itemToRemove: string) {
    const updatedCart = cart.filter((item: VariantOptions) => item.id !== itemToRemove)

    setCart(updatedCart)
    const newCheckout = await updateCheckout(checkoutId, updatedCart)
    localStorage.setItem('checkout_id', JSON.stringify([updatedCart, newCheckout]))

    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, cartOpen, setCartOpen, addToCart, checkoutUrl, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

const shopConsumer = CartContext.Consumer

export { CartContext, shopConsumer }
