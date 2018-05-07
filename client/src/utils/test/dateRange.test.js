import mockdate from 'mockdate';
import { isMoment } from 'moment';
import { getNow, getDefaultCustomStartDate, getDefaultCustomEndDate } from '../dateRange';

describe('date range utils', () => {
    beforeEach(() => {
        mockdate.set(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)
    });

    afterEach(() => {
        mockdate.reset();
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
});
