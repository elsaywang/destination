import { routes } from '../navTab';

describe('nav Tab routes constants', () => {
    it('matches snapshot', () => {
        expect(routes).toMatchSnapshot();
    });
});
