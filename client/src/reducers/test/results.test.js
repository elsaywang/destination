import results, { getList, list as listReducer } from '../results';
import { CALL_SEARCH_FULFILLED } from '../../actions/searchForm';

describe('results reducer', () => {
    describe('list nested reducer', () => {
        it('adds a `dataType` property to each signal in the returned array', () => {
            const list = [
                { source: { sourceType: 'REALTIME' } },
                { source: { sourceType: 'ONBOARDED' } },
            ];
            const action = {
                type: CALL_SEARCH_FULFILLED,
                payload: { list },
            };

            expect(listReducer([], action)[0].dataType).toBeDefined();
            expect(listReducer([], action)[1].dataType).toBeDefined();
        });
    });

    it('adds a `dataType` of "REALTIME" for signals with a source type of "REALTIME"', () => {
        const list = [{ source: { sourceType: 'REALTIME' } }];
        const action = {
            type: CALL_SEARCH_FULFILLED,
            payload: { list },
        };

        expect(listReducer([], action)[0].dataType).toEqual('REALTIME');
    });

    it('adds a `dataType` of "ANALYTICS" for signals with a source type of "REALTIME"', () => {
        const list = [{ source: { sourceType: 'ANALYTICS' } }];
        const action = {
            type: CALL_SEARCH_FULFILLED,
            payload: { list },
        };

        expect(listReducer([], action)[0].dataType).toEqual('REALTIME');
    });

    it('adds a `dataType` of "ALF" for signals with a source type of "REALTIME"', () => {
        const list = [{ source: { sourceType: 'ALF' } }];
        const action = {
            type: CALL_SEARCH_FULFILLED,
            payload: { list },
        };

        expect(listReducer([], action)[0].dataType).toEqual('REALTIME');
    });

    it('adds a `dataType` of "ONBOARDED" for signals with a source type of "REALTIME"', () => {
        const list = [{ source: { sourceType: 'ONBOARDED' } }];
        const action = {
            type: CALL_SEARCH_FULFILLED,
            payload: { list },
        };

        expect(listReducer([], action)[0].dataType).toEqual('ONBOARDED');
    });

    describe('selectors', () => {
        describe('getList', () => {
            it('should return the `list` property', () => {
                const state = { list: ['test'] };

                expect(getList(state)).toEqual(['test']);
            });
        });
    });
});
