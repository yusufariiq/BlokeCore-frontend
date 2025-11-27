import { describe, it, expect } from "vitest";
import { CartService } from "../../services/CartService";

describe(CartService, () => {
    describe('calculateDiscountedPrice', () => {
        it('should return original price when no discount', () => {
            expect(CartService.calculateDiscountedPrice(1000000, 0)).toBe(1000000);
        });
        
        it('should return original price when null discount', () => {
            expect(CartService.calculateDiscountedPrice(1000000, null)).toBe(1000000);
        });
        
        it('should return half price when 50% discount', () => {
            expect(CartService.calculateDiscountedPrice(1000000, 50)).toBe(500000);
        });
        
        it('should return 0 price when 100% discount', () => {
            expect(CartService.calculateDiscountedPrice(1000000, 100)).toBe(0);
        });
    });

    describe('calculateCartCount', () => { 
        it('should return 0 for empty cart', () => {
            expect(CartService.calculateCartCount(0)).toBe(0);
        });

        it('should count single item with single size', () => {
            const cartItem = {
                'product-1': { 'M': 1 }
            }
            expect(CartService.calculateCartCount(cartItem)).toBe(1);
        });
        
        it('should count multiple items with multiple sizes', () => {
            const cartItem = {
                'product-1': { 'M': 1 , 'L': 1 }
            }
            expect(CartService.calculateCartCount(cartItem)).toBe(2);
        });

        it('should count multiple items with multiple sizes', () => {
            const cartItem = {
                'product-1': { 'M': 1, 'L': 2 },
                'product-2': { 'M': 3, 'L': 4 }
            }
            expect(CartService.calculateCartCount(cartItem)).toBe(10)
        })
        
        it('should ignore items with 0 quantity', () => {
            const cartItem = {
                'product-1': { 'M': 0, 'L': 2 },
            }
            expect(CartService.calculateCartCount(cartItem)).toBe(2)
        })
        
        it('should ignore items with negative quantity', () => {
            const cartItem = {
                'product-2': { 'M': 3, 'L': -4 }
            }
            expect(CartService.calculateCartCount(cartItem)).toBe(3)
        })
    });

    describe('calculateCartTotal', () => {
        const products = [
            { id: 'product-1', price: 100000, discount: 0 },
            { id: 'product-2', price: 200000, discount: 20 },
            { id: 'product-3', price: 150000, discount: 50 }
        ];

        it('should return 0 for empty cart', () => {
            expect(CartService.calculateCartTotal({}, 0)).toBe(0);
        });
        
        it('should calculate total without discount', () => {
            const cartItem = {
                'product-1': { 'M': 1 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(100000);
        });
        
        it('should calculate total for multiple sizes', () => {
            const cartItem = {
                'product-1': { 'M': 1, 'L': 3 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(400000);
        });
       
        it('should calculate total with discount', () => {
            const cartItem = {
                'product-2': { 'M': 1 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(160000);
        });
        
        it('should calculate total with discount', () => {
            const cartItem = {
                'product-2': { 'M': 1 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(160000);
        });
        
        it('should calculate total for multiple items', () => {
            const cartItem = {
                'product-1': { 'L': 1 },
                'product-2': { 'M': 1 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(260000);
        });
        
        it('should ignore items with 0 quantity', () => {
            const cartItem = {
                'product-1': { 'L': 1 },
                'product-2': { 'M': 0 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(100000);
        });

        it('should handle mixed discounts correctly', () => {
            const cartItem = {
                'product-1': { 'L': 3 },
                'product-2': { 'S': 1 },
                'product-3': { 'M': 2 },
            };
            expect(CartService.calculateCartTotal(cartItem, products)).toBe(610000);
        });
    })
});