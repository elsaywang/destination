import React from 'react';
import withColumns from '../components/common/Table/withColumns';

describe('withColumns HOC', () => {
    it('should define `getColumns` on a DataSource argument by extending it', () => {
        class MockDataSource {
            // Empty
        }
        const columns = [
            {
                title: 'Name',
                key: 'name',
            },
            {
                title: 'Description',
                key: 'description',
            },
        ];
        const mockDataSourceWithColumns = new (withColumns(MockDataSource, columns))();

        expect(mockDataSourceWithColumns.getColumns()).toEqual(columns);
    });
});
