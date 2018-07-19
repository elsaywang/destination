import {
    getDateRangesWithinRetentionPolicy,
    getDateRangeOptions,
    getDateRangeOptionsWithinRetentionPolicy,
    getDateRangeLabel,
} from '../dateRangeOptions';

describe('View Records For dropdown options', () => {
    describe('getDateRangesWithinRetentionPolicy', () => {
        it('should return an array of date range days less than or equal to the given number argument', () => {
            expect(getDateRangesWithinRetentionPolicy(0)).toEqual([]);
            expect(getDateRangesWithinRetentionPolicy(1)).toEqual([1]);
            expect(getDateRangesWithinRetentionPolicy(2)).toEqual([1]);
            expect(getDateRangesWithinRetentionPolicy(30)).toEqual([1, 7, 14, 30]);
            expect(getDateRangesWithinRetentionPolicy(365)).toEqual([1, 7, 14, 30, 180, 365]);
        });

        it('should return an array of date ranges up to 30 days by default', () => {
            expect(getDateRangesWithinRetentionPolicy()).toEqual([1, 7, 14, 30]);
        });
    });

    describe('getDateRangeOptions', () => {
        it('should return an array of objects formatted for a <Select />', () => {
            expect(
                getDateRangeOptions([1, 7, 14, 30]).every(
                    option => option.hasOwnProperty('label') && option.hasOwnProperty('value'),
                ),
            ).toBeTruthy();
        });

        it('should return options for each date range days number passed in', () => {
            const actual = getDateRangeOptions([1, 7, 14, 30])
                .slice(0, 4)
                .map(option => option.value);
            const expected = ['1D', '7D', '14D', '30D'];

            expect(actual).toEqual(expected);
        });

        it('should append an option for "Custom Date Range"', () => {
            const actual = getDateRangeOptions([1, 7, 14, 30])
                .slice(-1)
                .map(option => option.value);
            const expected = ['custom'];

            expect(actual).toEqual(expected);
        });
    });

    describe('getDateRangeOptionsWithinRetentionPolicy', () => {
        it('should return an array of objects formatted for a <Select />', () => {
            expect(
                getDateRangeOptions([1, 7, 14, 30]).every(
                    option => option.hasOwnProperty('label') && option.hasOwnProperty('value'),
                ),
            ).toBeTruthy();
        });

        it('should return options for all date ranges less than or equal to the `maxSignalRetentionDays` argument', () => {
            const actual = getDateRangeOptionsWithinRetentionPolicy(365).map(
                option => option.value,
            );
            const expected = ['1D', '7D', '14D', '30D', '180D', '365D', 'custom'];

            expect(actual).toEqual(expected);
        });

        it('should return options for all date ranges less than or equal to the default of 30 days', () => {
            const actual = getDateRangeOptionsWithinRetentionPolicy().map(option => option.value);
            const expected = ['1D', '7D', '14D', '30D', 'custom'];

            expect(actual).toEqual(expected);
        });
    });

    describe('getDateRangeLabel', () => {
        it('should return the label for the given date range value', () => {
            expect(getDateRangeLabel('1D')).toEqual('Last 1 Day');
            expect(getDateRangeLabel('7D')).toEqual('Last 7 Days');
            expect(getDateRangeLabel('14D')).toEqual('Last 14 Days');
            expect(getDateRangeLabel('30D')).toEqual('Last 30 Days');
            expect(getDateRangeLabel('180D')).toEqual('Last 180 Days');
            expect(getDateRangeLabel('365D')).toEqual('Last 365 Days');
            expect(getDateRangeLabel('custom')).toEqual('Custom Date Range');
        });

        it('should return an empty string if the given date range value is invalid', () => {
            expect(getDateRangeLabel('12345D')).toEqual('');
        });
    });
});
