import { destinationsMap } from '../destinations';

describe('destinations map', () => {
    it('matches snapshot', () => {
        expect(destinationsMap).toMatchSnapshot();
    });
});
