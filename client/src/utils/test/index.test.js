import { isEmpty, getTotal } from '../index';

describe('isEmpty() should check if string or array passed in is empty', () => {
    it('given an empty string, it should return true', () => {
        expect(isEmpty('')).toBe(true);
    });

    it('given a string value, it should return false', () => {
        expect(isEmpty('123')).toBe(false);
    });

    it('given an empty array, it should return true', () => {
        expect(isEmpty([])).toBe(true);
    });

    it('given an array of items, it should return false', () => {
        expect(isEmpty([1, 2, 3])).toBe(false);
    });
});

describe('getTotal() should return total length of string or array passed in', () => {
    it('given an empty string, it should be 0', () => {
        expect(getTotal('')).toEqual(0);
    });

    it('given a string value, it should return string length', () => {
        expect(getTotal('123')).toEqual(3);
    });

    it('given an empty array, it should be 0', () => {
        expect(getTotal([])).toEqual(0);
    });

    it('given an array of items, it should return array length', () => {
        expect(getTotal([1, 2, 3])).toEqual(3);
    });
});
