import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Common/Title';
import ProductItem from '../Collections/ProductItem';

const Product = () => {
  const { latestProducts } = useContext(ShopContext);
  const [ latestCollections, setLatestCollections ] = useState([]);

  useEffect(() => {
      setLatestCollections(latestProducts.slice(0,4));
  },[])

  return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <Title text={"Latest Collection"} />
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {
                      latestCollections.map((item, index) => (
                          <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
                      ))
                  }
              </div>
      </div>
  )
}

export default Product