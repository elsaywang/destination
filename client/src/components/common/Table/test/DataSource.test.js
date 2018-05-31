import React from 'react';
import DataSource from '../DataSource';

describe('<DataSource /> component', () => {
    const items = [{ key: 'item' }];
    const reloadData = () => {};
    const sortItems = () => {};
    const onLoadMore = () => {};
    const column = { key: 'key' };

    it('should not define `getColumns`, so that the `withColumns` HOC can', () => {
        expect(() => new DataSource()).toThrow();
    });

    it('should override the 4 methods of the react-spectrum `TableViewDataSource` that refer to the table items, so that class can be used in a standardized way', () => {
        const mockDataSource = { items, sortItems, reloadData, onLoadMore };

        // Call methods from prototype--creating a `new` DataSource will throw
        // since `getColumns` is not defined.
        expect(() => DataSource.prototype.getNumberOfRows.call(mockDataSource)).not.toThrow();
        expect(() => DataSource.prototype.getCell.call(mockDataSource, column, 0)).not.toThrow();
        expect(() => DataSource.prototype.sort.call(mockDataSource, column, 1)).not.toThrow();
        expect(() => DataSource.prototype.loadMore.call(mockDataSource, column, 1)).not.toThrow();
    });
});
