import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const EuropePage = () => {
    const { europeNationProducts } = useContext(ShopContext);
    return <Catalogue title="Europe" products={ europeNationProducts } />;
}

export default EuropePage