import mockdate from 'mockdate';
import { normalizeSearch, normalizeStartDate, normalizeEndDate } from '../normalizeSearch';

describe('normalizeSearch util', () => {
    const baseSearch = {
        advanced: false,
        customEndDate: '2018-05-01',
        customStartDate: '2018-04-24',
        keyValuePairs: [
            {
                id: 0,
                key: 'key',
                operator: '==',
                value: 'value',
            },
        ],
        minEventFires: 1000,
        name: '',
        signalStatus: 'ALL',
        source: {
            dataSourceIds: null,
            name: '',
            reportSuiteIds: null,
            sourceType: null,
        },
        viewRecordsFor: '7D',
    };

    const baseNormalizedSearch = {
        descending: true,
        endDate: null,
        minEventFires: 1000,
        page: 0,
        pageSize: 0,
        pid: 0,
        search: 'key=="value"',
        signalStatus: null,
        source: {
            sourceType: null,
            dataSourceIds: null,
            reportSuiteIds: null,
        },
        startDate: 1524528000000, // Tuesday, April 24, 2018 12:00:00 AM
    };

    beforeEach(() => {
        mockdate.set(1525132800000); // Tuesday, May 1, 2018 12:00:00 AM GMT
    });

    afterEach(() => {
        mockdate.reset();
    });

    it('should normalize the search component state into the schema needed for API calls', () => {
        const actual = normalizeSearch(baseSearch);
        const expected = baseNormalizedSearch;

        expect(actual).toEqual(expected);
    });

    describe('normalizing start and end times', () => {
        describe('`viewRecordsFor` is a date range preset (ex: "7D")', () => {
            it('should set `startDate` a timestamp of the date of `viewRecordsFor` days ago at the current time of day', () => {
                const { startDate: actual } = normalizeSearch({
                    ...baseSearch,
                    viewRecordsFor: '30D',
                });
                const expected = 1522540800000; // Sunday, April 1, 2018 12:00:00 AM GMT

                expect(actual).toEqual(expected);
            });

            it('should set `endDate` to null', () => {
                const { endDate: actual } = normalizeSearch({
                    ...baseSearch,
                    viewRecordsFor: '30D',
                });
                const expected = null;

                expect(actual).toEqual(expected);
            });
        });

        describe('`viewRecordsFor` is "custom"', () => {
            it('should set `startDate` to a timestamp of the date of `customStartDate` at the current time of day', () => {
                const { startDate: actual } = normalizeSearch({
                    ...baseSearch,
                    viewRecordsFor: 'custom',
                    customStartDate: '2018-04-15',
                });
                const expected = 1523750400000; // Sunday, April 15, 2018 12:00:00 AM GMT

                expect(actual).toEqual(expected);
            });

            it('should set `endDate` to a timestamp of the date of `customEndDate` at the current time of day', () => {
                const { endDate: actual } = normalizeSearch({
                    ...baseSearch,
                    viewRecordsFor: 'custom',
                    customEndDate: '2018-04-25',
                });
                const expected = 1524614400000; // Wednesday, April 25, 2018 12:00:00 AM GMT

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('normalizing source type', () => {
        it('should set `sourceType` to an empty string if it is "ALL"', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                source: {
                    ...baseSearch.source,
                    sourceType: 'ALL',
                },
            });
            const { sourceType: actual } = source;
            const expected = '';

            expect(actual).toEqual(expected);
        });

        it('should keep `sourceType` the same if it is anything other than "ALL"', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                source: {
                    ...baseSearch.source,
                    sourceType: 'ONBOARDED',
                },
            });
            const { sourceType: actual } = source;
            const expected = 'ONBOARDED';

            expect(actual).toEqual(expected);
        });
    });

    describe('normalizing datasource IDs', () => {
        it('should return the `dataSourceIds` array if it exists and if `advanced` is true', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                advanced: true,
                source: {
                    ...baseSearch.source,
                    dataSourceIds: [1, 2, 3],
                },
            });
            const { dataSourceIds: actual } = source;
            const expected = [1, 2, 3];

            expect(actual).toEqual(expected);
        });

        it('should return `null` if the `dataSourceIds` array does not exist', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                advanced: true,
                source: {
                    ...baseSearch.source,
                    dataSourceIds: null,
                },
            });
            const { dataSourceIds: actual } = source;
            const expected = null;

            expect(actual).toEqual(expected);
        });

        it('should return `null` if `advanced` is false', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                advanced: false,
                source: {
                    ...baseSearch.source,
                    dataSourceIds: [1, 2, 3],
                },
            });
            const { dataSourceIds: actual } = source;
            const expected = null;

            expect(actual).toEqual(expected);
        });
    });

    describe('normalizing report suite IDs', () => {
        it('should return the `reportSuiteIds` array if it exists and if `advanced` is true', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                advanced: true,
                source: {
                    ...baseSearch.source,
                    reportSuiteIds: [1, 2, 3],
                },
            });
            const { reportSuiteIds: actual } = source;
            const expected = [1, 2, 3];

            expect(actual).toEqual(expected);
        });

        it('should return `null` if the `reportSuiteIds` array does not exist', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                advanced: true,
                source: {
                    ...baseSearch.source,
                    reportSuiteIds: null,
                },
            });
            const { reportSuiteIds: actual } = source;
            const expected = null;

            expect(actual).toEqual(expected);
        });

        it('should return `null` if `advanced` is false', () => {
            const { source } = normalizeSearch({
                ...baseSearch,
                advanced: false,
                source: {
                    ...baseSearch.source,
                    reportSuiteIds: [1, 2, 3],
                },
            });
            const { reportSuiteIds: actual } = source;
            const expected = null;

            expect(actual).toEqual(expected);
        });
    });

    describe('normalizing signal status', () => {
        it('should set `signalStatus` to `null` if it is "ALL"', () => {
            const { signalStatus: actual } = normalizeSearch({
                ...baseSearch,
                signalStatus: 'ALL',
            });
            const expected = null;

            expect(actual).toEqual(expected);
        });

        it('should keep `signalStatus` the same if it is anything other than "ALL"', () => {
            const { signalStatus: actual } = normalizeSearch({
                ...baseSearch,
                signalStatus: 'USED',
            });
            const expected = 'USED';

            expect(actual).toEqual(expected);
        });
    });
});
