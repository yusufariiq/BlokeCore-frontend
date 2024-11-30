import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Countries, DomesticShippingOptions, InternationalShippingOptions, Assets } from '../assets/Assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import CartTotal from '../components/Common/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { API_URL } from '../config/apiConfig';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        country: 'Indonesia',
        state: '',
        city: '',
        zipCode: '',
    });
    
    const [selectedShipping, setSelectedShipping] = useState('reguler');
    const [paymentMethod, setPaymentMethod] = useState('cod')

    const { navigate,  getCartAmountRaw, deliveryFee, cartItems, resetCart, products } = useContext(ShopContext); 

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getShippingOptions = () => {
        return formData.country === 'Indonesia' ? DomesticShippingOptions : InternationalShippingOptions;
    };

    const getSelectedShippingOption = () => {
        const options = getShippingOptions();
        return options.find(option => option.id === selectedShipping);
    };

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          selectedShipping: formData.country === 'Indonesia' ? 'reguler' : 'international',
        });
    };

    const handleCountryChange = (e) => {
        const newCountry = e.target.value;
        setFormData({ ...formData, country: newCountry });
        setSelectedShipping(newCountry === 'Indonesia' ? 'reguler' : 'international');
      };

    const calculateGrandTotal = () => {
        return getCartAmountRaw() + deliveryFee;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = []
            Object.keys(cartItems).forEach(productId => {
                Object.keys(cartItems[productId]).forEach(size => {
                    if (cartItems[productId][size] > 0) {
                        const itemInfo = structuredClone(products.find(product => product.id === productId))
                        if (itemInfo) {
                            itemInfo.size = size
                            itemInfo.quantity = cartItems[productId][size]
                            orderItems.push(itemInfo)
                        }
                    }
                });
            });

            const token = localStorage.getItem('token');
            // Retrieve user data from localStorage
            const userDataString = localStorage.getItem('user');
            const userData = userDataString ? JSON.parse(userDataString) : null;
            
            // Get user ID from the parsed user data
            const userId = userData?.id;

            if (!userId) {
                toast.error('User ID not found. Please log in again.');
                return;
            }

            let orderData = {
                userId: userId,
                shippingAddress: formData,
                items: orderItems,
                amount: calculateGrandTotal(),
                paymentMethod: paymentMethod
            }

            if (paymentMethod === 'cod' || paymentMethod === 'bca') {
                const response = await axios.post(`${API_URL}/api/order/place`, orderData, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(response.data);

                if (response.data) {
                    resetCart();
                    navigate('/payment', {
                        state: {
                            paymentMethod: paymentMethod,
                            grandTotal: calculateGrandTotal()
                        }
                    })
                } else  {
                    toast.error(response.data.message || 'Order placement failed')
                }
            } else if (paymentMethod === 'stripe') {
                // Add stripe payment logic here
                const response = await axios.post(`${API_URL}/api/order/stripe`, orderData, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error("Error processing order:", error.response ? error.response.data : error);
            toast.error(error.response?.data?.message || 'An error occurred while processing the order')
        }
    }

  return (
    <div className='py-12 sm:py-20'>

      {/* Left Side */}
      <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-2 mb-10">
        <div className="col-span-1 lg:col-span-3">
            <div className="mx-auto max-w-2xl">
                <p className='text-2xl font-medium text-left'>Delivery Information</p>
                <hr className='my-2'/>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    
                    {/* FORM  */}
                    <p className='text-xl font-medium sm:col-span-2'>Contact</p>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="text-sm/6 font-normal text-black">
                        Email *
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input border-gray-400 w-full"
                        />
                        </div>
                    </div>

                    <hr className='mb-3 col-span-2'/>

                    {/* Shipping Address */}
                    <p className='text-xl font-medium sm:col-span-2'>Shipping Address</p>                
                    <div className='sm:col-span-1'>
                        <label htmlFor="firstName" className="text-sm/6 font-normal text-black">
                        First Name *
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full input border-gray-400"
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-1'>
                        <label htmlFor="lastName" className="text-sm/6 font-normal text-black">
                        Last Name *
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full input border-gray-400"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="text-sm/6 font-normal text-black">
                        Phone number *
                        </label>
                        <div className="mt-2.5">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="08xxxxxxxxxx"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="input border-gray-400 w-full"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="text-sm/6 font-normal text-black">
                        Address *
                        </label>
                        <div className="mt-2.5">
                        <textarea
                            id="address"
                            name="address"
                            rows={4}
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="textarea border-gray-400 w-full"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="country" className="text-sm/6 font-normal text-black">
                        Country *
                        </label>
                        <div className="mt-2.5 relative">
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleCountryChange}
                            className="input border-gray-400 w-full appearance-none pr-10"
                            required
                        >
                            {Countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'/>
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="state" className="text-sm/6 font-normal text-black">
                        State/Province *
                        </label>
                        <div className="mt-2.5">
                        <input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Enter your state/province"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="input border-gray-400 w-full"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="city" className="text-sm/6 font-normal text-black">
                        City *
                        </label>
                        <div className="mt-2.5">
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="input border-gray-400 w-full"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="postal-code" className="text-sm/6 font-normal text-black">
                        Zip/Postal Code *
                        </label>
                        <div className="mt-2.5">
                        <input
                            id="postal-code"
                            name="zipCode"
                            type="text"
                            placeholder="Enter your postal code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            className="input border-gray-400 w-full"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side */}
        <div className="col-span-1 lg:col-span-2 px-16 lg:px-0  lg:max-w-xl">
            <CartTotal selectedShippingOption={getSelectedShippingOption()} />
            <div className="my-12 space-y-3">
                <p className='text-xl font-medium'>Shipping Method</p>
                <div className="col-span-2 space-y-3">
                    {getShippingOptions().map((option) => (
                        <div key={option.id} className="space-y-2">
                            <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <input 
                                        type="radio" 
                                        id={option.id}
                                        name="shipping"
                                        value={option.id}
                                        checked={selectedShipping === option.id}
                                        onChange={(e) => setSelectedShipping(e.target.value)}
                                        className="cursor-pointer"
                                    />
                                    <label htmlFor={option.id} className="ml-5 text-base font-medium text-black cursor-pointer">
                                        {option.label}
                                    </label>
                                </div>
                                <div className="col-span-1 text-right">
                                    <span className='text-primary'>{option.price}</span> 
                                </div>
                            </div>
                            {selectedShipping === option.id && (
                                <div className="ml-8 text-sm text-gray-600">
                                    To Arrive : {formatDate(option.estimatedDelivery.from)} - {formatDate(option.estimatedDelivery.to)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-12 space-y-4">
                <p className='text-xl font-medium'>Payment Method</p>
                <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
                    <div onClick={() => setPaymentMethod('stripe')} className="flex items-center gap-3 border p-4 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-primary' : ''}`}></p>
                        <img src={Assets.logostripe} alt="" className='h-7 mx-4' />
                    </div>
                    
                    <div onClick={() => setPaymentMethod('bca')} className="flex items-center gap-3 border p-4 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'bca' ? 'bg-primary' : ''}`}></p>
                        <img src={Assets.logobca} alt="" className='h-7 mx-4' />
                    </div>

                    <div onClick={() => setPaymentMethod('cod')} className="flex items-center gap-3 border p-4 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cod' ? 'bg-primary' : ''}`}></p>
                        <FontAwesomeIcon icon={faMoneyBill}/>
                        <p className='text-base font-medium'>Cash on Delivery</p>
                    </div>
                </div>
            </div>
            
            <div className="my-12">
                <button
                    type="submit"
                    className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-normal hover:bg-hover-primary ease-in-out duration-200">
                    Continue to Payment
                </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;