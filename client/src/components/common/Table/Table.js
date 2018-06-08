import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TableView } from '@react/react-spectrum/TableView';
import DataSource from './DataSource';
import withColumns from './withColumns';
import { defaultRowHeight, defaultMaxRows, defaultHeadHeight } from '../../../constants/rows';

/**
 * Table component that wraps the react-spectrum table components
 * (`TableView` and `TableViewDataSource`). More easily accepts props
 * for items, columns, and a renderCell method.
 * TODO: nice empty state
 */
class Table extends Component {
    /**
     * Dynamically set the height of the table's container to show up to a
     * certain number of rows.
     */
    getTableHeight(items, rowHeight = defaultRowHeight, maxRows = defaultMaxRows) {
        const headHeight = defaultHeadHeight;
        const bodyHeight = Math.min(items.length, maxRows) * rowHeight;

        return `${headHeight + bodyHeight}px`;
    }

    render() {
        const {
            items,
            columns,
            rowHeight,
            renderCell,
            sortSearch,
            onLoadMore,
            onSelectionChange,
            dataTest,
            allowsSelection,
        } = this.props;
        const DataSourceWithColumns = withColumns(DataSource, columns);
        const dataSource = new DataSourceWithColumns({
            items,
            sortSearch,
            onLoadMore,
        });
        const height = this.getTableHeight(items, rowHeight);

        return (
            <div data-test={dataTest} className="table-wrapper" style={{ height }}>
                <TableView
                    dataSource={dataSource}
                    renderCell={renderCell}
                    rowHeight={rowHeight}
                    onSelectionChange={onSelectionChange}
                    allowsSelection={allowsSelection}
                />
            </div>
        );
    }
}

Table.propTypes = {
    items: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    renderCell: PropTypes.func.isRequired,
    rowHeight: PropTypes.number,
    onSelectionChange: PropTypes.func,
    sortSearch: PropTypes.func,
    dataTest: PropTypes.string,
    allowsSelection: PropTypes.bool,
};

export default Table;
