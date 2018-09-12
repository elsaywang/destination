import { dataSourceOption, matchingDataSource, isDataSourceMatching } from '../dataSourceOptions';

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
    describe('dataSourceOption', () => {
        it('should return the valid option value', () => {
            const { dataSourceId, name } = dataSource;
            expect(dataSourceOption(dataSourceId, name)).toEqual(
                'Test Datasource: 1535390150786140362 (167507)',
            );
        });
    });
    describe('matchingDataSource', () => {
        it('should return the matching dataSource object if the value input is valid option ', () => {
            const value = 'Test Datasource: 1535390150786140362 (167507)';
            expect(matchingDataSource(dataSources, value)).toEqual(dataSource);
        });

        it('should return undefined if the value input is not valid', () => {
            const value = 'Test Datasource: 1535390150786140362';
            expect(matchingDataSource(dataSources, value)).toEqual(undefined);
        });
    });

    describe('isDataSourceMatching', () => {
        it('should return true if the value input is valid option', () => {
            const value = 'Test Datasource: 1535390150786140362 (167507)';
            expect(isDataSourceMatching(dataSources, value)).toBeTruthy();
        });

        it('should return false if the value input is invalid option', () => {
            const value = 'Test Datasource: 1535390150786140362';
            expect(isDataSourceMatching(dataSources, value)).toBeFalsy();
        });
    });
});
