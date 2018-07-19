import mockdate from 'mockdate';
import { isMoment } from 'moment';
import {
    isDateRangePreset,
    dateRangeDaysToPreset,
    dateRangePresetToDays,
    getNow,
    getDefaultCustomStartDate,
    getDefaultCustomEndDate,
    dateToDaysAgo,
    getDaysAgo,
    getDaysAgoUTCMidnight,
    parseDate,
    boundDate,
} from '../dateRange';

describe('date range utils', () => {
    beforeEach(() => {
        mockdate.set(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)
    });

    afterEach(() => {
        mockdate.reset();
    });

    describe('isDateRangePreset', () => {
        it('should return true for 1D', () => {
            expect(isDateRangePreset('1D')).toBeTruthy();
        });

        it('should return true for 7D', () => {
            expect(isDateRangePreset('7D')).toBeTruthy();
        });

        it('should return true for 14D', () => {
            expect(isDateRangePreset('14D')).toBeTruthy();
        });

        it('should return true for 30D', () => {
            expect(isDateRangePreset('30D')).toBeTruthy();
        });

        it('should return true for 180D', () => {
            expect(isDateRangePreset('180D')).toBeTruthy();
        });

        it('should return true for 365D', () => {
            expect(isDateRangePreset('365D')).toBeTruthy();
        });
    });

    describe('dateRangeDaysToPreset', () => {
        it('should return the date range preset that corresponds to the given number of days', () => {
            expect(dateRangeDaysToPreset(1)).toEqual('1D');
            expect(dateRangeDaysToPreset(7)).toEqual('7D');
            expect(dateRangeDaysToPreset(14)).toEqual('14D');
            expect(dateRangeDaysToPreset(30)).toEqual('30D');
        });

        it('should return the default date range preset on empty input', () => {
            expect(dateRangeDaysToPreset()).toEqual('7D');
        });

        it('should return the default date range preset on invalid or unaccepted date range days', () => {
            expect(dateRangeDaysToPreset(12345)).toEqual('7D');
        });
    });

    describe('dateRangePresetToDays', () => {
        it('should return the number of days that corresponds to the given date range preset', () => {
            expect(dateRangePresetToDays('1D')).toEqual(1);
            expect(dateRangePresetToDays('7D')).toEqual(7);
            expect(dateRangePresetToDays('14D')).toEqual(14);
            expect(dateRangePresetToDays('30D')).toEqual(30);
        });

        it('should return the default date range days on empty input', () => {
            expect(dateRangePresetToDays()).toEqual(7);
        });

        it('should return the default date range days on invalid or unaccepted date range presets', () => {
            expect(dateRangePresetToDays('12345D')).toEqual(7);
        });
    });

    describe('getNow', () => {
        it('should return a moment object', () => {
            expect(isMoment(getNow())).toBeTruthy();
        });

        it('should be a UTC moment object', () => {
            const actual = getNow().utcOffset();
            const expected = 0;

            expect(actual).toEqual(expected);
        });

        it('should return the current time in UTC', () => {
            const actual = getNow().valueOf();
            const expected = 1525176000000;

            expect(actual).toEqual(expected);
        });
    });

    describe('getDefaultCustomStartDate', () => {
        it('should return the date of the default # of days ago in the format YYYY-MM-DD', () => {
            const actual = getDefaultCustomStartDate();
            const expected = '2018-04-24';

            expect(actual).toEqual(expected);
        });
    });

    describe('getDefaultCustomStartDate', () => {
        it('should return today in the format YYYY-MM-DD', () => {
            const actual = getDefaultCustomEndDate();
            const expected = '2018-05-01';

            expect(actual).toEqual(expected);
        });
    });

    describe('dateToDaysAgo', () => {
        it('should return the difference in days between now and the given date', () => {
            const actual = dateToDaysAgo('2018-04-01');
            const expected = 30;

            expect(actual).toEqual(expected);
        });

        it('should accept the date in the given format', () => {
            const actual = dateToDaysAgo('4/1/18', 'M/D/YY');
            const expected = 30;

            expect(actual).toEqual(expected);
        });
    });

    describe('getDaysAgo', () => {
        it('should return the number of days ago that corresponds to the input if it is a date range preset', () => {
            expect(getDaysAgo('1D')).toEqual(1);
            expect(getDaysAgo('7D')).toEqual(7);
            expect(getDaysAgo('14D')).toEqual(14);
            expect(getDaysAgo('30D')).toEqual(30);
        });

        it('should return the number of days ago that corresponds to the input if it is a date in the format YYYY-MM-DD', () => {
            expect(getDaysAgo('2018-04-01')).toEqual(30);
            expect(getDaysAgo('2018-05-01')).toEqual(0);
        });
    });

    describe('getDaysAgoUTCMidnight', () => {
        it('should return the timestamp for the number of days ago from "now" that corresponds to the input if it is a date range preset', () => {
            const actual = getDaysAgoUTCMidnight('7D');
            const expected = 1524528000000; // Tue Apr 24 2018 00:00:00 GMT+0000 (GMT)

            expect(actual).toEqual(expected);
        });

        it('should return the timestamp for the number of days ago from "now" that corresponds to the input if it is a date in the format YYYY-MM-DD', () => {
            const actual = getDaysAgoUTCMidnight('2018-04-17');
            const expected = 1523923200000; // Tue Apr 17 2018 00:00:00 GMT+0000 (GMT)

            expect(actual).toEqual(expected);
        });
    });

    describe('parseDate', () => {
        it('should parse a date formatted like the `displayFormat` used in <Datepicker /> components (MM/DD/YYYY) and return it as a moment object', () => {
            const actual = parseDate('04/28/2018').valueOf();
            const expected = 1524873600000;

            expect(actual).toEqual(expected);
        });

        it('should parse dates in other formats that a user may type directly into the datepicker, and return them formatted as YYYY-MM-DD', () => {
            expect(parseDate('4/28/2018').valueOf()).toEqual(1524873600000);
            expect(parseDate('04/28/18').valueOf()).toEqual(1524873600000);
            expect(parseDate('4/28/18').valueOf()).toEqual(1524873600000);
        });
    });

    describe('boundDate', () => {
        it('should return the `date` if it is in between the `min` and `max`', () => {
            const actual = boundDate({
                date: '2018-05-01',
                min: '2018-04-01',
                max: '2018-06-01',
            }).format('YYYY-MM-DD');
            const expected = '2018-05-01';

            expect(actual).toEqual(expected);
        });

        it('should return the `min` if the `date` is earlier than it', () => {
            const actual = boundDate({
                date: '2018-04-01',
                min: '2018-05-01',
                max: '2018-06-01',
            }).format('YYYY-MM-DD');
            const expected = '2018-05-01';

            expect(actual).toEqual(expected);
        });

        it('should return the `max` if the `date` is later than it', () => {
            const actual = boundDate({
                date: '2018-06-01',
                min: '2018-04-01',
                max: '2018-05-01',
            }).format('YYYY-MM-DD');
            const expected = '2018-05-01';

            expect(actual).toEqual(expected);
        });
    });
});
