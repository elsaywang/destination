import { isLimitReached, normalizeSavedSearchList } from '../savedSearch';

describe('savedSearch Utils', () => {
    describe('test on `isLimitReached` func', () => {
        it('should be truthy if savedSearchlist length is equal to the limit', () => {
            const savedSearchlist = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
                { name: 'test3', kvp: 'ewr-ke3' },
            ];
            const limit = 3;
            expect(isLimitReached(savedSearchlist, limit)).toBeTruthy();
        });

        it('should be truthy if savedSearchlist length is greater than the limit', () => {
            const savedSearchlist = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
                { name: 'test3', kvp: 'ewr-ke3' },
                { name: 'test4', kvp: 'ewr-ke4' },
            ];
            const limit = 3;
            expect(isLimitReached(savedSearchlist, limit)).toBeTruthy();
        });

        it('should be falsy if savedSearchlist length is smaller than the limit', () => {
            const savedSearchlist = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
                { name: 'test3', kvp: 'ewr-ke3' },
                { name: 'test4', kvp: 'ewr-ke4' },
            ];
            const limit = 10;
            expect(isLimitReached(savedSearchlist, limit)).toBeFalsy();
        });
    });

    describe('test on `normalizeSavedSearchList` func', () => {
        it('should return the copy of savedSearchList if savedSearchlist length is equal to the limit', () => {
            const savedSearchlist = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
                { name: 'test3', kvp: 'ewr-ke3' },
            ];
            const limit = 3;
            const expectedList = [...savedSearchlist];
            expect(normalizeSavedSearchList(savedSearchlist, limit)).toEqual(expectedList);
        });

        it('should return the truncated savedSearchList if savedSearchlist length is greater than the limit', () => {
            const savedSearchlist = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
                { name: 'test3', kvp: 'ewr-ke3' },
                { name: 'test4', kvp: 'ewr-ke4' },
            ];
            const limit = 2;
            const expectedList = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
            ];
            expect(normalizeSavedSearchList(savedSearchlist, limit)).toEqual(expectedList);
        });

        it('should return the savedSearchList if savedSearchlist length is smaller than the limit', () => {
            const savedSearchlist = [
                { name: 'test1', kvp: 'ewr-key1' },
                { name: 'test2', kvp: 'ewr-key2' },
                { name: 'test3', kvp: 'ewr-ke3' },
                { name: 'test4', kvp: 'ewr-ke4' },
            ];
            const limit = 10;
            expect(normalizeSavedSearchList(savedSearchlist, limit)).toEqual(savedSearchlist);
        });
    });
});
