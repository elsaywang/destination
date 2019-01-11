import {
    getSelectedResults,
    getDataSourceIdsOfSelectedResults,
    areAllSelectedResultsOnboarded,
    doAllSelectedResultsShareSameDataSource,
    getSharedDataSourceIdsOfSelectedOnboardedResults,
    invalidSelectedOnboardedResultsTraitCreation,
} from '../';

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

        describe('getDataSourceIdsOfSelectedResults', () => {
            const generateResults = dataSourceIdList => ({
                list: dataSourceIdList.map(dataSourceId => ({
                    source: {
                        dataSourceIds: [dataSourceId],
                    },
                })),
            });
            const selectedSignals = {
                selectedRowIndexes: [0, 1],
            };

            it('should return a flattened array of the data source ids of all the selected signals', () => {
                const results = generateResults([12345, 67890]);
                const actual = JSON.stringify(
                    getDataSourceIdsOfSelectedResults({ selectedSignals, results }),
                );
                const expected = JSON.stringify([12345, 67890]);

                expect(actual).toEqual(expected);
            });

            it('should include duplicate data source ids', function() {
                const results = generateResults([12345, 12345]);
                const actual = JSON.stringify(
                    getDataSourceIdsOfSelectedResults({ selectedSignals, results }),
                );
                const expected = JSON.stringify([12345, 12345]);

                expect(actual).toEqual(expected);
            });
        });

        describe('areAllSelectedResultsOnboarded', () => {
            const generateResults = sourceTypeList => ({
                list: sourceTypeList.map(sourceType => ({
                    source: {
                        sourceType: sourceType,
                    },
                })),
            });
            const selectedSignals = {
                selectedRowIndexes: [0, 1],
            };

            it('should return true if all selected signals are onboarded signals', () => {
                const results = generateResults(['ONBOARDED', 'ONBOARDED']);
                const actual = areAllSelectedResultsOnboarded({ selectedSignals, results });
                const expected = true;

                expect(actual).toEqual(expected);
            });

            it('should return false if only some selected signals are onboarded signals', () => {
                const results = generateResults(['ONBOARDED', 'ALF']);
                const actual = areAllSelectedResultsOnboarded({ selectedSignals, results });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should return false if no selected signals are onboarded signals', () => {
                const results = generateResults(['REALTIME', 'ANALYTICS']);
                const actual = areAllSelectedResultsOnboarded({ selectedSignals, results });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should return false if no signals are selected', () => {
                const results = generateResults(['REALTIME', 'ANALYTICS']);
                const emptySelectedSignals = {
                    selectedRowIndexes: [],
                };
                const actual = areAllSelectedResultsOnboarded({
                    selectedSignals: emptySelectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });
        });

        describe('doAllSelectedResultsShareSameDataSource', () => {
            const generateResults = sourceList => ({
                list: sourceList.map(({ sourceType, dataSourceIds }) => ({
                    source: {
                        sourceType,
                        dataSourceIds,
                    },
                })),
            });
            const selectedSignals = {
                selectedRowIndexes: [0, 1],
            };

            it('should return true if all selected signals are onboarded and share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                ]);
                const actual = doAllSelectedResultsShareSameDataSource({
                    selectedSignals,
                    results,
                });
                const expected = true;

                expect(actual).toEqual(expected);
            });

            it('should return false if all selected signals are onboarded but do not share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [67890],
                    },
                ]);
                const actual = doAllSelectedResultsShareSameDataSource({
                    selectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should return false if not all selected signals are onboarded, and thus cannot share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ANALYTICS',
                        dataSourceIds: [],
                    },
                ]);
                const actual = doAllSelectedResultsShareSameDataSource({
                    selectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should return false if no selected signals are onboarded', () => {
                const results = generateResults([
                    {
                        sourceType: 'ALF',
                        dataSourceIds: [],
                    },
                    {
                        sourceType: 'REALTIME',
                        dataSourceIds: [],
                    },
                ]);
                const actual = doAllSelectedResultsShareSameDataSource({
                    selectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('should return false if no signals are selected', () => {
                const results = generateResults([
                    {
                        sourceType: 'ALF',
                        dataSourceIds: [],
                    },
                    {
                        sourceType: 'REALTIME',
                        dataSourceIds: [],
                    },
                ]);
                const emptySelectedSignals = {
                    selectedRowIndexes: [],
                };

                const actual = doAllSelectedResultsShareSameDataSource({
                    selectedSignals: emptySelectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });
        });

        describe('invalidSelectedOnboardedResultsTraitCreation', () => {
            const generateResults = sourceList => ({
                list: sourceList.map(({ sourceType, dataSourceIds }) => ({
                    source: {
                        sourceType,
                        dataSourceIds,
                    },
                })),
            });
            const selectedSignals = {
                selectedRowIndexes: [0, 1],
            };

            it('onboarded trait creation should be valid if all selected signals are onboarded and share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                ]);
                const actual = invalidSelectedOnboardedResultsTraitCreation({
                    selectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('onboarded trait creation should be invalid if all selected signals are onboarded but do not share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [67890],
                    },
                ]);
                const actual = invalidSelectedOnboardedResultsTraitCreation({
                    selectedSignals,
                    results,
                });
                const expected = true;

                expect(actual).toEqual(expected);
            });

            it('onboarded trait creation should be valid if not all selected signals are onboarded, and thus cannot share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ANALYTICS',
                        dataSourceIds: [],
                    },
                ]);
                const actual = invalidSelectedOnboardedResultsTraitCreation({
                    selectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('onboarded trait creation shoud be valid if no selected signals are onboarded', () => {
                const results = generateResults([
                    {
                        sourceType: 'ALF',
                        dataSourceIds: [],
                    },
                    {
                        sourceType: 'REALTIME',
                        dataSourceIds: [],
                    },
                ]);
                const actual = invalidSelectedOnboardedResultsTraitCreation({
                    selectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });

            it('onboarded trait creation shoud be valid if no signals are selected', () => {
                const results = generateResults([
                    {
                        sourceType: 'ALF',
                        dataSourceIds: [],
                    },
                    {
                        sourceType: 'REALTIME',
                        dataSourceIds: [],
                    },
                ]);
                const emptySelectedSignals = {
                    selectedRowIndexes: [],
                };

                const actual = invalidSelectedOnboardedResultsTraitCreation({
                    selectedSignals: emptySelectedSignals,
                    results,
                });
                const expected = false;

                expect(actual).toEqual(expected);
            });
        });

        describe('getSharedDataSourceIdsOfSelectedOnboardedResults', () => {
            const generateResults = sourceList => ({
                list: sourceList.map(({ sourceType, dataSourceIds }) => ({
                    source: {
                        sourceType,
                        dataSourceIds,
                    },
                })),
            });
            const selectedSignals = {
                selectedRowIndexes: [0, 1],
            };

            it('should return an array containing only the shared data source id of the selected signals', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                ]);
                const actual = JSON.stringify(
                    getSharedDataSourceIdsOfSelectedOnboardedResults({ selectedSignals, results }),
                );
                const expected = JSON.stringify([12345]);

                expect(actual).toEqual(expected);
            });

            it('should return return an empty array if all selected signals are onboarded but do not share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [67890],
                    },
                ]);
                const actual = JSON.stringify(
                    getSharedDataSourceIdsOfSelectedOnboardedResults({ selectedSignals, results }),
                );
                const expected = JSON.stringify([]);

                expect(actual).toEqual(expected);
            });

            it('should return an empty array if not all selected signals are onboarded, and thus cannot share the same data source id', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ALF',
                        dataSourceIds: [],
                    },
                ]);
                const actual = JSON.stringify(
                    getSharedDataSourceIdsOfSelectedOnboardedResults({ selectedSignals, results }),
                );
                const expected = JSON.stringify([]);

                expect(actual).toEqual(expected);
            });

            it('should return an empty array if no selected signals are onboarded', () => {
                const results = generateResults([
                    {
                        sourceType: 'ANALYTICS',
                        dataSourceIds: [],
                    },
                    {
                        sourceType: 'realtime',
                        dataSourceIds: [],
                    },
                ]);
                const actual = JSON.stringify(
                    getSharedDataSourceIdsOfSelectedOnboardedResults({ selectedSignals, results }),
                );
                const expected = JSON.stringify([]);

                expect(actual).toEqual(expected);
            });

            it('should return an empty array if no signals are selected', () => {
                const results = generateResults([
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                    {
                        sourceType: 'ONBOARDED',
                        dataSourceIds: [12345],
                    },
                ]);
                const emptySelectedSignals = {
                    selectedRowIndexes: [],
                };
                const actual = JSON.stringify(
                    getSharedDataSourceIdsOfSelectedOnboardedResults({
                        selectedSignals: emptySelectedSignals,
                        results,
                    }),
                );
                const expected = JSON.stringify([]);

                expect(actual).toEqual(expected);
            });
        });
    });
});
