import React, { Component } from 'react';
import { TableView } from '@react/react-spectrum/TableView';
import ListDataSource from '@react/react-spectrum/ListDataSource';
import IndexPath from '../../utils/indexPath';
import PropTypes from 'prop-types';

class Table extends Component {
    constructor({ reachedEndOfRows, items = [] }) {
        super();

        this.dataSource = new class DataSource extends ListDataSource {
            load() {
                return items;
            }

            performLoadMore() {
                let totalItems = 0;
                for (let i = 0; i < this.getNumberOfSections(); i++) {
                    totalItems += this.getSectionLength(i);
                }

                reachedEndOfRows(totalItems);
            }
        }();
    }

    componentWillReceiveProps(nextProps) {
        const length = this.props.items.length;

        this.dataSource.insertItems(new IndexPath(0, length), nextProps.items.slice(length));
    }

    render() {
        const { dataTest, styles, height, dataSource, items, ...tableViewProps } = this.props;

        return (
            <div data-test={dataTest} className={styles} style={{ height: `${height}px` }}>
                <TableView dataSource={this.dataSource} {...tableViewProps} />
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
    renderCell: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func,
    dataTest: PropTypes.string,
    allowsSelection: PropTypes.bool,
    styles: PropTypes.string,
    setRefreshDataSource: PropTypes.func,
    reachedEndOfRows: PropTypes.func,
};

export default Table;
