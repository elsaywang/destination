export const dataSourceOption = (dataSourceId, name) => `${name} (${dataSourceId})`;

export const matchingDataSource = (dataSources, value) =>
    dataSources.find(({ dataSourceId, name }) => dataSourceOption(dataSourceId, name) === value);

export const isDataSourceMatching = (dataSources, value) =>
    Boolean(
        dataSources.filter(
            ({ dataSourceId, name }) => dataSourceOption(dataSourceId, name) === value,
        ).length,
    );
