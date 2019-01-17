import React, { Component } from 'react';
import { TableView } from '@react/react-spectrum/TableView';
import createDataSourceSubclass from './DataSource';
import IndexPath from '../../utils/indexPath';
import PropTypes from 'prop-types';

class Table extends Component {
    constructor({ reachedEndOfRows }) {
        super();

        this.dataSource = createDataSourceSubclass({
            triggerGetInitialData: () => {
                /*no-op*/
            },
            triggerGetMoreData: reachedEndOfRows,
        });
    }

    componentWillMount() {
        this.dataSource.insertSection(0, this.props.items);
    }

    componentWillReceiveProps(nextProps) {
        const length = this.props.items.length;

        this.dataSource.insertItems(new IndexPath(0, length), nextProps.items.slice(length));
    }

    render() {
        const {
            height,
            columns,
            rowHeight,
            renderCell,
            onSelectionChange,
            dataTest,
            allowsSelection,
            styles,
        } = this.props;

        return (
            <div data-test={dataTest} className={styles} style={{ height: `${height}px` }}>
                <TableView
                    columns={columns}
                    dataSource={this.dataSource}
                    renderCell={renderCell}
                    rowHeight={rowHeight}
                    onSelectionChange={onSelectionChange}
                    allowsSelection={allowsSelection}
                />
            </div>
        );
    }
}

Table.defaultProps = {
    items: [],
    rowHeight: 30, // chosen randomly, not sure what a sensible default should be
    allowsSelection: false,
    reachedEndOfRows: () => {
        /* no-op*/
    },
};

Table.protoTypes = {
    height: PropTypes.number,
    columns: PropTypes.array,
    rowHeight: PropTypes.number,
    renderCell: PropTypes.func,
    onSelectionChange: PropTypes.func,
    dataTest: PropTypes.string,
    allowsSelection: PropTypes.bool,
    styles: PropTypes.string,
    setRefreshDataSource: PropTypes.func,
    reachedEndOfRows: PropTypes.func,
};

export default Table;
