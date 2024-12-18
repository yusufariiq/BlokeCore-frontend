import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, images, name, price, stock}) => {
  
    const {currency, formatIDR} = useContext(ShopContext);

    const safeStock = typeof stock === 'number' ? stock : 0;
    const isOutOfStock = safeStock === 0;

    return (
        <div className={`group relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 ${isOutOfStock ? 'opacity-75' : ''}`}>
            {isOutOfStock && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white font-bold bg-red-500 px-2 py-1 rounded">
                        Out of Stock
                    </span>
                </div>
            )}
            <Link
                className={`block h-full ${isOutOfStock ? 'pointer-events-none' : 'cursor-pointer'}`}
                to={`/product/${id}`}
            >
                <div className="group relative">
                    <div className="h-72 w-full overflow-hidden rounded-md bg-hover-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img 
                            className='h-full w-full object-cover object-center'
                            src={Array.isArray(images) ? images[0] : images}
                            alt={name}
                        />
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {name}
                    </h3>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-primary">
                        {currency} {formatIDR(price)}
                        </p>
                        <p className={`text-sm font-medium px-2 py-1 rounded-full ${
                        isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                        {isOutOfStock ? 'Out of Stock' : `${stock} Available`}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductItem