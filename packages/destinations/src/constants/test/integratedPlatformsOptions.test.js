import {
    integratedPlatformsOptions,
    getIntegratedPlatformsOptionsTypeLabel,
} from '../integratedPlatformsOptions';

describe('integratedPlatformsOptions', () => {
    it('matches snapshot', () => {
        expect(integratedPlatformsOptions).toMatchSnapshot();
    });
    it('should return the correct label name given a valid integrated platform type value', () => {
        const validTypes = ['Integrated Platforms', 'People-Based', 'Device-Based'];
        validTypes.map(type => {
            const actual = getIntegratedPlatformsOptionsTypeLabel(type);
            const expected = integratedPlatformsOptions.find(({ label, value }) => value === type)
                .label;
            expect(actual).toEqual(expected);
        });
    });
    it('should return `` given an invalid integrated platform type value', () => {
        const actual = getIntegratedPlatformsOptionsTypeLabel('custom');
        const expected = ``;

        expect(actual).toEqual(expected);
    });
});
