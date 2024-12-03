import React, {useEffect, useContext} from 'react'
import Title from '../components/Common/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const Payment = () => {
    const location = useLocation();
    const { paymentMethod, grandTotal, userEmail } = location.state || {};
    const { navigate, currency, formatIDR } = useContext(ShopContext)

    useEffect(() => {
        if (!paymentMethod || !grandTotal || !userEmail) {
            navigate('/checkout');
            return;
        }
    }, [paymentMethod, grandTotal, navigate, userEmail]);

    return (
        <div className="min-h-[90vh] py-12 sm:py-20 mx-10 sm:mx-20">
            <FontAwesomeIcon icon={faCheckCircle} className='flex mx-auto justify-center text-4xl md:text-8xl text-primary' />
            <Title text={"Your order has been successfully placed"}/> 
            <p className='text-center text-lg'>
                Thank you for shopping at BlokeCore, the order confirmation email has been sent 
                <b>{' '}{userEmail}</b>. 
                <br/>
                Please check your spam folder if the email has not been received
            </p>

            <div className="grid grid-cols-[2fr_1fr_2fr] my-12 max-w-xl mx-auto gap-3">
                <div className="">
                    <p>Order Status</p>
                    <p>Payment Method</p>
                    <p>Grand Total</p>
                </div>
                <div className="text-right">
                    <p>:</p>
                    <p>:</p>
                    <p>:</p>
                </div>
                <div className="font-semibold">
                    <p>Pending</p>
                    <p>Cash on Delivery</p>
                    <p>{currency}{' '}{formatIDR(grandTotal)}</p>  
                </div>
            </div>

            <div className="flex mx-auto md:max-w-3xl justify-center font-medium gap-5">
                <button onClick={() => navigate('/')} className='w-full px-4 py-3 border-2 border-primary hover:bg-hover-white rounded-lg '>Continue shopping</button>
                <button onClick={() => navigate('/order')} className='w-full px-4 py-3 bg-primary hover:bg-hover-primary rounded-lg text-white '>Check your orders</button>
            </div>
        </div>
    )
}

export default Payment