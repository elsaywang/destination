import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TableView } from '@react/react-spectrum/TableView';
import DataSource from './DataSource';
import withColumns from './withColumns';

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

Table.propTypes = {
    items: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    renderCell: PropTypes.func.isRequired,
};

export default Table;
