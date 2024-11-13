import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Common/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CartTotal from '../components/Common/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [ cartData, setCartData ] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
        tempData.push({
            id: itemId,
            sizes: size,
            quantity: cartItems[itemId][size],
        });
        }
    }
    }
    setCartData(tempData);
}, [cartItems]);

  return (
    <div className="min-h-[90vh] py-12 sm:py-20 mx-10 sm:mx-20">
      <Title text={"Shopping Cart"}/>
      <div className="my-8 py-12">
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product.id === item.id );

            return(
              <div key={index} className='py-4 border-t border-b text-black grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className="flex items-start gap-6">
                  <img src={productData.image[0]} alt="" className='w-16 sm:w-20'/>
                  <div className="">
                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.sizes}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.sizes, Number(e.target.value))}  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quantity} />
                <button type="button" onClick={() => updateQuantity(item.id, item.sizes, 0)}>
                  <FontAwesomeIcon icon={faTrashCan} className='text-lg text-primary hover:text-hover-primary' />
                </button>
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full my-5">
            <button onClick={() => navigate('/place-order')} className='flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-hover-primary'>PROCEED TO CHECK OUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart