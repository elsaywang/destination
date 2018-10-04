import { formatKeyValuePair, stringifySignals, stringifySignal } from '../stringifySignals';

describe('formatKeyValuePair', () => {
    it('should stringify a single key-value pair', () => {
        const keyValuePair = {
            key: 'eVar1',
            operator: '>',
            value: 'xyz123',
        };

        expect(formatKeyValuePair(keyValuePair)).toEqual('"eVar1">"xyz123"');
    });

    it('should stringify empty key in quotation marks', () => {
        const keyValuePair = {
            key: '',
            value: 'xyz123',
        };

        expect(formatKeyValuePair(keyValuePair)).toEqual(String.raw`""=="xyz123"`);
    });

    it('should stringify empty value in quotation marks', () => {
        const keyValuePair = {
            key: 'eVar1',
            value: '',
        };

        expect(formatKeyValuePair(keyValuePair)).toEqual(String.raw`"eVar1"==""`);
    });

    it('should stringify empty key and empty value in quotation marks', () => {
        const keyValuePair = {
            key: '',
            value: '',
        };

        expect(formatKeyValuePair(keyValuePair)).toEqual(String.raw`""==""`);
    });
});

describe('stringifySignals', () => {
    it('should stringify a single key-value pair from a single signal', () => {
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

        expect(stringifySignals(signals)).toEqual('"eVar1"=="xyz123"');
    });

    it('should stringify a single key-value pair from a single signal with operator', () => {
        const signals = [
            {
                keyValuePairs: [
                    {
                        key: 'eVar1',
                        operator: '!=',
                        value: 'xyz123',
                    },
                ],
            },
        ];

        expect(stringifySignals(signals)).toEqual('"eVar1"!="xyz123"');
    });

    it('should stringify multiple key-value pairs from a single signal', () => {
        const signals = [
            {
                keyValuePairs: [
                    {
                        key: 'eVar1',
                        value: 'xyz123',
                    },
                    {
                        key: 'abc123',
                        value: 'cba321',
                    },
                    {
                        key: 'abc124',
                        operator: '!=',
                        value: 'cba321',
                    },
                ],
            },
        ];

        expect(stringifySignals(signals)).toEqual(
            '"eVar1"=="xyz123" AND "abc123"=="cba321" AND "abc124"!="cba321"',
        );
    });

    it('should stringify single key-value pairs from multiple signals', () => {
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
            {
                keyValuePairs: [
                    {
                        key: 'def456',
                        operator: '!=',
                        value: 'qrs789',
                    },
                ],
            },
        ];

        expect(stringifySignals(signals)).toEqual(
            '"eVar1"=="xyz123" OR "def456"=="qrs789" OR "def456"!="qrs789"',
        );
    });

    it('should stringify multiple key-value pairs from multiple signals', () => {
        const signals = [
            {
                keyValuePairs: [
                    {
                        key: 'eVar1',
                        value: 'xyz123',
                    },
                    {
                        key: 'eVar2',
                        value: 'zyx321',
                    },
                    {
                        key: 'eVar2',
                        operator: '!=',
                        value: 'zyx321',
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
                        value: 'ihg000',
                    },
                    {
                        key: 'ghi000',
                        operator: '!=',
                        value: 'ihg000',
                    },
                ],
            },
        ];

        expect(stringifySignals(signals)).toEqual(
            '"eVar1"=="xyz123" AND "eVar2"=="zyx321" AND "eVar2"!="zyx321" OR "def456"=="qrs789" AND "ghi000"=="ihg000" AND "ghi000"!="ihg000"',
        );
    });

    it('should stringify empty key-value pairs as an empty string', () => {
        expect(stringifySignals([])).toEqual('');
    });

    it('should stringify empty key and empty value as an empty string', () => {
        expect(
            stringifySignals([
                {
                    keyValuePairs: [
                        {
                            key: '',
                            value: '',
                            operator: '==',
                        },
                    ],
                },
            ]),
        ).toEqual('');
    });

    it('should stringify multiple key-value pairs with empty key and empty value as an empty string', () => {
        expect(
            stringifySignals([
                {
                    keyValuePairs: [
                        {
                            key: '',
                            value: '',
                            operator: '==',
                        },
                        {
                            key: '',
                            value: '',
                            operator: '==',
                        },
                        {
                            key: '',
                            value: '',
                            operator: '!=',
                        },
                    ],
                },
            ]),
        ).toEqual('');
    });

    describe('value formatting', () => {
        describe('when operator is textual', () => {
            it('should wrap the value with double quotes if it is a string', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 'xyz123',
                                operator: '==',
                            },
                            {
                                key: 'eVar2',
                                value: 'xyz456',
                                operator: 'contains',
                            },
                            {
                                key: 'eVar3',
                                value: 'xyz789',
                                operator: '!=',
                            },
                        ],
                    },
                ];

                expect(stringifySignals(signals).includes('"xyz123"')).toBeTruthy();
                expect(stringifySignals(signals).includes('"xyz456"')).toBeTruthy();
                expect(stringifySignals(signals).includes('"xyz789"')).toBeTruthy();
            });

            it('should wrap the value with double quotes if it is a number', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 123,
                                operator: '==',
                            },
                            {
                                key: 'eVar2',
                                value: -0.123,
                                operator: 'contains',
                            },
                            {
                                key: 'eVar3',
                                value: -0.456,
                                operator: '!=',
                            },
                        ],
                    },
                ];

                expect(stringifySignals(signals).includes('"123"')).toBeTruthy();
                expect(stringifySignals(signals).includes('"-0.123"')).toBeTruthy();
                expect(stringifySignals(signals).includes('"-0.456"')).toBeTruthy();
            });
        });

        describe('when operator is numeric comparison', () => {
            it('should not wrap the value with double quotes if it is a number', () => {
                const signals = [
                    {
                        keyValuePairs: [
                            {
                                key: 'eVar1',
                                value: 123,
                                operator: '<',
                            },
                            {
                                key: 'eVar2',
                                value: -0.123,
                                operator: '>',
                            },
                            {
                                key: 'eVar3',
                                value: 456,
                                operator: '<=',
                            },
                            {
                                key: 'eVar4',
                                value: -0.456,
                                operator: '>=',
                            },
                        ],
                    },
                ];

                expect(stringifySignals(signals).includes('"123"')).toBeFalsy();
                expect(stringifySignals(signals).includes('"-0.123"')).toBeFalsy();
                expect(stringifySignals(signals).includes('"456"')).toBeFalsy();
                expect(stringifySignals(signals).includes('"-0.456"')).toBeFalsy();
                expect(stringifySignals(signals).includes('123')).toBeTruthy();
                expect(stringifySignals(signals).includes('-0.123')).toBeTruthy();
                expect(stringifySignals(signals).includes('456')).toBeTruthy();
                expect(stringifySignals(signals).includes('-0.456')).toBeTruthy();
            });
        });
    });
});

describe('stringifySignal', () => {
    it('should stringify and strip last ending parentheses from key in key-value pair of a single signal with advanced flag as true', () => {
        const signal = {
            advanced: true,
            keyValuePairs: [
                {
                    key: 'eVar1 (random) (words) (friendly name)',
                    value: 'xyz123',
                },
            ],
        };

        expect(stringifySignal(signal)).toEqual('"eVar1 (random) (words)"=="xyz123"');
    });

    it('should stringify but not strip last ending parentheses from key in key-value pair of a single signal with advanced flag as false', () => {
        const signal = {
            advanced: false,
            keyValuePairs: [
                {
                    key: 'eVar1 (random) (words) (friendly name)',
                    value: 'xyz123',
                },
            ],
        };

        expect(stringifySignal(signal)).toEqual(
            '"eVar1 (random) (words) (friendly name)"=="xyz123"',
        );
    });
});
