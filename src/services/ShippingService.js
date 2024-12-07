export class ShippingService {
    static getShippingFee(selectedCountry, selectedShipping, domesticOptions, internationalOptions) {
        if (!selectedShipping) return DEFAULT_DELIVERY_FEE;
        
        const shippingOptions = selectedCountry === 'Indonesia' 
            ? domesticOptions 
            : internationalOptions;
        
        const selectedOption = shippingOptions.find(option => option.id === selectedShipping);
        return selectedOption 
            ? selectedOption.price 
            : DEFAULT_DELIVERY_FEE;
    }

    static getShippingOptions(selectedCountry, domesticOptions, internationalOptions) {
        return selectedCountry === 'Indonesia' ? domesticOptions : internationalOptions;
    }
}
