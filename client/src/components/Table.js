import React from 'react';
import { TableView, TableViewDataSource } from '@react/react-spectrum/TableView';
import { basicColumns } from '../constants/columns';

const renderCell = (column, data) => <span>{data}</span>;

// Dynamically set the height of the table's container to show up to a certain number of rows.
const getTableHeight = (items, maxRows = 10) => {
    const headHeight = 40;
    const rowHeight = 48;
    const bodyHeight = Math.min(items.length, maxRows) * rowHeight;

    return `${headHeight + bodyHeight}px`;
};

const Table = ({ items }) => {
    const dataSource = new DataSource({ items });

    return (
        <div style={{ height: getTableHeight(items) }}>
            <TableView dataSource={dataSource} renderCell={renderCell} />
        </div>
    );
};

class DataSource extends TableViewDataSource {
    constructor({ items }) {
        super();

        this.items = items;
    }
    // Override
    getColumns() {
        // TODO: Find a way to dynamically return a column group based on a signalType prop.
        // Stuck because the `TableViewDataSource` superclass calls `getColumns()` before props are available.
        return basicColumns;
    }
    // Override
    getNumberOfRows() {
        return this.items.length;
    }
    // Override
    getCell(column, row) {
        return this.items[row][column.key];
    }
    // Override
    sort(column, direction) {
        this.items.sort((a, b) => (a[column.key] < b[column.key] ? -direction : direction));

        this.reloadData();
    }
}

export default Table;
