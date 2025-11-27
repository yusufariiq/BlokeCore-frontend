import { describe, it, expect } from "vitest";
import { ShippingService } from "../../services/ShippingService";

describe(ShippingService, () => {
    const domesticOptions = [
        { id: 'jne', name: 'JNE', price: 15000 },
        { id: 'jnt', name: 'J&T', price: 12000 },
        { id: 'sicepat', name: 'SiCepat', price: 10000 }
    ];

    const internationalOptions = [
        { id: 'dhl', name: 'DHL', price: 150000 },
        { id: 'fedex', name: 'FedEx', price: 180000 }
    ];

    const DEFAULT_DELIVERY_FEE = 0;

    describe('getShippingFee', () => { 
        it('should return domestic shipping fee for Indonesia', () => {
            const fee = (ShippingService.getShippingFee(
                'Indonesia',
                'jne',
                domesticOptions,
                internationalOptions,             
            ));
            expect(fee).toBe(15000)
        });

        it('should return international shipping fee for non-Indonesia', () => {
            const fee = (ShippingService.getShippingFee(
                'England',
                'dhl',
                domesticOptions,
                internationalOptions,             
            ));
            expect(fee).toBe(150000)
        });
        
        it('should return default fee when shipping option not found', () => {
            const fee = (ShippingService.getShippingFee(
                'England',
                null,
                domesticOptions,
                internationalOptions,             
            ));
            expect(fee).toBe(DEFAULT_DELIVERY_FEE)
        });
        
        it('should return default fee when selectedShipping is undefined', () => {
            const fee = (ShippingService.getShippingFee(
                'Indonesia',
                undefined,
                domesticOptions,
                internationalOptions,             
            ));
            expect(fee).toBe(DEFAULT_DELIVERY_FEE)
        });
        
        it('should return default fee when shipping option is not foung', () => {
            const fee = (ShippingService.getShippingFee(
                'Indonesia',
                'invalid-id',
                domesticOptions,
                internationalOptions,             
            ));
            expect(fee).toBe(DEFAULT_DELIVERY_FEE)
        });
        
        it('should handle different domestic options', () => {
            const jntFee = (ShippingService.getShippingFee(
                'Indonesia',
                'jnt',
                domesticOptions,
                internationalOptions,             
            ));
            const sicepatFee = (ShippingService.getShippingFee(
                'Indonesia',
                'sicepat',
                domesticOptions,
                internationalOptions,             
            ));

            expect(jntFee).toBe(12000)
            expect(sicepatFee).toBe(10000)
        });
    });

    describe('getShippingOptions', () => {
        it('should return domestic options for Indonesia', () => {
            const option = (ShippingService.getShippingOptions(
                'Indonesia',
                domesticOptions,
                internationalOptions,             
            ));
            expect(option).toEqual(domesticOptions)
            expect(option).toHaveLength(3)
        });
        
        it('should return international options for non-Indonesia', () => {
            const option = (ShippingService.getShippingOptions(
                'Singapore',
                domesticOptions,
                internationalOptions,             
            ));
            expect(option).toEqual(internationalOptions)
            expect(option).toHaveLength(2)
        });
        
        it('should return international options for Malaysia', () => {
            const option = (ShippingService.getShippingOptions(
                'Malaysia',
                domesticOptions,
                internationalOptions,             
            ));
            expect(option).toEqual(internationalOptions)
            expect(option).toHaveLength(2)
        });
        
        it('should be case sensitive for country name', () => {
            const option = (ShippingService.getShippingOptions(
                'indonesia',
                domesticOptions,
                internationalOptions,             
            ));
            expect(option).toEqual(internationalOptions)
            expect(option).toHaveLength(2)
        });
    });
})