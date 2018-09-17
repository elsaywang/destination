export const formatDataSourceLabel = (dataSourceId, name) => `${name} (${dataSourceId})`;

export const isValidDataSourceId = (dataSources, selectedDataSourceId) =>
    dataSources.filter(({ dataSourceId }) => dataSourceId === selectedDataSourceId).length;
