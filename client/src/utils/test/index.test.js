import { encodeKeyValuePairs } from '../';

describe('Utils', () => {
    describe('Encoding and decoding signal key-value pairs', () => {
        describe('encodeKeyValuePairs', () => {
            it('should encode a single key-value pair from a single signal', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 'xyz123',
                            },
                        ],
                    },
                ];

                expect(encodeKeyValuePairs(signals)).toEqual('eVar1%3D%22xyz123%22');
            });
            it('should encode multiple key-value pairs from a single signal', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 'xyz123',
                            },
                            {
                                key: 'abc123',
                                value: 2,
                            },
                        ],
                    },
                ];

                expect(encodeKeyValuePairs(signals)).toEqual('eVar1%3D%22xyz123%22%3Babc123%3D2');
            });
            it('should encode single key-value pairs from multiple signals', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 'xyz123',
                            },
                        ],
                    },
                    {
                        keyValuePairs: [
                            {
                                key: 'def456',
                                value: 'qrs789',
                            },
                        ],
                    },
                ];

                expect(encodeKeyValuePairs(signals)).toEqual(
                    'eVar1%3D%22xyz123%22%2Cdef456%3D%22qrs789%22',
                );
            });
            it('should encode multiple key-value pairs from multiple signals', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 'xyz123',
                            },
                            {
                                key: 'eVar2',
                                value: 1234,
                            },
                        ],
                    },
                    {
                        keyValuePairs: [
                            {
                                key: 'def456',
                                value: 'qrs789',
                            },
                            {
                                key: 'ghi000',
                                value: -1,
                            },
                        ],
                    },
                ];

                expect(encodeKeyValuePairs(signals)).toEqual(
                    'eVar1%3D%22xyz123%22%3BeVar2%3D1234%2Cdef456%3D%22qrs789%22%3Bghi000%3D-1',
                );
            });
            it('should encode empty key-value pairs as an empty string', () => {
                expect(encodeKeyValuePairs([])).toEqual('');
            });
            it('should encode quotation marks, equals signs, or-delimiters, and and-delimiters to make key-value pairs safe to include in query string params', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 'xyz123',
                            },
                            {
                                key: 'eVar2',
                                value: 1234,
                            },
                        ],
                    },
                    {
                        keyValuePairs: [
                            {
                                key: 'def456',
                                value: 'qrs789',
                            },
                            {
                                key: 'ghi000',
                                value: -1,
                            },
                        ],
                    },
                ];

                expect(encodeKeyValuePairs(signals).includes('"')).toBeFalsy();
                expect(encodeKeyValuePairs(signals).includes('=')).toBeFalsy();
                expect(encodeKeyValuePairs(signals).includes(',')).toBeFalsy();
                expect(encodeKeyValuePairs(signals).includes(';')).toBeFalsy();

                expect(encodeKeyValuePairs(signals).includes('%22')).toBeTruthy();
                expect(encodeKeyValuePairs(signals).includes('%3D')).toBeTruthy();
                expect(encodeKeyValuePairs(signals).includes('%2C')).toBeTruthy();
                expect(encodeKeyValuePairs(signals).includes('%3B')).toBeTruthy();
            });
        });
    });
});
