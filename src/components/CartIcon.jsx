import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const CartIcon = () => {
    const [cartItems, setCartItems] = useState(0)
    const [isCartAnimating, setIsCartAnimating] = useState(false)

    const handleCartClick = () => {
        console.log('Navigating to cart')
    }
    
    useEffect(() => {
        if (cartItems > 0) {
          setIsCartAnimating(true)
          const timer = setTimeout(() => {
            setIsCartAnimating(false)
          }, 300)
          return () => clearTimeout(timer)
        }
      }, [cartItems])

    return (
        <button 
        onClick={handleCartClick} 
        className="relative"
        >
        <FontAwesomeIcon 
            icon={faCartShopping} 
            className={`h-6 w-6 text-white${
            isCartAnimating ? 'scale-110' : ''
            }`}
        />
        {cartItems > 0 && (
            <span 
            className={`absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 ${
                isCartAnimating ? 'scale-125 animate-bounce' : 'scale-100'
            }`}
            >
            {cartItems}
            </span>
        )}
        </button>
    )
}

export default CartIcon