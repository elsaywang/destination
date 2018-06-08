/**
 * This function mocks the response of a `fetch` call: a promise that resolves
 * a response with a `.json()` method, which returns another promise that
 * resolves a response with the given data.
 * @param  {*} response Any mock data, represents successfully fetched data
 * @return {Promise} Resolves initial fetch response, including `.json()`
 */
module.exports = function mockResponse(response) {
    return new Promise(resolveFetch => {
        resolveFetch({
            json() {
                return new Promise(resolveResponse => {
                    resolveResponse(response);
                });
            },
            ok: true,
        });
    });
};
