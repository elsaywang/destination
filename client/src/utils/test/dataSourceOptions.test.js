import { formatDataSourceLabel, isValidDataSourceId } from '../dataSourceOptions';

describe('dataSourcesOptions utils tests', () => {
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
});
