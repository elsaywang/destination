import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { TableView } from '@react/react-spectrum/TableView';
import DataSource from './DataSource';
import { defaultRowHeight, defaultMaxRows, defaultHeadHeight } from '../../../constants/rows';
import styles from './Table.css';

/**
 * Table component that wraps the react-spectrum table components
 * (`TableView` and `TableViewDataSource`). More easily accepts props
 * for items, columns, table config, and event handlers.
 */
class Table extends Component {
    constructor({ items, columns, sortSearch, onLoadMore, allowsSelection }) {
        super();

        this.state = {
            dataSource: new DataSource({
                items,
                columns,
                sortSearch,
                onLoadMore,
                allowsSelection,
            }),
        };
    }

    /**
     * Dynamically set the height of the table's container to show up to a
     * certain number of rows.
     */
    getTableHeight({ items, rowHeight = defaultRowHeight, maxRows = defaultMaxRows }) {
        const bodyHeight = Math.min(items.length, maxRows) * rowHeight;

        return `${defaultHeadHeight + bodyHeight}px`;
    }

    shouldComponentUpdate(nextProps) {
        // Skip render optimizations for Dashboard tables, which don't have `selectedRowIndexes`.
        if (!this.props.selectedRowIndexes || !nextProps.selectedRowIndexes) {
            return true;
        }
        if (this.props.isMaxSelectedRowsReached || nextProps.isMaxSelectedRowsReached) {
            return false;
        }
        const getSelectedRowIndexes = ({ selectedRowIndexes }) =>
            JSON.stringify(selectedRowIndexes.sort());

        return getSelectedRowIndexes(nextProps) === getSelectedRowIndexes(this.props);
    }

    componentDidUpdate() {
        const { items, columns } = this.props;

        this.state.dataSource.items = items;
        this.state.dataSource.columns = columns;
        this.state.dataSource.reloadData();
    }

    render() {
        const {
            items,
            rowHeight,
            renderCell,
            onSelectionChange,
            dataTest,
            allowsSelection,
        } = this.props;

        const height = this.getTableHeight({ items, rowHeight });

        return (
            <div
                data-test={dataTest}
                className={classNames('table-wrapper', styles.tableWrapper)}
                style={{ height }}>
                <TableView
                    dataSource={this.state.dataSource}
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
    selectedRowIndexes: PropTypes.array,
    isMaxSelectedRowsReached: PropTypes.bool,
    onSelectionChange: PropTypes.func,
    sortSearch: PropTypes.func,
    dataTest: PropTypes.string,
    allowsSelection: PropTypes.bool,
};

export default Table;
