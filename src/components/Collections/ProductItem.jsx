import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
  
    const {currency} = useContext(ShopContext);
    
    return (
        <Link className='text-black cursor-pointer' to={`/product/${id}`}>
            <div className="group relative">
                <div className="h-72 w-full overflow-hidden rounded-md bg-gray-800 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img 
                        className='h-full w-full object-cover object-center'
                        src={image[0]}
                    />
                </div>
            </div>
            <div className="mt-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base text-black">
                    <p>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {name}
                    </p>
                  </h3>
                </div>
                <p className="mt-2 text-lg font-bold text-primary"> 
                    {currency}{price}
                </p>
              </div>
        </Link>
    )
}

export default ProductItem