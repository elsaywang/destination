export const formatDataSourceLabel = (dataSourceId, name) => `${name} (${dataSourceId})`;

export const isValidDataSourceId = (dataSources, selectedDataSourceId) =>
    Boolean(dataSources.filter(({ dataSourceId }) => dataSourceId === selectedDataSourceId).length);

export const getSignalSourceFilterPlaceholderText = sourceType => {
    switch (sourceType) {
        case 'ONBOARDED':
            return 'Onboarded Records';
        case 'ANALYTICS':
            return 'Report Suites';
        default:
            return '';
    }
};

export const isValidReportSuite = (reportSuites, selectedReportSuite) =>
    Boolean(reportSuites.filter(({ suite }) => suite === selectedReportSuite).length);

export const getMatchedReportSuiteBySuite = (reportSuites, suite) =>
    reportSuites.find(reportSuite => reportSuite.suite.toLowerCase() === suite.toLowerCase());

export const getMatchedReportSuiteByName = (reportSuites, name) =>
    reportSuites.find(reportSuite => reportSuite.name.toLowerCase() === name.toLowerCase());

export const getDataSourcesOptions = dataSources =>
    dataSources.map(({ dataSourceId, name }) => ({
        label: formatDataSourceLabel(dataSourceId, name),
        value: dataSourceId,
    }));

export const getReportSuitesOptions = reportSuites =>
    reportSuites.map(({ name, suite }) => ({
        label: name,
        value: suite,
    }));

export const getSignalSourcesOptions = (signalSources, sourceType) => {
    switch (sourceType) {
        case 'ONBOARDED':
            return getDataSourcesOptions(signalSources);
        case 'ANALYTICS':
            return getReportSuitesOptions(signalSources);
        default:
            return [
                {
                    label: '',
                    value: '',
                },
            ];
    }
};

export const getReportSuitesFromSearchResults = results => {
    const { list } = results;
    const source = list.map(({ source }) => source)[0];
    return source.reportSuiteIds[0];
};
