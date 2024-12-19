import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ 
    id, 
    images, 
    name, 
    price, 
    stock, 
    discount
}) => {
    const {currency, formatIDR} = useContext(ShopContext);

    const safeStock = typeof stock === 'number' ? stock : 0;
    const isOutOfStock = safeStock === 0;

    const safeDiscount = typeof discount === 'number' ? discount : 0;
    const hasDiscount = safeDiscount > 0;
    const discountedPrice = hasDiscount ? price * (1 - safeDiscount / 100) : price;

    return (
        <div className={`group relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 ${isOutOfStock ? 'opacity-75' : ''}`}>
            {isOutOfStock && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white font-bold bg-red-500 px-2 py-1 rounded">
                        Out of Stock
                    </span>
                </div>
            )}
            {hasDiscount && (
                <div className="absolute top-0 left-0 z-10 bg-primary text-white font-bold px-2 py-1 rounded-br">
                    {safeDiscount}% OFF
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
                    <div className="flex flex-col">
                        <div className="flex items-baseline">
                            <p className="text-xl font-bold text-primary mr-2">
                                {currency} {formatIDR(discountedPrice)}
                            </p>
                            {hasDiscount && (
                                <p className="text-base text-gray-500 line-through">
                                    {currency} {formatIDR(price)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductItem