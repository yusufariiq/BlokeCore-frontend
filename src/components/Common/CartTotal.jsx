import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'

const CartTotal = () => {

    const { currency, deliveryFee, getCartAmount, getCartAmountRaw, formatIDR } = useContext(ShopContext);

    return (
        <div className='w-full'>
            <p className='text-2xl font-medium text-left'>Summary</p>
            <hr className='my-3'/>
            <div className="flex flex-col gap-3 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Free</p>
                    <p>{currency}{formatIDR(deliveryFee)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p className='text-2xl'>TOTAL</p>
                    <p className='text-2xl font-medium'>
                        {currency}{formatIDR(getCartAmountRaw() + deliveryFee)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal