import { sortingOptions } from '../saveSearch';

describe('saveSearchUtils', () => {
    describe('test on sortingOptions ', () => {
        it('gives the correct {label,name} mapping sets', () => {
            const optionSets = [
                { label: 'Key-Value Pair', value: 'keyValuePairs' },
                { label: 'Signal Type', value: 'signalType' },
                { label: 'Signal Source', value: 'signalSource' },
                { label: 'Total Counts', value: 'totalCounts' },
                { label: 'Percentage Change', value: 'percentageChange' },
                { label: 'Included In Traits', value: 'includedInTraits' },
            ];
            expect(sortingOptions).toEqual(optionSets);
        });
    });
});
