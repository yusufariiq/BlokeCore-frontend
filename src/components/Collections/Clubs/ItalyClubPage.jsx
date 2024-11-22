import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const ItalyClubPage = () => {
    const { italianClubProducts } = useContext(ShopContext);
    return <Catalogue title=" Italy Clubs" products={italianClubProducts} />;
};

export default ItalyClubPage