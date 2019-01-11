import { handleActions } from 'redux-actions';
import { FETCH_LIMITS_FULFILLED } from '../../actions/limits';
import traitBackfillReducer, { getMaxSignalRetentionDays } from '../traitBackfill';

describe('Trait backfill reducer', () => {
    describe('initial state', () => {
        it('should include the API default for maxSignalRetentionDays (30)', () => {
            const actual = traitBackfillReducer(undefined, {});
            const expected = { maxSignalRetentionDays: 30 };

            expect(actual).toEqual(expected);
        });
    });

    describe('handling actions', () => {
        it('should handle FETCH_LIMITS_FULFILLED', () => {
            const action = {
                type: FETCH_LIMITS_FULFILLED,
                payload: {
                    maxSignalRetentionDays: 180,
                    maxSignalSavedSearches: 10,
                },
            };
            const actual = traitBackfillReducer({}, action);
            const expected = { maxSignalRetentionDays: 180 };

            expect(actual).toEqual(expected);
        });
    });

    describe('selectors', () => {
        describe('getMaxSignalRetentionDays', () => {
            it('should return `maxSignalRetentionDays`', () => {
                const actual = getMaxSignalRetentionDays({ maxSignalRetentionDays: 180 });
                const expected = 180;

                expect(actual).toEqual(expected);
            });
        });
    });
});
