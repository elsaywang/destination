import {
    integratedPlatformsOptions,
    getIntegratedPlatformsOptionByType,
    getPlatformOptions,
    destinationTemplateIDMap,
} from '../integratedPlatformsOptions';

describe('integratedPlatformsOptions', () => {
    it('matches snapshot', () => {
        expect(integratedPlatformsOptions).toMatchSnapshot();
    });

    it('should return the correct label name given a valid integrated platform type value', () => {
        const validTypes = ['Integrated Platforms', 'People-Based', 'Device-Based'];
        validTypes.map(type => {
            const actual = getIntegratedPlatformsOptionByType(type);
            const expected = integratedPlatformsOptions.find(({ label, value }) => value === type);
            expect(actual).toEqual(expected);
        });
    });

    it('should return `` given an invalid integrated platform type value', () => {
        const actual = getIntegratedPlatformsOptionByType('custom');
        const expected = ``;
        expect(actual).toEqual(expected);
    });

    it('should return the correct Platform Options given a valid integrated platform type value or label', () => {
        const validPlatforms = ['Facebook', 'Google', 'Twitter', 'LinkedIn'];

        const actual = getPlatformOptions('People-Based');
        expect(actual).toEqual(validPlatforms);
    });

    it('should return empty Array given a invalid integrated platform type value or label', () => {
        const expected = [];
        const actual = getPlatformOptions('Device-Based');
        expect(actual).toEqual(expected);
    });

    it('destinationTemplateIDMap matches snapshot', () => {
        expect(destinationTemplateIDMap).toMatchSnapshot();
    });
});
