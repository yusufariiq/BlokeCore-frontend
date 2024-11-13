import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);


    return (
        <div className='w-full'>
            <Title text={"CART"} />
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p className="">Subtotal</p>
                    <p className="">{currency}{getCartAmount()}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Free</p>
                    <p>{currency}{deliveryFee}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>TOTAL</p>
                    <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal