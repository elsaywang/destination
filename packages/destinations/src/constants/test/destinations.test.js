import { destinationCategories } from '../destinations';

describe('destination categories constant', () => {
    it('matches snapshot', () => {
        expect(destinationCategories).toMatchSnapshot();
    });
});
