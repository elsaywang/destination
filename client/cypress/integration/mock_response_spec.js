const mockResponse = require('../utils/mockResponse');

describe('mockResponse util for mocking the return value of a `fetch` call', () => {
    it('should return a promise', () => {
        expect(typeof mockResponse()).to.eq('object');
        expect(typeof mockResponse().then).to.eq('function');
    });

    it('returned promise should resolve an object with `json()` and `ok` properties', () => {
        mockResponse().then(response => {
            expect(typeof response.json).to.eq('function');
            expect(response.ok).to.eq(true);
        });
    });

    it('json() function in resolved promise should return another promise that resolves data passed to `mockRepsonse`', () => {
        mockResponse('test response body').then(response => {
            expect(typeof response.json()).to.eq('object');
            expect(typeof response.json().then).to.eq('function');
        });
    });

    it('json() function`s returned promise should resolve data passed to `mockRepsonse`', () => {
        mockResponse('test response body').then(response =>
            response.json().then(body => expect(body).to.eq('test response body')),
        );
    });
});
