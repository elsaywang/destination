import { getLocaleData } from '../';
describe('i18n setup', () => {
    describe('getLocaleData', () => {
        it('should return an object with `locale` and `messages` properties', () => {
            const localeData = getLocaleData('en');

            expect(localeData).toHaveProperty('locale');
            expect(localeData).toHaveProperty('messages');
        });
        it('should return en data by default if no locale is specified', () => {
            expect(getLocaleData()).toHaveProperty('locale', 'en');
        });
        it('should return en data if an unsupported locale is specified', () => {
            expect(getLocaleData('UNSUPPORTED')).toHaveProperty('locale', 'en');
        });
    });
});
