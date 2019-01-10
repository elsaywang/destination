import { dropdownMenuOptions } from '../destinationCreationOptions';

describe('destinations creations drop down Menu Options constants', () => {
    it('matches snapshot', () => {
        expect(dropdownMenuOptions).toMatchSnapshot();
    });
});
