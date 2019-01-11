import {
    peopleBasedDestinationsTypeOptions,
    getPeopleBasedDestinationsTypeLabel,
} from '../peopleBasedDestinationsOptions';

describe('peopleBasedDestinationsTypeOptions', () => {
    it('matches snapshot', () => {
        expect(peopleBasedDestinationsTypeOptions).toMatchSnapshot();
    });
    it('should return the correct label name given a valid destinaion type value', () => {
        const actual = getPeopleBasedDestinationsTypeLabel('FB');
        const expected = `FACEBOOK`;

        expect(actual).toEqual(expected);
    });
    it('should return `` given an invalid destinaion type value', () => {
        const actual = getPeopleBasedDestinationsTypeLabel('YAHOO');
        const expected = ``;

        expect(actual).toEqual(expected);
    });
});
