import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const OtherClubPage = () => {
    const { otherClubProducts } = useContext(ShopContext);
    return <Catalogue title=" Other Clubs" products={otherClubProducts} />;
}

export default OtherClubPage