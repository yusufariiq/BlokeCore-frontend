import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCartData } from '../../hooks/useCartData';
import { useAuth } from '../../context/AuthContext';

import CartTotal from '../../components/Product/CartTotal';
import EmptyCart from '../../components/Product/EmptyCart';
import Title from '../../components/Common/Title';

const Cart = () => {
  const { 
    allProducts, 
    currency, 
    cartItems, 
    updateQuantity, 
    navigate, 
    getCartAmount, 
    formatIDR,
    DEFAULT_DELIVERY_FEE,
  } = useContext(ShopContext);
  const { isAuthenticated } = useAuth();
  const cartData = useCartData(cartItems);

  const [selectedShipping, setSelectedShipping] = useState('jne-reguler')
  
  return (
    <div className="min-h-screen py-12 sm:py-20 mx-10 sm:mx-20">
      <Title text={"Shopping Cart"}/>
      
      {cartData.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-8 py-12">
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-[4fr_0.5fr_1fr_0.5fr] sm:grid-cols-[4.5fr_1fr_1fr_0.5fr]">
              <p className='text-2xl font-medium'>Item</p>
              <p className='text-2xl font-medium'>Price</p>
              <p className='text-2xl font-medium'>Qty</p>
              <p className='text-2xl font-medium'>Subtotal</p>
            </div>
            <hr className='my-3'/>            
            {
              cartData.map((item, index) => {
                const productData = allProducts.find((product) => product.id === item.id );

                return(
                  <div className='mb-2'>
                    <div key={index} className='py-4text-black grid grid-cols-[4fr_0.5fr_1fr_0.5fr] sm:grid-cols-[4.5fr_1fr_1fr_0.5fr] items-center gap-4'>
                      <div className="flex items-start gap-6">
                        <img src={productData.images[0]} alt="" className='w-[150px] sm:w-[165px]'/>
                        <div>
                          <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                          <div className="flex items-center gap-5 mt-2">
                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.sizes}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p>{currency} {formatIDR(productData.price)}</p>
                      </div>
                      <div>
                        <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.sizes, Number(e.target.value))}  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quantity} />
                      </div>
                      <div>
                        <p>{currency}{getCartAmount()}</p>
                      </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" onClick={() => updateQuantity(item.id, item.sizes, 0)}>
                            <FontAwesomeIcon icon={faTrashCan} className='text-lg text-primary hover:text-hover-primary' />
                      </button>
                  </div>
                </div>
                )
              })
            }
          </div>

          <div className="col-span-1">
            <div className="flex justify-end">
              <div className="w-full lg:w-[450px]">
                <CartTotal 
                  selectedShippingOption={{
                    id: selectedShipping,
                    price: DEFAULT_DELIVERY_FEE
                  }}
                />
                <div className="w-full my-5">
                  <button onClick={() => navigate('/checkout')} className='w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-hover-primary'>PROCEED TO CHECK OUT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) 
    }  
    </div>
  )
}

export default Cart