import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const FranceClubPage = () => {
    const { frenchClubProducts } = useContext(ShopContext);
    return <Catalogue title=" France Clubs" products={frenchClubProducts} />;
};

export default FranceClubPage