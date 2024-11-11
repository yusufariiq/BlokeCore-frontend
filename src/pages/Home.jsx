import React from 'react'
import Categories from '../components/Section/Categories'
import Hero from '../components/Section/Hero'
import Promo from '../components/Section/Promo'
import Product from '../components/Section/Product'
import LogoCloud from '../components/Section/LogoCloud'

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