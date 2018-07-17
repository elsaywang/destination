import mockdate from 'mockdate';
import { normalizeSearch } from '../normalizeSearch';

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
        filterNewSignals: false,
        source: {
            dataSourceIds: [],
            name: '',
            reportSuiteIds: [],
            sourceType: 'ALL',
        },
        viewRecordsFor: '7D',
        sortBy: 'percentageChange',
        descending: true,
        includeSourceName: true,
    };

    const baseNormalizedSearch = {
        sortBy: 'percentageChange',
        descending: true,
        minEventFires: 1000,
        search: '"key"=="value"',
        startDate: 1524528000000, // Tuesday, April 24, 2018 12:00:00 AM
        includeSourceName: true,
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

            it('should exclude `endDate`', () => {
                const { endDate: actual } = normalizeSearch({
                    ...baseSearch,
                    viewRecordsFor: '30D',
                });

                expect(actual).toBeUndefined();
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

    describe('normalizing source', () => {
        it('should exclude source object entirely if `sourceType` is "ALL" and `dataSourceIds` and `reportSuiteIds` are empty arrays', () => {
            const { source: actual } = normalizeSearch(baseSearch);

            expect(actual).toBeUndefined();
        });

        it('should keep source object and only include `sourceType` if it is not "ALL" and `dataSourceIds` and `reportSuiteIds` are empty', () => {
            const { source: sourceWithSourceType } = normalizeSearch({
                ...baseSearch,
                source: {
                    ...baseSearch.source,
                    sourceType: 'ANALYTICS',
                },
            });

            const { sourceType, dataSourceIds, reportSuiteIds } = sourceWithSourceType;

            expect(sourceType).toBeDefined();
            expect(dataSourceIds).toBeUndefined();
            expect(reportSuiteIds).toBeUndefined();
        });

        it('should keep source object and only include `dataSourceIds` if it is not empty and `sourceType` is "ALL" and `reportSuiteIds` is empty', () => {
            const { source: sourceWithDataSourceIds } = normalizeSearch({
                ...baseSearch,
                source: {
                    ...baseSearch.source,
                    dataSourceIds: [1, 2, 3],
                },
            });

            const { sourceType, dataSourceIds, reportSuiteIds } = sourceWithDataSourceIds;

            expect(sourceType).toBeUndefined();
            expect(dataSourceIds).toBeDefined();
            expect(reportSuiteIds).toBeUndefined();
        });

        it('should keep source object and only include `reportSuiteIds` if it is not empty and `advanced` is `true` and `sourceType` is "ALL" and `dataSourceIds` is empty', () => {
            const { source: sourceWithReportSuiteIds } = normalizeSearch({
                ...baseSearch,
                advanced: true,
                source: {
                    ...baseSearch.source,
                    reportSuiteIds: [1, 2, 3],
                },
            });

            const { sourceType, dataSourceIds, reportSuiteIds } = sourceWithReportSuiteIds;

            expect(sourceType).toBeUndefined();
            expect(dataSourceIds).toBeUndefined();
            expect(reportSuiteIds).toBeDefined();
        });

        it('should keep source object but exclude `reportSuiteIds` if it is empty and `advanced` is `true` and `sourceType` is "ANALYTICS"', () => {
            const { source: sourceWithReportSuiteIds } = normalizeSearch({
                ...baseSearch,
                advanced: true,
                source: {
                    ...baseSearch.source,
                    sourceType: 'ANALYTICS',
                    reportSuiteIds: [],
                },
            });

            const { sourceType, dataSourceIds, reportSuiteIds } = sourceWithReportSuiteIds;

            expect(sourceType).toEqual('ANALYTICS');
            expect(dataSourceIds).toBeUndefined();
            expect(reportSuiteIds).toBeUndefined();
        });
    });

    describe('normalizing signal status', () => {
        it('should exclude `signalStatus` if it is "ALL"', () => {
            const { signalStatus: actual } = normalizeSearch(baseSearch);

            expect(actual).toBeUndefined();
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

    describe('normalizing filtering new signals', () => {
        it('should exclude `filterNewSignals` if it is `false`', () => {
            const { filterNewSignals: actual } = normalizeSearch(baseSearch);

            expect(actual).toBeUndefined();
        });

        it('should return `filterNewSignals` if it is true', () => {
            const { filterNewSignals: actual } = normalizeSearch({
                ...baseSearch,
                filterNewSignals: true,
            });
            const expected = true;

            expect(actual).toEqual(expected);
        });
    });
});
