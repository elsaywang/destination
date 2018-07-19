import { getSelectedRowIndexes } from '../selectedSignals';

describe('selected signals reducer', () => {
    describe('selectors', () => {
        describe('getSelectedRowIndexes', () => {
            it('returns the `selectedRowIndexes` property', () => {
                const state = { selectedRowIndexes: [0, 1] };

                expect(getSelectedRowIndexes(state)).toEqual([0, 1]);
            });
        });
    });
});
