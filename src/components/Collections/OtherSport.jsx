import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';

const OtherSport = () => {
    const { otherSports } = useContext(ShopContext);
    return <Catalogue title="Others" products={otherSports} />;
}

export default OtherSport