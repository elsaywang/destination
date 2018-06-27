import { handleLazyLoadSavedSearches } from '../lazyLoad';

describe('test on `handleLoadMore`', () => {
    const visibleSavedSearchList = [{ name: 't1' }, { name: 't2' }, { name: 't3' }];
    const trackedInDashboardSavedSearchList = [
        { name: 't1' },
        { name: 't2' },
        { name: 't3' },
        { name: 't4' },
        { name: 't5' },
    ];
    describe('when bottom of the screen is passed and total visibleSavedSearchList records is less than trackedInDashboardSavedSearchList total records', () => {
        const isBottomPassed = true;
        const loadMoreFn = jest.fn();
        handleLazyLoadSavedSearches(
            isBottomPassed,
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreFn,
        );
        it('loadMore func should be called ', () => {
            expect(loadMoreFn.mock.calls.length).toBe(1);
        });
    });
    describe('when bottom of the screen is not passed', () => {
        const isBottomPassed = false;
        const loadMoreFn = jest.fn();
        handleLazyLoadSavedSearches(
            isBottomPassed,
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreFn,
        );
        it('loadMore func should not be called ', () => {
            expect(loadMoreFn.mock.calls.length).toBe(0);
        });
    });

    describe('total visibleSavedSearchList records is no less than trackedInDashboardSavedSearchList total records', () => {
        const isBottomPassed = true;
        const loadMoreFn = jest.fn();
        const visibleSavedSearchList = [{ name: 't1' }, { name: 't2' }, { name: 't3' }];
        const trackedInDashboardSavedSearchList = [{ name: 't1' }, { name: 't2' }, { name: 't3' }];
        handleLazyLoadSavedSearches(
            isBottomPassed,
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreFn,
        );
        it('loadMore func should not be called ', () => {
            expect(loadMoreFn.mock.calls.length).toBe(0);
        });
    });

    describe('when bottom of the screen is not passed and total visibleSavedSearchList records is no less than trackedInDashboardSavedSearchList total records', () => {
        const isBottomPassed = false;
        const loadMoreFn = jest.fn();
        const visibleSavedSearchList = [{ name: 't1' }, { name: 't2' }, { name: 't3' }];
        const trackedInDashboardSavedSearchList = [{ name: 't1' }, { name: 't2' }, { name: 't3' }];
        handleLazyLoadSavedSearches(
            isBottomPassed,
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreFn,
        );
        it('loadMore func should not be called ', () => {
            expect(loadMoreFn.mock.calls.length).toBe(0);
        });
    });
});
