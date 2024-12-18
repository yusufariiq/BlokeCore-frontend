import React from 'react'
import Categories from '../components/Category/Categories'
import Hero from '../components/Layout/Hero'
import Promo from '../components/Layout/Promo'
import Product from '../components/Product/Product'
import LogoCloud from '../components/Layout/LogoCloud'

function Home() {
  return (
    <>
      <Hero />
      <Product />
      <Categories />
      <Promo />
      <LogoCloud />
    </>
  )
}

export default Home