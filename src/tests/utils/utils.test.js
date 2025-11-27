import { describe, it, expect } from "vitest";
import { formatIDR } from "../../utils/utils";

describe('Utils', () => { 
    describe('formatIDR', () => {
        it('should format positive number correctly', () => {
            expect(formatIDR(100000)).toBe('100.000');
        });

        it('should format zero correctly', () => {
            expect(formatIDR(0)).toBe('0');
        });
        
        it('should format small number correctly', () => {
            expect(formatIDR(1000)).toBe('1.000');
        });

        it('should format big number correctly', () => {
            expect(formatIDR(1000000000)).toBe('1.000.000.000');
        });

        it('should format negative amount correctly', () => {
            expect(formatIDR(-50000)).toBe('-50.000');
        });

        it('should format decimal number correctly', () => {
            expect(formatIDR(1000.99)).toBe('1.001');
        });

        it('should handle number with cents correctly', () => {
            expect(formatIDR(123456.789)).toBe('123.457');
        });
    });
});