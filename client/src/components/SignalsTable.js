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
    renderCell(column, data) {
        return <span>{data}</span>;
    }

    getColumns(signalType, isAdvancedSearchEnabled = false) {
        switch (signalType) {
            case 'all':
                return allSignalsColumns;
            case 'adobeAnalytics':
                return isAdvancedSearchEnabled ? advancedAnalyticsColumns : analyticsColumns;
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

    render() {
        const { items, signalType, isAdvancedSearchEnabled } = this.props;
        const columns = this.getColumns(signalType, isAdvancedSearchEnabled);

        return <Table items={items} columns={columns} renderCell={this.renderCell} />;
    }
}

SignalsTable.propTypes = {
    items: PropTypes.array,
    signalType: PropTypes.string,
    isAdvancedSearchEnabled: PropTypes.bool,
};

export default SignalsTable;
