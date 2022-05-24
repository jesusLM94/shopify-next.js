import React, { useContext } from 'react'
import Link from 'next/link'
import MiniCart from './MiniCart'
import { CartContext } from '../context/shopContext'

type CartItem = {
  id: string
  variantQuantity: number
}

const Nav = () => {
  const { cartOpen, setCartOpen, cart } = useContext(CartContext)

  let cartQuantity = 0
  cart.map((item: CartItem) => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">BlackBuck Studio</span>
          </a>
        </Link>
        <a className="text-md font-bold cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
          Carrito ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}

export default Nav
