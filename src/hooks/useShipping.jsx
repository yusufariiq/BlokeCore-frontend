import { useState, useEffect } from 'react';

export const useShipping = () => {
    const [selectedCountry, setSelectedCountry] = useState('Indonesia');
    const [selectedShipping, setSelectedShipping] = useState('reguler');

    useEffect(() => {
        setSelectedShipping(selectedCountry === 'Indonesia' ? 'reguler' : 'international');
    }, [selectedCountry]);

    return {
        selectedCountry,
        setSelectedCountry,
        selectedShipping,
        setSelectedShipping
    };
};