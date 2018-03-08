import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table from './common/Table';
import { analyticsColumns, basicColumns } from '../constants/columns';

class SignalsTable extends Component {
    getColumns(signalType) {
        return signalType === 'analytics' ? analyticsColumns : basicColumns;
    }

    renderCell(column, data) {
        return <span>{data}</span>;
    }

    render() {
        const { items, signalType } = this.props; // TODO: hook up signalType to real filters
        const columns = this.getColumns(signalType);

        return <Table items={items} columns={columns} renderCell={this.renderCell} />;
    }
}

SignalsTable.propTypes = {
    items: PropTypes.array,
    // signalType: PropTypes.string,
};

export default SignalsTable;