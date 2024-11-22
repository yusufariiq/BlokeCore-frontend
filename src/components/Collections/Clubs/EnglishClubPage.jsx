import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const EnglishClubPage = () => {
    const { englishClubProducts } = useContext(ShopContext);
    return <Catalogue title="English Clubs" products={englishClubProducts} />;
};

export default EnglishClubPage