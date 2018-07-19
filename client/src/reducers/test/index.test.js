import { getSelectedResults } from '../';

describe('root reducer', () => {
    describe('selectors', () => {
        describe('getSelectedResults', () => {
            it('should return the results of the selected row indexes', () => {
                const results = {
                    list: [{ id: 1 }, { id: 2 }, { id: 3 }],
                };
                const selectedSignals = {
                    selectedRowIndexes: [0, 2],
                };
                const actual = JSON.stringify(getSelectedResults({ selectedSignals, results }));
                const expected = JSON.stringify([{ id: 1 }, { id: 3 }]);

                expect(actual).toEqual(expected);
            });
        });
    });
});
