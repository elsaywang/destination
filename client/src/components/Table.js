import React, { Component } from 'react';
import { TableView, TableViewDataSource } from '@react/react-spectrum/TableView';
import { analyticsColumns, basicColumns } from '../constants/columns';

/**
 * Table component that wraps the react-spectrum table components
 * (`TableView` and `TableViewDataSource`). More easily accepts props
 * for items, columns, and a renderCell method.
 */
class Table extends Component {
    render() {
        const { items, columns, renderCell } = this.props;
        const DataSourceWithColumns = withColumns(DataSource, columns);
        const dataSource = new DataSourceWithColumns({ items });

        return (
            <div style={{ height: this.getTableHeight(items) }}>
                <TableView dataSource={dataSource} renderCell={renderCell} />
            </div>
        );
    }

    /**
     * Dynamically set the height of the table's container to show up to a
     * certain number of rows.
     */
    getTableHeight(items, maxRows = 10) {
        const headHeight = 40;
        const rowHeight = 48;
        const bodyHeight = Math.min(items.length, maxRows) * rowHeight;

        return `${headHeight + bodyHeight}px`;
    }
}

/**
 * Extends the react-spectrum `TableViewDataSource` and overrides the methods
 * that refer to the table items, whihc are stored as `this.items`.
 */
class DataSource extends TableViewDataSource {
    constructor({ items }) {
        super();

        this.items = items;
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

/**
 * Quasi-HOC that wraps the above `DataSource` class (which extends the
 * react-spectrum `TableViewDataSource` class) to return dynamic columns.
 */
function withColumns(DataSource, columns) {
    return class extends DataSource {
        // Override for `TableViewDataSource`
        getColumns() {
            return columns;
        }
    };
}

class SignalsTable extends Component {
    getColumns(signalType) {
        return signalType === 'analytics' ? analyticsColumns : basicColumns;
    }

    renderCell(column, data) {
        return <span>{data}</span>;
    }

    render() {
        const { items, signalType } = this.props;
        const columns = this.getColumns(signalType);

        return <Table items={items} columns={columns} renderCell={this.renderCell} />;
    }
}

// TODO: This file now contains SignalsTable and common-component Table code.
// Extract individual classes & components into separate files.
export default SignalsTable;
