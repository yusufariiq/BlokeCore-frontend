import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const CartIcon = () => {

    return (
        
        <NavLink to={'#'} className="my-auto">
            <FontAwesomeIcon 
                icon={faCartShopping} 
                className="h-6 w-6 text-white flex-shrink-0"
            />
                <span className="px-1 text-xs font-medium text-white bg-primary aspect-square rounded-full ">0</span>
        </NavLink>
    )
}

export default CartIcon