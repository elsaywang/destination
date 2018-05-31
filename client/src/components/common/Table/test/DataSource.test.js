import React from 'react';
import DataSource from '../DataSource';
import withColumns from '../withColumns';

describe('<DataSource /> component', () => {
    const items = [{ key: 'item' }];
    const reloadData = () => {};
    const sortItems = () => {};
    const onLoadMore = () => {};
    const column = { key: 'key' };

    it('should not define `getColumns`, so that the `withColumns` HOC can', () => {
        expect(() => new DataSource()).toThrow();
    });

    it('should override the 3 methods of the react-spectrum `TableViewDataSource` that refer to the table items, so that class can be used in a standardized way', () => {
        const mockDataSource = { items, sortItems, reloadData };

        // Call methods from prototype--creating a `new` DataSource will throw
        // since `getColumns` is not defined.
        expect(() => DataSource.prototype.getNumberOfRows.call(mockDataSource)).not.toThrow();
        expect(() => DataSource.prototype.getCell.call(mockDataSource, column, 0)).not.toThrow();
        expect(() => DataSource.prototype.sort.call(mockDataSource, column, 1)).not.toThrow();
    });

    it('should override react-spectrum `TableViewDataSource` loadMore method if implemented, and it would be called', () => {
        const DataSourceWithColumns = withColumns(DataSource, column);
        const ds = new DataSourceWithColumns({
            items,
            sortItems,
            onLoadMore,
        });
        const spyOnLoadMore = jest.spyOn(ds, 'onLoadMore');
        expect(() => ds.loadMore()).not.toThrow();
        expect(spyOnLoadMore).toHaveBeenCalled();
    });
});
