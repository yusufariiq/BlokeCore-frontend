import { useState, useEffect } from 'react';

export const useShipping = () => {
    const [selectedCountry, setSelectedCountry] = useState('Indonesia');
    const [selectedShipping, setSelectedShipping] = useState('jne-reguler');

    useEffect(() => {
        setSelectedShipping(selectedCountry === 'Indonesia' ? 'jne-reguler' : 'dhl-reguler');
    }, [selectedCountry]);

    return {
        selectedCountry,
        setSelectedCountry,
        selectedShipping,
        setSelectedShipping
    };
};