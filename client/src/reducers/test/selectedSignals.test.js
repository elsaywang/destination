import selectedSignals, { getRecords, getSelectedSignalsDataType } from '../selectedSignals';

describe('selected signals reducer', () => {
    describe('selectors', () => {
        describe('getRecords', () => {
            it('returns the `records` property', () => {
                const state = { records: ['test'] };

                expect(getRecords(state)).toEqual(['test']);
            });
        });

        describe('getSelectedSignalsDataType', () => {
            it('returns "REALTIME" if all selected signals have the `categoryType` "REALTIME"', () => {
                const state = {
                    records: [{ categoryType: 'REALTIME' }, { categoryType: 'REALTIME' }],
                };

                expect(getSelectedSignalsDataType(state)).toEqual('REALTIME');
            });

            it('returns "ONBOARDED" if all selected signals have the `categoryType` "ONBOARDED"', () => {
                const state = {
                    records: [{ categoryType: 'ONBOARDED' }, { categoryType: 'ONBOARDED' }],
                };

                expect(getSelectedSignalsDataType(state)).toEqual('ONBOARDED');
            });

            it('returns "REALTIME" by default if some selected signals have the `categoryType` "REALTIME" and some have the `categoryType` "ONBOARDED"', () => {
                const state = {
                    records: [{ categoryType: 'REALTIME' }, { categoryType: 'ONBOARDED' }],
                };

                expect(getSelectedSignalsDataType(state)).toEqual('REALTIME');
            });

            it('returns null if no signals are selected', () => {
                const state = { records: [] };

                expect(getSelectedSignalsDataType(state)).toEqual(null);
            });
        });
    });
});
