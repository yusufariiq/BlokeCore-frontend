import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Common/Title'
import ProductItem from './ProductItem'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Product = () => {
    const { getLatestProducts, products, error } = useContext(ShopContext)
    
    useEffect(() => {
        getLatestProducts()
    }, [getLatestProducts])

    if (error) {
        return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Title text={'Latest Collection'} />
            <div className="min-h-40 text-red-500">
            <p>Unable to load products. {error.message || 'Network error occurred'}</p>
            </div>
        </div>
        )
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Title text={'Latest Collection'} />
            <div className="flex items-end justify-end ">
                <NavLink
                to="/latest"
                className="text-primary text-lg hover:underline font-medium"
                >
                See all
                <FontAwesomeIcon icon={faChevronRight} className='ml-2 text-sm'/>
                </NavLink>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.length > 0 ? (
                    products.slice(0, 4).map((item) => (
                        <ProductItem 
                        key={item.name} 
                        id={item.id} 
                        images={item.images} 
                        name={item.name} 
                        price={item.price} 
                        />
                    ))
                ) : (
                    <p>No latest products available</p>
                )}
            </div>
        </div>
    )
}

export default Product