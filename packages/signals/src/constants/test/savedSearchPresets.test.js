import { newUnusedSignals, savedSearchPresets } from '../savedSearchPresets';

describe('saved search presets constants', () => {
    it('matches snapshot', () => {
        expect(savedSearchPresets).toMatchSnapshot();
    });

    it('should be identified by a unique property, `presetId`', () => {
        const actual = savedSearchPresets.filter(
            savedSearch => typeof savedSearch.presetId !== 'undefined',
        );
        const expected = savedSearchPresets;

        expect(actual).toEqual(expected);
    });

    describe('New Unused Signals', () => {
        it('should contain `filterNewSignals: true`', () => {
            expect(newUnusedSignals.filterNewSignals).toBe(true);
        });
    });
});
