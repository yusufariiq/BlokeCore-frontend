import React, { useContext, useState } from 'react';
import { Countries, DomesticShippingOptions, InternationalShippingOptions } from '../assets/Assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import CartTotal from '../components/Common/CartTotal';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
    const [selectedCountry, setSelectedCountry] = useState('Indonesia');
    const [selectedShipping, setSelectedShipping] = useState('reguler');
    const [paymentMethod, setPaymentMethod] = useState('cod')

    const { navigate } = useContext(ShopContext); 

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    };

    const getShippingOptions = () => {
        return selectedCountry === 'Indonesia' ? DomesticShippingOptions : InternationalShippingOptions;
    };

    const getSelectedShippingOption = () => {
        const options = getShippingOptions();
        return options.find(option => option.id === selectedShipping);
    };

    const handleCountryChange = (e) => {
        const newCountry = e.target.value;
        setSelectedCountry(newCountry);
        setSelectedShipping(newCountry === 'Indonesia' ? 'reguler' : 'international');
    };

  return (
    <div className='py-12 sm:py-20'>

      {/* Left Side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-2 mb-10">
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
                            placeholder='example@email.com'
                            required
                            className="input border-gray-400 w-full"
                        />
                        </div>
                    </div>

                    <hr className='mb-3 col-span-2'/>

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
                            placeholder='John'
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
                            placeholder='Doe'
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
                            id="phone-number"
                            name="phone-number"
                            type="tel"
                            autoComplete="tel"
                            placeholder='08xxxxxxxxxx'
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
                            id="message"
                            name="message"
                            rows={4}
                            className="textarea border-gray-400 w-full"
                            defaultValue={''}
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
                            value={selectedCountry}
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
                            name="postal-code"
                            type="text"
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
                <div onClick={() => setPaymentMethod('credit')} className="flex items-center gap-3 border p-4 px-3 cursor-pointer">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'credit' ? 'bg-primary' : ''}`}></p>
                    <FontAwesomeIcon icon={faCreditCard}/>
                    <p className='text-base'>Credit Card</p>
                </div>

                <div onClick={() => setPaymentMethod('cod')} className="flex items-center gap-3 border p-4 px-3 cursor-pointer">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cod' ? 'bg-primary' : ''}`}></p>
                    <FontAwesomeIcon icon={faMoneyBill}/>
                    <p className='text-base'>Cash on Delivery</p>
                </div>
            </div>
            
            <div className="my-12">
                <button
                    onClick={() => navigate('/payment')}
                    type="submit"
                    className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-normal hover:bg-hover-primary ease-in-out duration-200">
                    Continue to Payment
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;