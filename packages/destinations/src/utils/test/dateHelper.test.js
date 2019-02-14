import moment from 'moment';
import { datePattern, formatDate, isExpired, expireIn } from '../dateHelper';
import mockdate from 'mockdate';

describe('dateHelper until test', () => {
    beforeEach(() => {
        mockdate.set(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)
    });

    afterEach(() => {
        mockdate.reset();
    });

    it('matches snapshot', () => {
        expect(datePattern).toMatchSnapshot();
    });
    it(`formatDate func test`, () => {
        expect(formatDate(1548345128000)).toEqual('Jan 24, 2019 03:52 PM');
    });
    it(`isExpired func test`, () => {
        expect(isExpired(1548345128000)).toBeFalsy();
        expect(isExpired(1525175000000)).toBeTruthy();
    });

    it(`expireIn func test`, () => {
        expect(expireIn(1548345128000)).toEqual('268 days');
        expect(expireIn(1525175000000)).toEqual('Expired');
    });
});
