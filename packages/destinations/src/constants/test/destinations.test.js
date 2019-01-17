import { dropdownMenuOptions, destinationCategories } from '../destinations';

describe('destinations creations drop down Menu Options constant', () => {
    it('matches snapshot', () => {
        expect(dropdownMenuOptions).toMatchSnapshot();
    });
});

describe('destination categories constant', () => {
    it('matches snapshot', () => {
        expect(destinationCategories).toMatchSnapshot();
    });
});
