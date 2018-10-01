export const formatDataSourceLabel = (dataSourceId, name) => `${name} (${dataSourceId})`;

export const isValidDataSourceId = (dataSources, selectedDataSourceId) =>
    Boolean(dataSources.filter(({ dataSourceId }) => dataSourceId === selectedDataSourceId).length);

export const getSignalSourceFilterPlaceholderText = sourceType => {
    switch (sourceType) {
        case 'ONBOARDED':
            return 'onboarded records';
        case 'ANALYTICS':
            return 'report suites';
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

export const getSelectedReportSuiteFromSearchResults = results => {
    const { list } = results;
    const sources = list.map(({ source }) => source);
    const reportSuiteIds = sources.map(({ reportSuiteIds }) => reportSuiteIds);
    const firstReportSuitId = reportSuiteIds[0][0];
    //need to check if every reportSuiteId from results are the same => user selected a valid one from advanced ComboBox;
    //else => ''
    return reportSuiteIds.every(reportSuiteId => reportSuiteId[0] === firstReportSuitId)
        ? firstReportSuitId
        : '';
};
