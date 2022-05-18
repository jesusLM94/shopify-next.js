import React, { ReactElement } from 'react'
import Nav from './Nav'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Nav />
      <main>{children}</main>
    </div>
  )
}

export default Layout
