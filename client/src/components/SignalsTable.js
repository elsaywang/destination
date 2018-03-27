import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import PercentageChange from './common/PercentageChange';
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
    renderCell = (column, data) => {
        switch (column.key) {
            case 'keyValuePairs':
                return this.renderKeyValuePairs(data);
            case 'totalCounts':
                return this.renderTotalCounts(data);
            case 'percentageChange':
                return this.renderPercentageChange(data);
            case 'includedInTraits':
                return this.renderIncludedInTraits(data);
            default:
                return <span>{data}</span>;
        }
    };

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

    // These new methods will live somewhere else
    formatSignalsList(signals) {
        return signals.map(signal => ({
            ...signal,
            signalType: this.formatSignalType(signal),
            signalSource: this.formatSignalSource(signal),
        }));
    }

    // TEMP: ALF signals will soon have their own signal type
    isALF(signal) {
        const { dataSourceId } = signal.source;
        const isNumeric = val => Number(parseFloat(val)) === val;

        return isNumeric(dataSourceId);
    }

    formatSignalType(signal) {
        const { sourceType } = signal.source;

        switch (sourceType) {
            case 'ANALYTICS':
                return 'Adobe Analytics';
            case 'REALTIME':
                return this.isALF(signal) ? 'Actionable Log Files' : 'General Online Data';
            case 'ONBOARDED':
                return 'Onboarded Records';
            default:
                return '';
        }
    }

    formatSignalSource(signal) {
        const { sourceType, dataSourceId, reportSuiteId } = signal.source;

        switch (sourceType) {
            case 'ANALYTICS':
                return reportSuiteId;
            case 'REALTIME':
                return '—';
            case 'ONBOARDED':
                return dataSourceId;
            default:
                return '—';
        }
    }

    renderKeyValuePairs(keyValuePairs) {
        return (
            <div>
                {keyValuePairs.map(({ signalKey, signalValue }) => {
                    return (
                        <div key={`${signalKey}-${signalValue}`}>
                            {`${signalKey}=${signalValue}`}
                        </div>
                    );
                })}
            </div>
        );
    }

    renderTotalCounts(totalCounts) {
        return (
            <FormattedNumber value={totalCounts}>
                {counts => <div style={{ textAlign: 'right' }}>{counts}</div>}
            </FormattedNumber>
        );
    }

    renderPercentageChange = percentageChange => {
        const maxPercentageMagnitude = Math.max(
            ...this.props.results.list.map(item => Math.abs(item.percentageChange)),
        );

        return (
            <PercentageChange
                percentageChange={percentageChange}
                maxPercentageMagnitude={maxPercentageMagnitude}
            />
        );
    };

    renderIncludedInTraits(sids) {
        return <span>{`${sids.length} Traits`}</span>;
    }

    render() {
        const { results, signalType, isAdvancedSearchEnabled } = this.props;
        const columns = this.getColumns(signalType, isAdvancedSearchEnabled);
        const items = this.formatSignalsList(results.list);

        return <Table items={items} columns={columns} renderCell={this.renderCell} />;
    }
}

SignalsTable.propTypes = {
    results: PropTypes.object,
    signalType: PropTypes.string,
    isAdvancedSearchEnabled: PropTypes.bool,
};

export default SignalsTable;
