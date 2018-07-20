import {
    getSelectedRowIndexes,
    getMaxSignalSelections,
    isMaxSignalSelectionsReached,
    finalizedSelectedRowIndexes,
    finalizedSelectedSignals,
    hasTraitsCreationDisabledWarning,
} from '../selectedSignals';

describe('selected signals reducer', () => {
    describe('selectors', () => {
        describe('getSelectedRowIndexes', () => {
            it('returns the `selectedRowIndexes` property', () => {
                const state = { selectedRowIndexes: [0, 1] };

                expect(getSelectedRowIndexes(state)).toEqual([0, 1]);
            });
        });
        describe('getMaxSignalSelections', () => {
            it('returns the `maxSignalSelections` property', () => {
                const state = { maxSignalSelections: 5 };

                expect(getMaxSignalSelections(state)).toEqual(5);
            });
        });

        describe('isMaxSignalSelectionsReached', () => {
            it('returns false if total selectedRowIndexes length is less than the limit ', () => {
                const state = { selectedRowIndexes: [0, 1], maxSignalSelections: 5 };

                expect(isMaxSignalSelectionsReached(state)).toBeFalsy();
            });

            it('returns true if total selectedRowIndexes length is no less than the limit ', () => {
                const state = {
                    selectedRowIndexes: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10],
                    maxSignalSelections: 5,
                };

                expect(isMaxSignalSelectionsReached(state)).toBeTruthy();
            });
        });

        describe('finalizedSelectedRowIndexes', () => {
            it('returns the selectedRowIndexes if total selectedRowIndexes length is less than the limit ', () => {
                const state = { selectedRowIndexes: [0, 1], maxSignalSelections: 5 };
                const expectedRowIndexes = [...state.selectedRowIndexes];
                expect(finalizedSelectedRowIndexes(state)).toEqual(expectedRowIndexes);
            });

            it('returns the truncated selectedRowIndexes if total selectedRowIndexes length is no less than the limit ', () => {
                const state = {
                    selectedRowIndexes: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10],
                    maxSignalSelections: 5,
                };
                const expectedRowIndexes = [0, 1, 3, 4, 5];
                expect(finalizedSelectedRowIndexes(state)).toEqual(expectedRowIndexes);
            });
        });

        describe('hasTraitsCreationDisabledWarning', () => {
            it('return `true` if hasTraitsCreationDisabledWarning property is true', () => {
                const state = { hasTraitsCreationDisabledWarning: true };
                expect(hasTraitsCreationDisabledWarning(state)).toBeTruthy();
            });

            it('return `false` if hasTraitsCreationDisabledWarning property is false', () => {
                const state = { hasTraitsCreationDisabledWarning: false };
                expect(hasTraitsCreationDisabledWarning(state)).toBeFalsy();
            });
        });

        describe('finalizedSelectedSignals', () => {
            it('return the expected signals object', () => {
                const state = {
                    hasTraitsCreationDisabledWarning: false,
                    selectionMessage: '10 signals have been selected',
                    selectedRowIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    maxSignalSelections: 5,
                };
                const expectedSelectedSignal = {
                    ...state,
                    selectedRowIndexes: [0, 1, 2, 3, 4],
                };
                expect(finalizedSelectedSignals(state)).toEqual(expectedSelectedSignal);
            });
        });
    });
});
