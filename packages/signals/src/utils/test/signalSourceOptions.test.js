import {
    formatDataSourceOptionName,
    formatReportSuiteOptionName,
    trimReportSuiteOptionName,
    isValidDataSourceName,
    getSignalSourceFilterPlaceholderText,
    getSignalSourceLabel,
    isValidReportSuite,
    getDataSourcesOptions,
    getReportSuitesOptions,
    getSignalSourcesOptions,
    getMatchedDataSourceByName,
    getMatchedReportSuiteBySuite,
    getMatchedReportSuiteByName,
    getSelectedReportSuiteFromSearchResults,
} from '../signalSourceOptions';

describe('signalSourcesOptions utils tests', () => {
    const dataSource = {
        dataSourceId: 167507,
        name: 'Test Datasource: 1535390150786140362',
    };
    const dataSources = [
        {
            dataSourceId: 167507,
            name: 'Test Datasource: 1535390150786140362',
        },
        {
            dataSourceId: 167513,
            name: 'Test Datasource: 1535390172458130751',
        },
        {
            dataSourceId: 167514,
            name: 'Test Datasource: 1535390172501188046',
        },
    ];
    const reportSuites = [
        {
            dataSourceId: 180083,
            pid: 13577,
            name: 'OCT MR 01',
            suite: 'aampnw.octmr01',
            datacenter: 'pnw',
            ssf: true,
        },
        {
            dataSourceId: 180084,
            pid: 13577,
            name: 'Oct MR 02',
            suite: 'aamdal.octmr02',
            datacenter: 'dal',
            ssf: true,
        },
    ];

    const reportSuitesWithNoNames = [
        {
            dataSourceId: 180083,
            pid: 13577,
            suite: 'aampnw.octmr01',
            datacenter: 'pnw',
            ssf: true,
        },
        {
            dataSourceId: 180084,
            pid: 13577,
            suite: 'aamdal.octmr02',
            datacenter: 'dal',
            ssf: true,
        },
    ];

    const results = {
        pid: 13577,
        startDate: 1537574400000,
        endDate: 1538179200000,
        list: [
            {
                keyValuePairs: [
                    {
                        key: 'd_rs',
                        value: 'aampnwtest00',
                    },
                ],
                source: {
                    dataSourceIds: [],
                    reportSuiteIds: ['aampnwtest00'],
                    sourceType: 'ANALYTICS',
                },
                totalCount: 109254,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
            {
                keyValuePairs: [
                    {
                        key: 'averagepagetime',
                        value: '77',
                    },
                ],
                source: {
                    dataSourceIds: [],
                    reportSuiteIds: ['aampnwtest00'],
                    sourceType: 'ANALYTICS',
                },
                totalCount: 109254,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
            {
                keyValuePairs: [
                    {
                        key: 'firsttouchchanneldetail',
                        value: 'some touch detail',
                    },
                ],
                source: {
                    dataSourceIds: [],
                    reportSuiteIds: ['aampnwtest00'],
                    sourceType: 'ANALYTICS',
                },
                totalCount: 109254,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
        ],
        pageSize: 50,
        page: 0,
        total: 0,
        analyticsServiceAvailable: true,
    };

    describe('formatDataSourceOptionName', () => {
        it('should return the correct format of sourceName with dataSourceId when both have value', () => {
            const { dataSourceId, name } = dataSource;
            expect(formatDataSourceOptionName(dataSourceId, name)).toEqual(
                'Test Datasource: 1535390150786140362 (167507)',
            );
        });

        it('should return only the dataSourceId when name has no value', () => {
            const dataSourceIdOnly = {
                dataSourceId: 167507,
                name: '',
            };
            const { dataSourceId, name } = dataSourceIdOnly;
            expect(formatDataSourceOptionName(dataSourceId, name)).toEqual('167507');
        });
    });

    describe('formatReportSuiteOptionName', () => {
        it('should return the correct format of Suite with SuiteName when both have value', () => {
            const { suite, name } = reportSuites[0];
            const expectedSuiteOptionLabel = 'aampnw.octmr01 (OCT MR 01)';
            expect(formatReportSuiteOptionName(suite, name)).toEqual(expectedSuiteOptionLabel);
        });

        it('should return only the Suite when name is unavailble', () => {
            const suiteOnly = reportSuitesWithNoNames[0];
            const { suite, name } = suiteOnly;
            const expectedSuiteOptionLabel = 'aampnw.octmr01';
            expect(formatReportSuiteOptionName(suite, name)).toEqual(expectedSuiteOptionLabel);
        });
    });

    describe('trimReportSuiteOptionName', () => {
        it('should return the trimmed SignalSource name without dataSourceId appended', () => {
            const nameValue = 'Test Report Suite 1540404368306 (170201)';
            const trimmedValue = 'Test Report Suite 1540404368306';
            expect(trimReportSuiteOptionName(nameValue)).toEqual(trimmedValue);
        });
    });
    describe('isValidDataSourceName', () => {
        it('should return true if the value input is valid selectedDataSourceName', () => {
            const selectedDataSourceName = 'Test Datasource: 1535390150786140362';
            expect(isValidDataSourceName(dataSources, selectedDataSourceName)).toBeTruthy();
        });

        it('should return false if the value input is invalid selectedDataSourceName', () => {
            const selectedDataSourceName = 'Test Datasource: 15353901507861';
            expect(isValidDataSourceName(dataSources, selectedDataSourceName)).toBeFalsy();
        });
    });

    describe('getSignalSourceFilterPlaceholderText', () => {
        it('should return `data source` as placeholder if the sourceType is `ONBOARDED`', () => {
            const sourceType = 'ONBOARDED';
            const expectedText = 'data source';
            expect(getSignalSourceFilterPlaceholderText(sourceType)).toEqual(expectedText);
        });

        it('should return `report suites` as placeholder if the sourceType is `ANALYTICS`', () => {
            const sourceType = 'ANALYTICS';
            const expectedText = 'report suites';
            expect(getSignalSourceFilterPlaceholderText(sourceType)).toEqual(expectedText);
        });

        it('should return empty as placeholder by default', () => {
            const sourceType = 'ALL';
            const expectedText = '';
            expect(getSignalSourceFilterPlaceholderText(sourceType)).toEqual(expectedText);
        });
    });

    describe('getSignalSourceLabel', () => {
        it('should return `Data Source` as label if the sourceType is `ONBOARDED`', () => {
            const sourceType = 'ONBOARDED';
            const expectedText = 'Data Source';
            expect(getSignalSourceLabel(sourceType)).toEqual(expectedText);
        });

        it('should return `Report Suite` as label if the sourceType is `ANALYTICS`', () => {
            const sourceType = 'ANALYTICS';
            const expectedText = 'Report Suite';
            expect(getSignalSourceLabel(sourceType)).toEqual(expectedText);
        });

        it('should return empty as placeholder by default', () => {
            const sourceType = 'ALL';
            const expectedText = '';
            expect(getSignalSourceFilterPlaceholderText(sourceType)).toEqual(expectedText);
        });
    });

    describe('isValidReportSuite', () => {
        it('should return true if the value input is valid selectedReportSuite', () => {
            const selectedReportSuite = 'aampnw.octmr01';
            expect(isValidReportSuite(reportSuites, selectedReportSuite)).toBeTruthy();
        });

        it('should return false if the value input is invalid selectedReportSuite', () => {
            const selectedReportSuite = 'aampnw.octmr0100';
            expect(isValidReportSuite(reportSuites, selectedReportSuite)).toBeFalsy();
        });
    });

    describe('getDataSourcesOptions', () => {
        it('should return the correct format `label` and `value` of data sources options', () => {
            const expectedDataSourcesOptions = [
                {
                    label: 'Test Datasource: 1535390150786140362 (167507)',
                    value: 'Test Datasource: 1535390150786140362',
                },
                {
                    label: 'Test Datasource: 1535390172458130751 (167513)',
                    value: 'Test Datasource: 1535390172458130751',
                },
                {
                    label: 'Test Datasource: 1535390172501188046 (167514)',
                    value: 'Test Datasource: 1535390172501188046',
                },
            ];
            expect(getDataSourcesOptions(dataSources)).toEqual(expectedDataSourcesOptions);
        });
    });

    describe('getReportSuitesOptions', () => {
        it('should return the correct format `label` and `value` of report suite options', () => {
            const expectedReportSuitesOptions = [
                { label: 'aampnw.octmr01 (OCT MR 01)', value: 'aampnw.octmr01' },
                { label: 'aamdal.octmr02 (Oct MR 02)', value: 'aamdal.octmr02' },
            ];
            expect(getReportSuitesOptions(reportSuites)).toEqual(expectedReportSuitesOptions);
        });

        it('should have `label` and `value` both are the suite value if reportSuite has no name property', () => {
            const expectedReportSuitesOptions = [
                { label: 'aampnw.octmr01', value: 'aampnw.octmr01' },
                { label: 'aamdal.octmr02', value: 'aamdal.octmr02' },
            ];
            expect(getReportSuitesOptions(reportSuitesWithNoNames)).toEqual(
                expectedReportSuitesOptions,
            );
        });
    });
    describe('getSignalSources', () => {
        it('should return the correct data sources options if sourceType is`ONBOARDED`', () => {
            expect(getSignalSourcesOptions(dataSources, 'ONBOARDED')).toEqual(
                getDataSourcesOptions(dataSources),
            );
        });
        it('should return the correct report suites options if sourceType is `ANALYTICS`', () => {
            expect(getSignalSourcesOptions(reportSuites, 'ANALYTICS')).toEqual(
                getReportSuitesOptions(reportSuites),
            );
        });
        it('should return empty options by default if sourceType is not given', () => {
            const expectedDefaultOptions = [
                {
                    label: '',
                    value: '',
                },
            ];
            expect(getSignalSourcesOptions(dataSources, undefined)).toEqual(expectedDefaultOptions);
            expect(getSignalSourcesOptions(reportSuites, undefined)).toEqual(
                expectedDefaultOptions,
            );
        });
    });
    describe('getMatchedReportSuiteBySuite', () => {
        it('should return the matched report suite option by given suiteId', () => {
            const suite = 'aampnw.octmr01';
            const expectedMatchedSuite = {
                dataSourceId: 180083,
                pid: 13577,
                name: 'OCT MR 01',
                suite: 'aampnw.octmr01',
                datacenter: 'pnw',
                ssf: true,
            };
            expect(getMatchedReportSuiteBySuite(reportSuites, suite)).toEqual(expectedMatchedSuite);
        });
        it('should return undefined if given suiteId is not in any record within reportSuites', () => {
            const suite = 'aamdal.octmr01NA';
            expect(getMatchedReportSuiteBySuite(reportSuites, suite)).toBeUndefined();
        });
    });
    describe('getMatchedReportSuiteByName', () => {
        it('should return the matched by name report suite option by given name', () => {
            const name = 'Oct MR 02';
            const expectedMatchedSuite = {
                dataSourceId: 180084,
                datacenter: 'dal',
                name: 'Oct MR 02',
                pid: 13577,
                ssf: true,
                suite: 'aamdal.octmr02',
            };
            expect(getMatchedReportSuiteByName(reportSuites, name)).toEqual(expectedMatchedSuite);
        });

        it('should return the matched by suite report suite option by given name if no name property in reportSuites', () => {
            const name = 'aamdal.octmr02';
            const expectedMatchedSuite = {
                dataSourceId: 180084,
                datacenter: 'dal',
                pid: 13577,
                ssf: true,
                suite: 'aamdal.octmr02',
            };
            expect(getMatchedReportSuiteByName(reportSuitesWithNoNames, name)).toEqual(
                expectedMatchedSuite,
            );
        });

        it('should return undefined if given name is not in any record within reportSuites', () => {
            const name = 'Oct MR 01NA';
            expect(getMatchedReportSuiteByName(reportSuites, name)).toBeUndefined();
            expect(getMatchedReportSuiteByName(reportSuitesWithNoNames, name)).toBeUndefined();
        });
    });

    describe('getMatchedDataSourceByName', () => {
        it('should return the matched by dataSource option by given name', () => {
            const name = 'Test Datasource: 1535390150786140362';
            const expectedMatchedDS = {
                dataSourceId: 167507,
                name: 'Test Datasource: 1535390150786140362',
            };
            expect(getMatchedDataSourceByName(dataSources, name)).toEqual(expectedMatchedDS);
        });

        it('should return undefined if given name is not in any record within dataSources', () => {
            const name = 'Test Datasource: 15353901507861403628';
            expect(getMatchedDataSourceByName(dataSources, name)).toBeUndefined();
            expect(getMatchedDataSourceByName(dataSources, name)).toBeUndefined();
        });
    });

    describe('getSelectedReportSuiteFromSearchResults', () => {
        it("should return the correct reportSuite if results list has reportSuiteIds value based on user's report suite search", () => {
            const expectedRportSuites = 'aampnwtest00';
            expect(getSelectedReportSuiteFromSearchResults(results)).toEqual(expectedRportSuites);
        });

        it("should return the empty string if result list reportSuites value are not all the same based on user's report suite search", () => {
            const allResults = {
                pid: 1194,
                startDate: 1537747200000,
                endDate: 1538352000000,
                list: [
                    {
                        keyValuePairs: [{ key: 'evar0', value: 'CMS0' }],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: ['mockReportSuite0'],
                            sourceType: 'ANALYTICS',
                        },
                        totalCount: 1563032865,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                    },
                    {
                        keyValuePairs: [{ key: 'evar1', value: 'CMS1' }],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: ['mockReportSuite1'],
                            sourceType: 'ANALYTICS',
                        },
                        totalCount: 101759964,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                    },
                    {
                        keyValuePairs: [{ key: 'evar2', value: 'CMS2' }],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: ['mockReportSuite2'],
                            sourceType: 'ANALYTICS',
                        },
                        totalCount: 3324960152,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                    },
                    {
                        keyValuePairs: [{ key: 'evar3', value: 'CMS3' }],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: ['mockReportSuite3'],
                            sourceType: 'ANALYTICS',
                        },
                        totalCount: 551483598,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                    },
                ],
                pageSize: 50,
                page: 0,
                total: 50,
                analyticsServiceAvailable: true,
            };
            expect(getSelectedReportSuiteFromSearchResults(allResults)).toEqual('');
        });
    });
});
