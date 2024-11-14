import React, { useContext, useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faXmark,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { useCartData } from '../../hooks/useCartData';
import EmptyCart from '../Common/EmptyCart';

const CartSlider = ({ open, setOpen }) => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount, formatIDR } = useContext(ShopContext);
  const cartData = useCartData(cartItems);

    return (
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
  
                    <div className="mt-8">
                      <div className="flow-root">
                        {cartData.length === 0 ? (
                          <EmptyCart />
                        ) : (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartData.map((item, index) => { 
                            const productData = products.find((product) => product.id === item.id);
                            
                            return (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt=""
                                  src={productData.image[0]}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
  
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{productData.name}</h3>
                                    <p className="ml-4">{currency}{formatIDR(productData.price)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{productData.sizes}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.sizes, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                                    <div className="flex">
                                    <button type="button" onClick={() => updateQuantity(item.id, item.sizes, 0)}>
                                        <FontAwesomeIcon icon={faTrashCan} className='text-lg text-primary hover:text-hover-primary' />
                                        </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )})}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
  
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-black">
                      <p>Subtotal</p>
                      <p className='text-xl font-bold'>{currency}{getCartAmount()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <button onClick={() => navigate('/place-order')} className="w-full mt-6">
                      <NavLink
                        t0="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-hover-primary"
                      >
                        CHECKOUT
                      </NavLink>
                    </button>
                    <div className="mt-6">
                      <NavLink
                          to='/cart'
                          className="flex justify-center text-primary hover:text-hover-primary font-medium">
                          View & edit
                      </NavLink>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    )
}

export default CartSlider