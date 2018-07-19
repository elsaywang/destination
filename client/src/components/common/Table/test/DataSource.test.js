import React from 'react';
import DataSource from '../DataSource';

describe('<DataSource /> component', () => {
    const items = [{ key: 'item' }];
    const sortItems = () => {};
    const onLoadMore = () => {};
    const column = { key: 'key' };
    const columns = [column];

    it('should override the 3 methods of the react-spectrum `TableViewDataSource` that refer to the table items, so that class can be used in a standardized way', () => {
        expect(() => new DataSource({ items }).getNumberOfRows()).not.toThrow();
        expect(() => new DataSource({ items, columns }).getCell(column, 0)).not.toThrow();
        expect(() => new DataSource({ items, columns, sortItems }).sort(column, 1)).not.toThrow();
    });

    it('should override `getColumns`', () => {
        const mockDataSource = { columns };

        expect(() => new DataSource({ columns }).getColumns()).not.toThrow();
    });

    it('should override react-spectrum `TableViewDataSource` loadMore method if implemented, and it would be called', () => {
        const ds = new DataSource({
            items,
            columns,
            sortItems,
            onLoadMore,
        });
        const spyOnLoadMore = jest.spyOn(ds, 'onLoadMore');
        ds.loadMore();
        expect(spyOnLoadMore).toHaveBeenCalled();
    });
});
