import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { 
  faBox, 
  faClipboard, 
  faTruck, 
  faCheck,
  faBoxOpen,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import { token, userData } from '../../config/tokenConfig'
import { API_URL } from '../../config/apiConfig'
import { ShopContext } from '../../context/ShopContext'
import { DomesticShippingOptions, InternationalShippingOptions } from '../../assets/Assets'

const orderStatuses = [
  { key: 'pending', label: 'Pending', icon: faClipboard },
  { key: 'order_placed', label: 'Order Placed', icon: faBox },
  { key: 'packing', label: 'Packing', icon: faBoxOpen },
  { key: 'shipped', label: 'Shipped', icon: faTruck },
  { key: 'delivered', label: 'Delivered', icon: faCheck }
]

const TrackOrder = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { formatIDR, currency } = useContext(ShopContext)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = location.state?.orderId

        if (!orderId) {
          navigate('/orders')
          return
        }

        const response = await axios.get(`${API_URL}/api/order/details/${orderId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const orderData = response.data;

        const itemsWithDiscount = orderData.items.map((item) => {
          const hasDiscount = item.discount > 0;
          const discountedPrice = hasDiscount ? Math.round(item.price * (1 - item.discount / 100)) : Math.round(item.price);

          return {
            ...item,
            image: Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '/placeholder-image.png',
            discountedPrice,
          };
        });

        const totalPriceWithoutDiscount = orderData.items.reduce((total, item) => {
          return total + item.price;
        }, 0);

        const totalDiscount = orderData.items.reduce((total, item) => {
          const discountAmount = item.discount > 0 ? item.price * (item.discount / 100) : 0;
          return total + discountAmount;
        }, 0);


        const transformedOrderDetails = {
          orderId: orderData.orderId || 'N/A',
          status: (orderData.status || '').toLowerCase().replace(' ', '_'),
          date: orderData.date ? new Date(orderData.date).toLocaleDateString() : 'N/A',
          delivery: {
            carrier: orderData.selectedShipping || 'N/A',
            address: orderData.shippingAddress 
              ? `${orderData.shippingAddress.address || ''}, ${orderData.shippingAddress.city || ''}, ${orderData.shippingAddress.country || ''}` 
              : 'N/A',
            phone: orderData.shippingAddress?.phone || 'N/A',
            email: orderData.shippingAddress?.email || 'N/A'
          },
          payment: {
            method: orderData.paymentMethod || 'N/A',
          },
          items: itemsWithDiscount,
          totals: {
            items: Math.round(totalPriceWithoutDiscount),
            delivery: orderData.shippingPrice || 0,
            discount: Math.round(totalDiscount),
            total: orderData.amount || 0,
          }
        }

        setOrderDetails(transformedOrderDetails)
      } catch (error) {
        console.error('Error loading order details:', error)
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    if (token && userData) {
      fetchOrderDetails()
    } else {
      navigate('/login')
    }
  }, [location.state, navigate])

  const getDeliveryDates = (selectedShippingId) => {
    const isDomestic = DomesticShippingOptions.some(option => option.id === selectedShippingId);
    const shippingOptions = isDomestic ? DomesticShippingOptions : InternationalShippingOptions;
  
    const selectedShipping = shippingOptions.find(option => option.id === selectedShippingId);
  
    if (!selectedShipping) {
      return null;
    }
  
    const { to } = selectedShipping.estimatedDelivery;
    
    return {
      delivery: to.toLocaleDateString()
    };
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  if (!orderDetails) {
    return <div className="flex justify-center items-center min-h-screen">Order not found</div>
  }

  const currentStatusIndex = orderStatuses.findIndex(status => 
    status.key === orderDetails.status
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
            <div className="mb-6">
            <button 
                onClick={() => navigate('/order')}
                className="text-sm font-medium flex items-center gap-2"
            >
                <FontAwesomeIcon icon={faArrowLeft}/>
                ORDER HISTORY
            </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                        <p className="text-sm text-gray-600">Expected delivery:</p>
                        <p className="font-semibold flex items-center gap-2">
                          {getDeliveryDates(orderDetails.delivery.carrier) ? (
                            <>
                              <p>
                              {getDeliveryDates(orderDetails.delivery.carrier).delivery}
                              </p>
                            </>
                          ) : (
                            'Delivery dates not available'
                          )}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p className="text-sm text-gray-600">Status:</p>
                        <p className="font-semibold flex items-center gap-2">
                            {(orderDetails.status || '').toUpperCase().replace('_', ' ')}
                            <span className="text-green-600">✓</span>
                        </p>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="relative">
                    <div className="h-1 bg-gray-200 absolute w-full top-5"></div>
                    <div 
                    className="h-1 bg-primary absolute top-5 transition-all duration-500"
                    style={{ width: `${(currentStatusIndex / (orderStatuses.length - 1)) * 100}%` }}
                    ></div>
                    <div className="grid grid-cols-5 relative">
                    {orderStatuses.map((status, index) => (
                        <div 
                        key={status.key}
                        className={`flex flex-col items-center ${
                            index <= currentStatusIndex ? 'text-primary' : 'text-gray-400'
                        }`}
                        >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index <= currentStatusIndex ? 'bg-primary text-white' : 'bg-gray-200'
                        }`}>
                            <FontAwesomeIcon icon={status.icon} className="w-5 h-5" />
                        </div>
                        <p className="text-xs mt-2 font-medium">{status.label}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-lg font-semibold">ORDER DETAILS</h2>
                        <p className="text-sm text-gray-600">
                            Order number: {orderDetails.orderId}
                        </p>
                        <p className="text-sm text-gray-600">
                            Date placed: {orderDetails.date}
                        </p>
                    </div>
                    {/* <button className="btn btn-outline btn-sm gap-2">
                    <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                    DOWNLOAD INVOICE
                    </button> */}
                </div>

            {/* Delivery Details */}
                <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">DELIVERY</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-medium">Carrier</p>
                            <p className="text-sm text-gray-600 uppercase">{orderDetails.delivery.carrier}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Delivery address</p>
                            <p className="text-sm text-gray-600">{orderDetails.delivery.address}</p>
                            <p className="text-sm text-gray-600">{orderDetails.delivery.phone}</p>
                            <p className="text-sm text-gray-600">{orderDetails.delivery.email}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="border-t mt-6 pt-6">
                    <h3 className="font-semibold mb-4">PAYMENT METHOD</h3>
                    <p className="text-sm text-gray-600 uppercase">
                    {orderDetails.payment.method}
                    </p>
                </div>

                {/* Order Items */}
                <div className="border-t mt-6 pt-6">
                    <h3 className="font-semibold mb-4">ITEMS</h3>
                    {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex gap-4 mb-4">
                        <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="font-medium mt-2">{currency}{formatIDR(item.price)}</p>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="border-t mt-6 pt-6">
                    <h3 className="font-semibold mb-4">TOTALS</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Items</span>
                            <span>{currency}{formatIDR(orderDetails.totals.items)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Delivery</span>
                            <span>{currency}{formatIDR(orderDetails.totals.delivery)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-600">
                            <span>Total discount</span>
                            <span>-{currency}{formatIDR(orderDetails.totals.discount)}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span>{currency}{formatIDR(orderDetails.totals.total)}</span>
                        </div>
                        <p className="text-sm text-gray-600">(Inclusive of tax)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TrackOrder