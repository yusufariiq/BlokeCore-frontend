import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Catalogue from '../../../pages/Catalogue';

const OceaniaPage = () => {
    const { oceaniaNationProducts } = useContext(ShopContext);
    return <Catalogue title="Oceania" products={ oceaniaNationProducts } />;
}

export default OceaniaPage