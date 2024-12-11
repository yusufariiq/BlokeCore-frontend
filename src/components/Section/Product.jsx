import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Common/Title'
import ProductItem from '../Collections/ProductItem'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Product = () => {
    const { getLatestProducts, products, error } = useContext(ShopContext)
    const [latestCollections, setLatestCollections] = useState([])
    
    useEffect(() => {
        getLatestProducts()
    }, [])

    useEffect(() => {
        if (Array.isArray(products)) {
            setLatestCollections(products.slice(0, 4))
        }
    }, [products])

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

        { error ?  (
            <div className="min-h-40">
                <p>
                    Error: {error}
                </p>
            </div>
        ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {latestCollections.length > 0 ? (
                    latestCollections.map((item) => (
                        <ProductItem 
                        key={item.id} 
                        id={item.id} 
                        images={item.images} 
                        name={item.name} 
                        price={item.price} 
                        />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        )}
        </div>
    )
}

export default Product