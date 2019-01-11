import fetch, { getOptionsWithAAMAuth } from '../fetch';

jest.mock('../../lib/getCsrfToken', () => ({ getCsrfToken: () => 'abc' }));

describe('fetch util', () => {
    describe('getOptionsWithAAMAuth', () => {
        describe('`headers` property', () => {
            it('should add a `headers` object if none is included in the options', () => {
                const { headers } = getOptionsWithAAMAuth();

                expect(headers).toBeDefined();
            });

            it('should add the header "AAM-CSRF-Token"', () => {
                const { headers } = getOptionsWithAAMAuth();
                const { 'AAM-CSRF-Token': actual } = headers;
                const expected = 'abc';

                expect(actual).toEqual(expected);
            });

            it('should add the header "AAM-Disable-Escaping-HTML": true', () => {
                const { headers } = getOptionsWithAAMAuth();
                const { 'AAM-Disable-Escaping-HTML': actual } = headers;
                const expected = true;

                expect(actual).toEqual(expected);
            });

            it('should add the header "Content-Type: application/json"', () => {
                const { headers } = getOptionsWithAAMAuth();
                const { 'content-type': actual } = headers;
                const expected = 'application/json';

                expect(actual).toEqual(expected);
            });

            it('should not allow overwriting the default "AAM-CSRF-Token" header', () => {
                const { headers } = getOptionsWithAAMAuth({
                    headers: { 'AAM-CSRF-Token': 'notSaved' },
                });
                const { 'AAM-CSRF-Token': actual } = headers;
                const expected = 'abc';

                expect(actual).toEqual(expected);
            });

            it('should not allow overwriting the default "AAM-Disable-Escaping-HTML" header', () => {
                const { headers } = getOptionsWithAAMAuth({
                    headers: { 'AAM-Disable-Escaping-HTML': false },
                });
                const { 'AAM-Disable-Escaping-HTML': actual } = headers;
                const expected = true;

                expect(actual).toEqual(expected);
            });

            it('should allow overwriting the default "content-type" header', () => {
                const { headers } = getOptionsWithAAMAuth({
                    headers: { 'content-type': 'text/csv' },
                });
                const { 'content-type': actual } = headers;
                const expected = 'text/csv';

                expect(actual).toEqual(expected);
            });

            it('should allow passing in other headers', () => {
                const { headers: actual } = getOptionsWithAAMAuth({
                    headers: {
                        Cookie: 'JSESSIONID=8f0dfc27-b930-4e9f-a199-7fdb0560332d',
                    },
                });
                const expected = {
                    'AAM-CSRF-Token': 'abc',
                    'AAM-Disable-Escaping-HTML': true,
                    Cookie: 'JSESSIONID=8f0dfc27-b930-4e9f-a199-7fdb0560332d',
                    'content-type': 'application/json',
                };

                expect(actual).toEqual(expected);
            });
        });

        it('should add "credentials" of "same-origin"', () => {
            const { credentials: actual } = getOptionsWithAAMAuth();
            const expected = 'same-origin';

            expect(actual).toEqual(expected);
        });

        it('should not allow overwriting "credentials"', () => {
            const { credentials: actual } = getOptionsWithAAMAuth({ credentials: 'notSaved' });
            const expected = 'same-origin';

            expect(actual).toEqual(expected);
        });

        it('should allow passing in other properties', () => {
            const { body, cache, method } = getOptionsWithAAMAuth({
                body: '{}',
                cache: 'no-cache',
                method: 'POST',
            });
            const actual = { body, cache, method };
            const expected = {
                body: '{}',
                cache: 'no-cache',
                method: 'POST',
            };

            expect(actual).toEqual(expected);
        });
    });

    describe('default fetch export', () => {
        let fetchSpy;

        beforeEach(() => {
            fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => {});
        });

        afterEach(() => {
            fetchSpy.mockRestore();
        });

        it('should call the global fetch polyfill', () => {
            fetch('/url', {});

            expect(fetchSpy.mock.calls.length).toEqual(1);
        });

        it('should match the global fetch polyfill signature of (input[, init])', () => {
            fetch('/url', {});

            expect(fetchSpy.mock.calls[0][0]).toEqual('/url');
            expect(fetchSpy.mock.calls[0][1]).toBeDefined();
        });

        it('should add AAM authentication to the `fetch` call', () => {
            fetch('/url', {
                body: '{}',
                cache: 'no-cache',
                method: 'POST',
            });

            expect(fetchSpy.mock.calls[0][1]).toEqual({
                body: '{}',
                cache: 'no-cache',
                method: 'POST',
                headers: {
                    'AAM-CSRF-Token': 'abc',
                    'AAM-Disable-Escaping-HTML': true,
                    'content-type': 'application/json',
                },
                credentials: 'same-origin',
            });
        });
    });
});
