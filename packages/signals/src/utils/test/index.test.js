import { isEmpty } from '../index';

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
