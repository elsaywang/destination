import { isNumeric } from '../isNumeric';

describe('isNumeric', () => {
    it('should return true for integers', () => {
        expect(isNumeric(1)).toBeTruthy();
        expect(isNumeric(0)).toBeTruthy();
        expect(isNumeric(-1)).toBeTruthy();
    });
    it('should return true for floats', () => {
        expect(isNumeric(1.23)).toBeTruthy();
        expect(isNumeric(0.0)).toBeTruthy();
        expect(isNumeric(-1.23)).toBeTruthy();
    });
    it('should return true for numeric integer strings', () => {
        expect(isNumeric('1')).toBeTruthy();
        expect(isNumeric('0')).toBeTruthy();
        expect(isNumeric('-1')).toBeTruthy();
    });
    it('should return true for numeric float strings', () => {
        expect(isNumeric('1.23')).toBeTruthy();
        expect(isNumeric('0.0')).toBeTruthy();
        expect(isNumeric('-1.23')).toBeTruthy();
    });
    it('should return false for numeric strings with commas', () => {
        expect(isNumeric('1,234')).toBeFalsy();
    });
    it('should return false for strings with alpha characters', () => {
        expect(isNumeric('abc')).toBeFalsy();
        expect(isNumeric('abc123')).toBeFalsy();
        expect(isNumeric('123abc')).toBeFalsy();
    });
});
