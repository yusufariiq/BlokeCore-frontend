import React, { useContext } from 'react'
import Catalogue from '../../../pages/Catalogue'
import { ShopContext } from '../../../context/ShopContext'

const SpanishClubPage = () => {
    const {spanishClubProducts} = useContext(ShopContext);
    return <Catalogue title={"Spain Clubs"} products={spanishClubProducts}/>
}

export default SpanishClubPage