import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const GermanClubPage = () => {
    const { germanClubProducts } = useContext(ShopContext);
    return <Catalogue title=" German Clubs" products={germanClubProducts} />;
};

export default GermanClubPage