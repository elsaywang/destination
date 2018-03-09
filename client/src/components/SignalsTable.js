import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table from './common/Table';
import {
    allSignalsColumns,
    analyticsColumns,
    advancedAnalyticsColumns,
    actionableLogFilesColumns,
    generalOnlineDataColumns,
    onboardedRecordsColumns,
} from '../constants/columns';

class SignalsTable extends Component {
    render() {
        const { items, signalType } = this.props;
        const columns = this.getColumns(signalType);

        return <Table items={items} columns={columns} renderCell={this.renderCell} />;
    }

    renderCell(column, data) {
        return <span>{data}</span>;
    }

    getColumns(signalType, isAdvancedSearchEnabled = false) {
        switch (signalType) {
            case 'all':
                return allSignalsColumns;
            case 'adobeAnalytics':
                return isAdvancedSearchEnabled ? analyticsColumns : advancedAnalyticsColumns;
            case 'actionableLogFiles':
                return actionableLogFilesColumns;
            case 'generalOnlineData':
                return generalOnlineDataColumns;
            case 'onboardedRecords':
                return onboardedRecordsColumns;
            default:
                return allSignalsColumns;
        }
    }
}

SignalsTable.propTypes = {
    items: PropTypes.array,
    signalType: PropTypes.string,
};

export default SignalsTable;
