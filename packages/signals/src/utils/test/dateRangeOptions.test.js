import { getDateRangeOptions, getDateRangeLabel } from '../dateRangeOptions';

describe('View Records For dropdown options', () => {
    describe('getDateRangeOptions', () => {
        it('should return an array of objects formatted for a <Select />', () => {
            expect(
                getDateRangeOptions([1, 7, 14, 30]).every(
                    option => option.hasOwnProperty('label') && option.hasOwnProperty('value'),
                ),
            ).toBeTruthy();
        });

        it('should return options for each date range days number passed in', () => {
            const actual = getDateRangeOptions([1, 7])
                .slice(0, 2)
                .map(option => option.value);
            const expected = ['1D', '7D'];

            expect(actual).toEqual(expected);
        });

        describe('by default', function() {
            it('should return options for 1, 7, 14, and 30 days', function() {
                const actual = getDateRangeOptions()
                    .slice(0, 4)
                    .map(option => option.value);
                const expected = ['1D', '7D', '14D', '30D'];

                expect(actual).toEqual(expected);
            });

            it('should not contain options for 180 or 365 days', function() {
                const actual = getDateRangeOptions().map(option => option.value);
                const oneEightydays = '180D';
                const threeSixtyFiveDays = '365D';

                expect(actual.includes(oneEightydays)).toEqual(false);
                expect(actual.includes(threeSixtyFiveDays)).toEqual(false);
            });
        });

        it('should append an option for "Custom Date Range"', () => {
            const actual = getDateRangeOptions([1, 7, 14, 30])
                .slice(-1)
                .map(option => option.value);
            const expected = ['custom'];

            expect(actual).toEqual(expected);
        });
    });

    describe('getDateRangeLabel', () => {
        it('should return the label for the given date range value', () => {
            expect(getDateRangeLabel('1D')).toEqual('Last 1 Day');
            expect(getDateRangeLabel('7D')).toEqual('Last 7 Days');
            expect(getDateRangeLabel('14D')).toEqual('Last 14 Days');
            expect(getDateRangeLabel('30D')).toEqual('Last 30 Days');
            expect(getDateRangeLabel('custom')).toEqual('Custom Date Range');
        });

        it('should return an empty string if the given date range value is invalid', () => {
            expect(getDateRangeLabel('180D')).toEqual('');
            expect(getDateRangeLabel('365D')).toEqual('');
            expect(getDateRangeLabel('12345D')).toEqual('');
        });
    });
});
