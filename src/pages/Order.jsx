import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { AccountSidebar } from '../components/Common/AccountSidebar';
import { token, userData } from '../config/tokenConfig';
import { API_URL } from '../config/apiConfig';
import axios from 'axios';

const Order = () => {
  const { currency, formatIDR } = useContext(ShopContext);
  
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token || !userData) {
        console.log('No token or user data');
        return;
      }
  
      const response = await axios.post(`${API_URL}/api/order/user-orders`, 
        { userId: userData.id },
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if(Array.isArray(response.data)) {
        let allOrderItems = []
        response.data.forEach((order) => {
          order.items.forEach((item) => {
            const enhancedItem = {
              ...item,
              amount: order.amount,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            }
            allOrderItems.push(enhancedItem)
          })
        })
        console.log('Processed Order Items:', allOrderItems);
        setOrderData(allOrderItems);
      } else if (response.data.success && response.data.orders) {
        let allOrderItems = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            const enhancedItem = {
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            }
            allOrderItems.push(enhancedItem)
          })
        })
        console.log('Processed Order Items:', allOrderItems);
        setOrderData(allOrderItems);
      } else {
        console.log('Unexpected response structure');
        setOrderData([]);
      }
    } catch (error) {
      console.error("Error loading orders:", 
        error.response ? error.response.data : error.message
      );
      setOrderData([]);
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="min-h-[80vh] py-12 sm:py-24">
      <div className="flex sm:space-x-10 mx-auto max-w-7xl px-6 lg:px-8">
        <AccountSidebar/>
        <div className="w-full">
            <div className="py-2">
              <p className='text-2xl font-semibold'>My Orders</p>
            </div>
            {orderData.length === 0 ? (
              <div className="h-full flex mx-auto items-center justify-center">
                <p className='font-normal text-gray-400'>Your order is empty</p>
              </div>
            ) : (
              orderData.map((item, index) => (
                <div key={index} className='py-4 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-10'>
                  <div className="md:w-2/3 flex items-start gap-6 text-sm">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className='w-16 sm:w-20' 
                    />
                    <div className='w-full'>
                      <div className="flex justify-between">
                        <p className='sm:text-base font-medium'>{item.name}</p>
                        <p className=''>x{item.quantity}</p>
                      </div>
                      <p className='text-lg'>{currency}{' '}{formatIDR(item.amount)}</p>
                      <p className=''></p>
                      <p className='mt-2'>Size: 
                        <span className='text-gray-400 ml-2'>
                          {item.size}
                        </span>
                      </p>
                      <p className='mt-2'>
                        Date: <span className='text-gray-400 ml-2'>
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </p>
                      <p className='mt-2'>Status: 
                        <span className='text-gray-400 ml-2'>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </p>
                      <p className='mt-2'>Payment Method: 
                        <span className='text-gray-400 ml-2'>
                          {item.paymentMethod.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>
                    </div>
                    <button className='border px-4 py-2 text-sm font-medium rounded-sm'>
                      Track Order
                    </button>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  )
}

export default Order