import React, {useState, useEffect, useContext} from 'react'
import Title from '../components/Common/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle, faCopy } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const Payment = () => {
    const location = useLocation();
    const { paymentMethod, grandTotal } = location.state || {};
    const [ virtualAccount, setVirtualAccount ] = useState('');
    const [ orderNumber, setOrderNumber ] = useState('');
    const [ copied, setCopied ] = useState(false);
    const { navigate, currency, formatIDR } = useContext(ShopContext)

    useEffect(() => {
        if (!paymentMethod || !grandTotal) {
            navigate('/checkout');
            return;
        }

        generateVirtualAccount();
        generateOrderNumber();
    }, [paymentMethod, grandTotal, navigate]);

    const generateVirtualAccount = () => {
        let result = '';
        for (let i = 0; i < 16; i++) {
            result += Math.floor(Math.random() * 10);
            if ((i + 1) % 4 === 0 && i !== 15) result += ' ';
        }
        setVirtualAccount(result);
    };
    
    const generateOrderNumber = () => {
        let result = '';
        for (let i = 0; i < 12; i++) {
            result += Math.floor(Math.random() * 10);
        }
        setOrderNumber(result);
    };
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(virtualAccount.replace(/\s/g, ''));
            setCopied(true);
            toast.success('Copied to clipboard!')
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="min-h-[90vh] py-12 sm:py-20 mx-10 sm:mx-20">
            <FontAwesomeIcon icon={faCheckCircle} className='flex mx-auto justify-center text-4xl md:text-8xl text-primary' />
            <Title text={"Your order has been successfully placed"}/> 
            <p className='text-center text-lg'>
                Thank you for shopping at BlokeCore, the order confirmation email has been sent 
                <b>{' '}your@gmail.com</b>. 
                <br/>
                Please check your spam folder if the email has not been received
            </p>

            <div className="grid grid-cols-[2fr_1fr_2fr] my-12 max-w-xl mx-auto gap-3">
                <div className="">
                    <p>Order Status</p>
                    <p>Order Number</p>
                    <p>Payment Method</p>
                    <p>Grand Total</p>
                    <p>{paymentMethod === 'bca' ? 'Virtual Account' : ''}</p>
                </div>
                <div className="text-right">
                    <p>:</p>
                    <p>:</p>
                    <p>:</p>
                    <p>:</p>
                    <p>{paymentMethod === 'bca' ? ':' : ''}</p>
                </div>
                <div className="font-semibold">
                    <p>{paymentMethod === 'bca' ? 'Unpaid' : 'Paid'} </p>
                    <p>{orderNumber}</p>
                    <p>{paymentMethod === 'bca' ? 'Bank BCA' : 'Cash on Delivery'}</p>
                    <p>{currency}{' '}{formatIDR(grandTotal)}</p>
                    <div className="flex items-center gap-2 text-primary">
                        {paymentMethod === 'bca' ? (
                            <>
                                {virtualAccount}
                                <button 
                                    onClick={handleCopy()}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    {copied ? (
                                        <FontAwesomeIcon icon={faCheck}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faCopy}/>
                                    )}
                                </button>
                            </>) 
                            : ('')}
                        
                        
                        
                    </div>
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