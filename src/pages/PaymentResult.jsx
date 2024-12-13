import React, { useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Common/Title'

const PaymentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currency, formatIDR } = useContext(ShopContext)

    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');
    const statusCode = queryParams.get('status_code');
    const transactionStatus = queryParams.get('transaction_status');

    const { paymentMethod, grandTotal, userEmail } = location.state || {};
    
    const isCOD = paymentMethod === 'cod';

    const isSuccess = isCOD || (statusCode === '200' && transactionStatus === 'settlement');

    useEffect(() => {
        if (!isCOD && (!orderId || !statusCode || !transactionStatus)) {
            navigate('/checkout');
        }
        if (isCOD && (!paymentMethod || !grandTotal || !userEmail)) {
            navigate('/checkout');
        }
    }, [isCOD, orderId, statusCode, transactionStatus, paymentMethod, grandTotal, userEmail, navigate]);

    const getTransactionStatusText = (status) => {
        switch (status) {
            case 'settlement':
                return 'Successful';
            case 'pending':
                return 'Pending Payment';
            case 'deny':
                return 'Denied';
            case 'cancel':
                return 'Canceled';
            case 'expire':
                return 'Expired';
            default:
                return 'Unknown Status';
        }
    };

    return (
        <div className="min-h-[90vh] py-12 sm:py-20 mx-10 sm:mx-20">
            <FontAwesomeIcon 
                icon={isSuccess ? faCheckCircle : faTimesCircle} 
                className={`flex mx-auto justify-center text-4xl md:text-8xl ${isSuccess ? 'text-green-500' : 'text-red-500'}`} 
            />
            <Title 
                text={
                    isSuccess 
                        ? "Your order has been successfully placed" 
                        : "Payment unsuccessful"
                }
            />
            <p className="max-w-4xl mx-auto text-center text-lg">
                {isSuccess
                    ? `Thank you for shopping at BlokeCore. The order confirmation email has been sent to ${
                          isCOD ? userEmail : 'your registered email address'
                      }.
                      Please check your spam folder if the email has not been received.`
                    : "We're sorry, but there was an issue processing your payment. Please try again or contact customer support."}
            </p>

            <div className="grid grid-cols-[2fr_1fr_2fr] my-12 max-w-xl mx-auto gap-3">
                <div className="">
                    <p>Order Status</p>
                    <p>Payment Method</p>
                    {isCOD ? (
                        <p>Grand Total</p>
                    ) : (
                        <>
                            <p>Order ID</p>
                            <p>Transaction Status</p>
                        </>
                    )}
                </div>
                <div className="text-right">
                    <p>:</p>
                    <p>:</p>
                    <p>:</p>
                    {!isCOD && <p>:</p>}
                </div>
                <div className="font-semibold">
                    <p>{isSuccess ? "Order Placed" : "Pending"}</p>
                    <p>{isCOD ? "Cash on Delivery" : "Midtrans"}</p>
                    {isCOD ? (
                        <p>{currency} {formatIDR(grandTotal)}</p>
                    ) : (
                        <>
                            <p>{orderId}</p>
                            <p>{getTransactionStatusText(transactionStatus)}</p>
                        </>
                    )}
                </div>
            </div>

            <div className="flex mx-auto md:max-w-3xl justify-center font-medium gap-5">
                <button
                    onClick={() => navigate('/')}
                    className="w-full px-4 py-3 border-2 border-primary hover:bg-gray-100 rounded-lg transition duration-300"
                >
                    Continue shopping
                </button>
                <button
                    onClick={() => navigate(isSuccess ? '/order' : '/checkout')}
                    className="w-full px-4 py-3 bg-primary hover:bg-opacity-90 rounded-lg text-white transition duration-300"
                >
                    {isSuccess ? 'Check your orders' : 'Try again'}
                </button>
            </div>
        </div>
    )
}

export default PaymentResult

