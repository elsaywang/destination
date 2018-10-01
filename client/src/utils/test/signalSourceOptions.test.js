import {
    formatDataSourceLabel,
    isValidDataSourceId,
    getSignalSourceFilterPlaceholderText,
    isValidReportSuite,
    getDataSourcesOptions,
    getReportSuitesOptions,
    getSignalSourcesOptions,
    getMatchedReportSuiteBySuite,
    getMatchedReportSuiteByName,
    getReportSuitesFromSearchResults,
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
                percentageChange: -0.041808,
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
                percentageChange: -0.041808,
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
                percentageChange: -0.041808,
                includedInTraits: [],
                signalStatus: 'UNUSED',
            },
        ],
        pageSize: 50,
        page: 0,
        total: 0,
        analyticsServiceAvailable: true,
    };

    describe('formatDataSourceLabel', () => {
        it('should return the valid option value', () => {
            const { dataSourceId, name } = dataSource;
            expect(formatDataSourceLabel(dataSourceId, name)).toEqual(
                'Test Datasource: 1535390150786140362 (167507)',
            );
        });
    });

    describe('isValidDataSourceId', () => {
        it('should return true if the value input is valid selectedDataSourceId', () => {
            const selectedDataSourceId = 167507;
            expect(isValidDataSourceId(dataSources, selectedDataSourceId)).toBeTruthy();
        });

        it('should return false if the value input is invalid selectedDataSourceId', () => {
            const selectedDataSourceId = 3347;
            expect(isValidDataSourceId(dataSources, selectedDataSourceId)).toBeFalsy();
        });
    });

    describe('getSignalSourceFilterPlaceholderText', () => {
        it('should return `Onboarded Records` as placeholder if the sourceType is `ONBOARDED`', () => {
            const sourceType = 'ONBOARDED';
            const expectedText = 'Onboarded Records';
            expect(getSignalSourceFilterPlaceholderText(sourceType)).toEqual(expectedText);
        });

        it('should return `Report Suites` as placeholder if the sourceType is `ANALYTICS`', () => {
            const sourceType = 'ANALYTICS';
            const expectedText = 'Report Suites';
            expect(getSignalSourceFilterPlaceholderText(sourceType)).toEqual(expectedText);
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
                { label: 'Test Datasource: 1535390150786140362 (167507)', value: 167507 },
                { label: 'Test Datasource: 1535390172458130751 (167513)', value: 167513 },
                { label: 'Test Datasource: 1535390172501188046 (167514)', value: 167514 },
            ];
            expect(getDataSourcesOptions(dataSources)).toEqual(expectedDataSourcesOptions);
        });
    });

    describe('getReportSuitesOptions', () => {
        it('should return the correct format `label` and `value` of data sources options', () => {
            const expectedReportSuitesOptions = [
                { label: 'OCT MR 01', value: 'aampnw.octmr01' },
                { label: 'Oct MR 02', value: 'aamdal.octmr02' },
            ];
            expect(getReportSuitesOptions(reportSuites)).toEqual(expectedReportSuitesOptions);
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
            expect(getMatchedReportSuiteBySuite(reportSuites, suite)).toEqual(undefined);
        });
    });
    describe('getMatchedReportSuiteByName', () => {
        it('should return the matched report suite option by given name', () => {
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

        it('should return undefined if given name is not in any record within reportSuites', () => {
            const name = 'Oct MR 01NA';
            expect(getMatchedReportSuiteBySuite(reportSuites, name)).toEqual(undefined);
        });
    });

    describe('getReportSuitesFromSearchResults', () => {
        it('should return the correct reportSuite if results list has reportSuiteIds value', () => {
            const expectedRportSuites = 'aampnwtest00';
            expect(getReportSuitesFromSearchResults(results)).toEqual(expectedRportSuites);
        });

        it('should return the `undefined` if result list has no reportSuiteIds value', () => {
            const emptyReportSuiteResults = {
                pid: 1194,
                startDate: 1537574400000,
                endDate: 1538179200000,
                list: [
                    {
                        keyValuePairs: [
                            {
                                key: 'evar0',
                                value: 'CMS0',
                            },
                        ],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: [],
                            sourceType: 'ANALYTICS',
                        },
                        totalCount: 2295996900,
                        percentageChange: 0.307783319327102,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                    },
                ],
            };

            expect(getReportSuitesFromSearchResults(emptyReportSuiteResults)).toEqual(undefined);
        });
    });
});
