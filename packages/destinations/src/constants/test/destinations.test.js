import {
    destinationCategories,
    destinationTypeMap,
    getCategoryByDestinationType,
} from '../destinations';

describe('destination categories constant', () => {
    it('matches snapshot', () => {
        expect(destinationCategories).toMatchSnapshot();
    });
});

describe('destination types constant', () => {
    it('matches snapshot', () => {
        expect(destinationTypeMap).toMatchSnapshot();
    });
});

describe('getCategoryByDestinationType', () => {
    it('matches snapshot', () => {
        Object.keys(destinationTypeMap).map(type =>
            expect(getCategoryByDestinationType(type)).toMatchSnapshot(),
        );
    });
});
