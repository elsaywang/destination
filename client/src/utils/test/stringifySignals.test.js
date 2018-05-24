import { formatKeyValuePair, stringifySignals } from '../stringifySignals';

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
    it('should stringify empty key and value in quotation marks', () => {
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
                ],
            },
        ];

        expect(stringifySignals(signals)).toEqual('"eVar1"=="xyz123" AND "abc123"=="cba321"');
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
        ];

        expect(stringifySignals(signals)).toEqual('"eVar1"=="xyz123" OR "def456"=="qrs789"');
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
                ],
            },
        ];

        expect(stringifySignals(signals)).toEqual(
            '"eVar1"=="xyz123" AND "eVar2"=="zyx321" OR "def456"=="qrs789" AND "ghi000"=="ihg000"',
        );
    });
    it('should stringify empty key-value pairs as an empty string', () => {
        expect(stringifySignals([])).toEqual('');
    });
    describe('value formatting', () => {
        it('should wrap the value with double quotes if it is a string', () => {
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

            expect(stringifySignals(signals).includes('"xyz123"')).toBeTruthy();
        });
        it('should not wrap the value with double quotes if it is a number', () => {
            const signals = [
                {
                    keyValuePairs: [
                        {
                            key: 'eVar1',
                            value: 123,
                        },
                        {
                            key: 'eVar1',
                            value: -0.123,
                        },
                    ],
                },
            ];

            expect(stringifySignals(signals).includes('"123"')).toBeFalsy();
            expect(stringifySignals(signals).includes('"-0.123"')).toBeFalsy();
        });
    });
});
