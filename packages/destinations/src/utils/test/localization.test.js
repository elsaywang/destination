import { getMessages } from '../localization';

describe('localization util', () => {
    it('matches snapshot', () => {
        expect(getMessages('Configuration')).toMatchSnapshot();
        expect(getMessages('Destinations')).toMatchSnapshot();
    });
});
