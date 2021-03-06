import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MiniCart from './MiniCart'
import blackBuckLogo from '../public/blackbuck-logo.svg'
import { CartContext } from '../context/shopContext'
import { VariantOptions } from '../lib/Types'

const Nav = () => {
  const { cartOpen, setCartOpen, cart } = useContext(CartContext)

  let cartQuantity = 0
  cart.map((item: VariantOptions) => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image src={blackBuckLogo} alt="logo" height={30} width={180} />
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
