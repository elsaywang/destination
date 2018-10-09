import { getSelectedResults, getSelectedResultsDataSources } from '../';

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
        describe('getSelectedResultsDataSources', () => {
            const results = {
                list: [
                    {
                        keyValuePairs: [{ key: 'evar0', value: 'CMS0' }],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: null,
                            sourceType: 'ALL',
                        },
                        totalCount: 3095410734,
                        percentageChange: 0.8799245854735473,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                        sourceName: 'QE Automation Account (DO NOT DELETE) Audiences',
                        categoryType: 'REALTIME',
                    },
                    {
                        keyValuePairs: [{ key: 'evar0', value: 'CMS0' }],
                        source: {
                            dataSourceIds: [28975],
                            reportSuiteIds: null,
                            sourceType: 'ONBOARDED',
                        },
                        totalCount: 3095410734,
                        percentageChange: 0.8799245854735473,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                        sourceName: 'QE Automation Account (DO NOT DELETE) Audiences',
                        categoryType: 'ONBOARDED',
                    },
                    {
                        keyValuePairs: [{ key: 'evar1', value: 'CMS1' }],
                        source: {
                            dataSourceIds: [167465],
                            reportSuiteIds: null,
                            sourceType: 'ONBOARDED',
                        },
                        totalCount: 2923029434,
                        percentageChange: 0.270773144653054,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                        sourceName: 'testDatasourcec: 1537800983352',
                        categoryType: 'ONBOARDED',
                    },
                    {
                        keyValuePairs: [{ key: 'evar2', value: 'CMS2' }],
                        source: {
                            dataSourceIds: [167466],
                            reportSuiteIds: null,
                            sourceType: 'ONBOARDED',
                        },
                        totalCount: 88043074,
                        percentageChange: 0.2357109454183901,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                        sourceName: 'testDatasourceb: 1537800983850',
                        categoryType: 'ONBOARDED',
                    },
                    {
                        keyValuePairs: [{ key: 'evar2', value: 'CMS2' }],
                        source: {
                            dataSourceIds: [345869],
                            reportSuiteIds: null,
                            sourceType: 'ONBOARDED',
                        },
                        totalCount: 88043074,
                        percentageChange: 0.2357109454183901,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                        sourceName: 'testDatasourceb: 1537800983850',
                        categoryType: 'ONBOARDED',
                    },
                ],
            };
            const selectedSignals = {
                selectedRowIndexes: [0, 1, 3, 4],
            };
            it('should return a list of selected dataSourceIds', () => {
                const expectedDataSources = [28975, 167466, 345869];
                expect(getSelectedResultsDataSources({ selectedSignals, results })).toEqual(
                    expectedDataSources,
                );
            });
        });
    });
});
