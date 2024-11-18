import React, { useContext } from 'react'
import Title from '../components/Common/Title'
import { ShopContext } from '../context/ShopContext'

const Order = () => {
  const { products, currency, formatIDR } = useContext(ShopContext);


  return (
    <div className="min-h-[80vh] py-12 sm:py-20 mx-10 sm:mx-20">
      <Title text={"My Orders"}/>
      <div className="">
        {
          products.slice(1,4).map((item, index) => (
            <div key={index} className='py-4 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} alt="" className='w-16 sm:w-20' />
                <div className="">
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 text-base">
                    <p className='text-lg'>{currency}{formatIDR(item.price)}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>18 November 2024</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>Ready to ship</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order