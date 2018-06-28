import results, { getList, getIsEndOfResults, handleList, handleIsEndOfResults } from '../results';
import { CALL_SEARCH, THROTTLE_LOAD_MORE } from '../../actions/searchForm';

describe('results reducer', () => {
    describe('handleList', () => {
        it('adds a `categoryType` property to each signal in the returned array', () => {
            const list = [
                { source: { sourceType: 'REALTIME' } },
                { source: { sourceType: 'ONBOARDED' } },
            ];
            const action = {
                type: CALL_SEARCH,
                payload: { list },
            };

            expect(handleList([], action)[0].categoryType).toBeDefined();
            expect(handleList([], action)[1].categoryType).toBeDefined();
        });
    });

    describe('handleIsEndOfResults', () => {
        it('should return true if the page of results returns fewer elements than the requested pageSize', () => {
            const action = {
                payload: {
                    list: [{}, {}],
                    pageSize: 3,
                },
            };

            expect(handleIsEndOfResults({}, action)).toEqual(true);
        });

        it('should return true if the page of results returns fewer elements than the requested pageSize, for any page', () => {
            const action = {
                payload: {
                    list: [{}, {}],
                    page: 4,
                    pageSize: 3,
                },
            };

            expect(handleIsEndOfResults({}, action)).toEqual(true);
        });

        it('should return true if the page of results returns zero elements', () => {
            const action = {
                payload: {
                    list: [],
                    pageSize: 20,
                },
            };

            expect(handleIsEndOfResults({}, action)).toEqual(true);
        });

        it('should return false if the page of results returns the same number of elements as `pageSize`', () => {
            const action = {
                payload: {
                    list: [{}, {}],
                    pageSize: 2,
                },
            };

            expect(handleIsEndOfResults({}, action)).toEqual(false);
        });
    });

    it('adds a `categoryType` of "REALTIME" for signals with a source type of "REALTIME"', () => {
        const list = [{ source: { sourceType: 'REALTIME' } }];
        const action = {
            type: CALL_SEARCH,
            payload: { list },
        };

        expect(handleList([], action)[0].categoryType).toEqual('REALTIME');
    });

    it('adds a `categoryType` of "REALTIME" for signals with a source type of "ANALYTICS"', () => {
        const list = [{ source: { sourceType: 'ANALYTICS' } }];
        const action = {
            type: CALL_SEARCH,
            payload: { list },
        };

        expect(handleList([], action)[0].categoryType).toEqual('REALTIME');
    });

    it('adds a `categoryType` of "REALTIME" for signals with a source type of "ALF"', () => {
        const list = [{ source: { sourceType: 'ALF' } }];
        const action = {
            type: CALL_SEARCH,
            payload: { list },
        };

        expect(handleList([], action)[0].categoryType).toEqual('REALTIME');
    });

    it('adds a `categoryType` of "ONBOARDED" for signals with a source type of "ONBOARDED"', () => {
        const list = [{ source: { sourceType: 'ONBOARDED' } }];
        const action = {
            type: CALL_SEARCH,
            payload: { list },
        };

        expect(handleList([], action)[0].categoryType).toEqual('ONBOARDED');
    });

    it('should handle THROTTLE_LOAD_MORE', () => {
        const state = { isThrottled: false };
        const action = {
            type: THROTTLE_LOAD_MORE,
            payload: true,
        };

        expect(results(state, action)).toEqual({ isThrottled: true });
    });

    describe('selectors', () => {
        describe('getList', () => {
            it('should return the `list` property', () => {
                const state = { list: ['test'] };

                expect(getList(state)).toEqual(['test']);
            });
        });

        describe('getIsEndOfResults', () => {
            it('should return the `isEndOfResults` property', () => {
                const state = { isEndOfResults: false };

                expect(getIsEndOfResults(state)).toEqual(false);
            });
        });
    });

    // TODO: Add tests for CALL_SEARCH vs LOAD_MORE
});
