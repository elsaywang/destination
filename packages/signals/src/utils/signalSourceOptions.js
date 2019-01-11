export const formatDataSourceOptionName = (dataSourceId, name) =>
    name ? `${name} (${dataSourceId})` : `${dataSourceId}`;

export const formatReportSuiteOptionName = (suite, name) =>
    name ? `${suite} (${name})` : `${suite}`;

export const trimReportSuiteOptionName = signalSourceLabel =>
    signalSourceLabel.replace(/\s*\(.*?\)\s*/g, '');

export const isValidDataSourceName = (dataSources, selectedDataSourceName) =>
    Boolean(dataSources.filter(({ name }) => name === selectedDataSourceName).length);

export const getSignalSourceFilterPlaceholderText = sourceType => {
    switch (sourceType) {
        case 'ONBOARDED':
            return 'data source';
        case 'ANALYTICS':
            return 'report suites';
        default:
            return '';
    }
};

export const getSignalSourceLabel = sourceType => {
    switch (sourceType) {
        case 'ONBOARDED':
            return 'Data Source';
        case 'ANALYTICS':
            return 'Report Suite';
        default:
            return '';
    }
};

export const isValidReportSuite = (reportSuites, selectedReportSuite) =>
    Boolean(reportSuites.filter(({ suite }) => suite === selectedReportSuite).length);

export const getMatchedReportSuiteBySuite = (reportSuites, suiteValue) =>
    reportSuites.find(({ suite }) => suite.toLowerCase() === suiteValue.toLowerCase());

export const getMatchedReportSuiteByName = (reportSuites, nameValue) =>
    reportSuites.find(({ name, suite }) => {
        const matchedProp = name || suite;
        return matchedProp.toLowerCase() === trimReportSuiteOptionName(nameValue).toLowerCase();
    });

export const getMatchedDataSourceByName = (dataSources, nameValue) =>
    dataSources.find(({ name }) => name.toLowerCase() === nameValue.toLowerCase());

export const getDataSourcesOptions = dataSources =>
    dataSources.map(({ dataSourceId, name }) => ({
        label: formatDataSourceOptionName(dataSourceId, name),
        value: name,
    }));

export const getReportSuitesOptions = reportSuites =>
    reportSuites.map(({ name, suite }) => ({
        label: formatReportSuiteOptionName(suite, name),
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

export const getSelectedReportSuiteFromSearchResults = ({ list }) => {
    const sources = list.map(({ source }) => source);
    const reportSuiteIds = sources.map(({ reportSuiteIds }) => reportSuiteIds);
    if (!reportSuiteIds.length) {
        return '';
    }
    const firstReportSuiteId = reportSuiteIds[0][0];
    //need to check if every reportSuiteId from results are the same => user selected a valid one from advanced ComboBox;
    //else => ''
    return reportSuiteIds.every(reportSuiteId => reportSuiteId[0] === firstReportSuiteId)
        ? firstReportSuiteId
        : '';
};
