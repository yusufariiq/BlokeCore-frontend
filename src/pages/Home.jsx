import React from 'react'
import Categories from '../components/Section/Categories'
import Hero from '../components/Section/Hero'
import Promo from '../components/Section/Promo'
import Product from '../components/Section/Product'

function Home() {
  return (
    <>
      <Hero />
      <Product />
      <Categories />
      <Promo />
      <Product />
    </>
  )
}

export default Home