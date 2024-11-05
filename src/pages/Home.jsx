import React from 'react'
import Hero from '../components/Section/Hero'
import Collection from '../components/Section/Collection'
import Categories from '../components/Section/Categories'
import Promo from '../components/Section/Promo'

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Collection />
      <Promo />
      <Collection />
    </>
  )
}

export default Home