import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Catalogue from '../../pages/Catalogue';
import Loading from '../Common/Loading';

const ClubsPage = () => {
    const { getProductsByCategory, products, error } = useContext(ShopContext);
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getProductsByCategory('clubs');
                setLocalLoading(false);
            } catch (fetchError) {
                console.error('Error fetching clubs:', fetchError);
                setLocalLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (localLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return <Catalogue title="Clubs" products={products} />;
};

export default ClubsPage;