import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import ProductItem from './ProductItem';
import Title from '../Common/Title';

const RelatedProduct = ({category, subcategory}) => {
    const { products } = useContext(ShopContext);
    const [ related, setRelated ] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsRelated = products.slice();
            productsRelated = productsRelated.filter((item) => category === item.category);
            productsRelated = productsRelated.filter((item) => subcategory === item.subcategory);

            setRelated(productsRelated.slice(0,3))
        }
    }, [products])
  
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Title text={"Related Product"} />
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {
                related.map((item, index) => (
                    <ProductItem key={index} id={item.id} images={item.images} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProduct