import { normalizeSortOptions } from '../normalizeSortOptions';

describe('normalizeSortOptions util', () => {
    const baseSortOptions = {
        sortBy: 'totalCount',
        sortDir: 1,
    };

    const baseNormalizedSortOptions = {
        sortBy: 'totalCount',
        descending: false,
    };

    it('should normalize the sort column and sort direction into the schema needed for API calls', () => {
        const actual = normalizeSortOptions(baseSortOptions);
        const expected = baseNormalizedSortOptions;

        expect(actual).toEqual(expected);
    });

    describe('normalizing `sortBy` column key', () => {
        it('should change `sortBy` to `key` if it is `keyValuePairs`', () => {
            const { sortBy: actual } = normalizeSortOptions({
                ...baseSortOptions,
                sortBy: 'keyValuePairs',
            });
            const expected = 'key';

            expect(actual).toEqual(expected);
        });

        it('should keep `sortBy` if it is `totalCount`', () => {
            const { sortBy: actual } = normalizeSortOptions(baseSortOptions);
            const expected = 'totalCount';

            expect(actual).toEqual(expected);
        });

        it('should exclude `sortBy` if it is an unsupported sort column key', () => {
            const { sortBy: actual } = normalizeSortOptions({
                ...baseSortOptions,
                sortBy: 'signalType',
            });

            expect(actual).toBeUndefined();
        });
    });

    describe('normalizing `descending`', () => {
        describe('explicitly setting `descending` param to `false` when sorting ascending', () => {
            it('should set `descending` to false when `sortBy` is "keyValuePairs" and `sortDir` is 1', () => {
                const { descending: actual } = normalizeSortOptions({
                    ...baseSortOptions,
                    sortBy: 'keyValuePairs',
                    sortDir: 1,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should set `descending` to false when `sortBy` is `totalCount` and `sortDir` is 1', () => {
                const { descending: actual } = normalizeSortOptions({
                    ...baseSortOptions,
                    sortBy: 'totalCount',
                    sortDir: 1,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should set `descending` to false when `sortBy` is `percentageChange` and `sortDir` is 1', () => {
                const { descending: actual } = normalizeSortOptions({
                    ...baseSortOptions,
                    sortBy: 'percentageChange',
                    sortDir: 1,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });
        });

        describe('excluding `descending` param for user explicitly sorts descending, which is the API`s default behavior', () => {
            it('should exclude `descending` when `sortBy` is "keyValuePairs" and `sortDir` is -1', () => {
                const { descending: actual } = normalizeSortOptions({
                    ...baseSortOptions,
                    sortBy: 'keyValuePairs',
                    sortDir: -1,
                });

                expect(actual).toBeUndefined();
            });

            it('should exclude `descending` when `sortBy` is `totalCount` and `sortDir` is -1', () => {
                const { descending: actual } = normalizeSortOptions({
                    ...baseSortOptions,
                    sortBy: 'totalCount',
                    sortDir: -1,
                });

                expect(actual).toBeUndefined();
            });

            it('should exclude `descending` when `sortBy` is `percentageChange` and `sortDir` is -1', () => {
                const { descending: actual } = normalizeSortOptions({
                    ...baseSortOptions,
                    sortBy: 'percentageChange',
                    sortDir: -1,
                });

                expect(actual).toBeUndefined();
            });
        });

        describe('excluding `descending` param for default searches, when no `sortDir` is given', () => {
            it('should exclude `descending` when `sortBy` is "keyValuePairs" and `sortDir` is not provided', () => {
                const { descending: actual } = normalizeSortOptions({
                    sortBy: 'keyValuePairs',
                });

                expect(actual).toBeUndefined();
            });

            it('should exclude `descending` when `sortBy` is `totalCount` and `sortDir` is not provided', () => {
                const { descending: actual } = normalizeSortOptions({
                    sortBy: 'totalCount',
                });

                expect(actual).toBeUndefined();
            });

            it('should exclude `descending` when `sortBy` is `percentageChange` and `sortDir` is not provided', () => {
                const { descending: actual } = normalizeSortOptions({
                    sortBy: 'percentageChange',
                });

                expect(actual).toBeUndefined();
            });
        });
    });
});
