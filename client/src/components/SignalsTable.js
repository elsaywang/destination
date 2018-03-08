import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table from './common/Table';
import { analyticsColumns, basicColumns } from '../constants/columns';

class SignalsTable extends Component {
    getColumns(signalType) {
        return signalType === 'adobeAnalytics' ? analyticsColumns : basicColumns;
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

SignalsTable.propTypes = {
    items: PropTypes.array,
    signalType: PropTypes.string,
};

export default SignalsTable;
