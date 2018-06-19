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
import { baseRowHeight } from '../constants/rows';
import { renderSelectedSignalsMessage, hasWarning } from '../utils/signalSelection';
import { isNumeric } from '../utils/isNumeric';
import styles from './SignalsTable.css';
import TraitsCreation from './common/TraitsCreation';
import TraitsPopover from '../containers/TraitsPopover';

class SignalsTable extends Component {
    renderCell = (column, data) => {
        switch (column.key) {
            case 'keyValuePairs':
                return this.renderKeyValuePairs(data);
            case 'totalCount':
                return this.renderTotalCounts(data);
            case 'percentageChange':
                return this.renderPercentageChange(data);
            case 'includedInTraits':
                return this.renderIncludedInTraits(data);
            default:
                return <span>{data}</span>;
        }
    };

    handleSelectionChange = selectedItems => {
        const { onSignalRecordsSelection, results } = this.props;
        const items = this.formatSignalsList(results.list);
        const selectedRowIndexSet = [];
        //selectedItems is iterable
        for (let indexPath of selectedItems) {
            selectedRowIndexSet.push(indexPath.index);
        }
        const records = selectedRowIndexSet.map(index => ({ rowIndex: index, ...items[index] }));
        const selectionMessage = renderSelectedSignalsMessage(records);
        onSignalRecordsSelection({ records, selectionMessage, hasWarning: hasWarning(records) });
    };

    getColumns(signalType, isAdvancedSearchEnabled = false) {
        switch (signalType) {
            case 'ALL':
                return allSignalsColumns;
            case 'ANALYTICS':
                return isAdvancedSearchEnabled ? advancedAnalyticsColumns : analyticsColumns;
            case 'ALF':
                return actionableLogFilesColumns;
            case 'REALTIME':
                return generalOnlineDataColumns;
            case 'ONBOARDED':
                return onboardedRecordsColumns;
            default:
                return allSignalsColumns;
        }
    }

    formatSignalsList(signals) {
        return signals.map(signal => ({
            ...signal,
            signalType: this.formatSignalType(signal),
            signalSource: this.formatSignalSource(signal),
            includedInTraits: this.formatIncludedInTraits(signal),
        }));
    }

    formatSignalType(signal) {
        const { sourceType } = signal.source;

        switch (sourceType) {
            case 'ANALYTICS':
                return 'Adobe Analytics';
            case 'ALF':
                return 'Actionable Log Files';
            case 'REALTIME':
                return 'General Online Data';
            case 'ONBOARDED':
                return 'Onboarded Records';
            default:
                return '—';
        }
    }

    formatSignalSource(signal) {
        const { sourceType, dataSourceIds, reportSuiteIds } = signal.source;

        switch (sourceType) {
            case 'ANALYTICS':
                return reportSuiteIds && reportSuiteIds.length ? reportSuiteIds.join('') : '—';
            case 'ALF':
                return '—';
            case 'REALTIME':
                return '—';
            case 'ONBOARDED':
                return dataSourceIds && dataSourceIds.length ? dataSourceIds.join('') : '—';
            default:
                return '—';
        }
    }

    formatIncludedInTraits(signal) {
        const { keyValuePairs, includedInTraits, categoryType } = signal;

        const sids = includedInTraits === null ? [] : includedInTraits;

        return { keyValuePairs, sids, categoryType };
    }

    renderKeyValuePairs(keyValuePairs) {
        return (
            <div>
                {keyValuePairs.map(({ key, value }) => {
                    return <div key={`${key}-${value}`}>{`${key}=${value}`}</div>;
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
        if (percentageChange === null || !isNumeric(percentageChange)) {
            return '—';
        }
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

    renderIncludedInTraits = data => {
        const { keyValuePairs, sids, categoryType } = data;
        const number = sids.length;

        if (number === 0) {
            return (
                <TraitsCreation
                    canCreateTraits={this.props.canCreateTraits}
                    keyValuePairs={keyValuePairs}
                    categoryType={categoryType}
                />
            );
        }

        return (
            <div className={styles.traitsPopover}>
                <TraitsPopover sids={sids} />
            </div>
        );
    };

    getRowHeight(totalKeyValuePairs) {
        return totalKeyValuePairs * baseRowHeight;
    }

    render() {
        const {
            results,
            totalKeyValuePairs,
            signalType,
            isAdvancedSearchEnabled,
            onSortSearch,
            onLoadMore,
            allowsSelection,
        } = this.props;
        const columns = this.getColumns(signalType, isAdvancedSearchEnabled);
        const items = this.formatSignalsList(results.list);
        const rowHeight = this.getRowHeight(totalKeyValuePairs);

        return (
            <Table
                dataTest="signals-table"
                items={items}
                columns={columns}
                rowHeight={rowHeight}
                renderCell={this.renderCell}
                sortSearch={onSortSearch}
                onLoadMore={onLoadMore}
                onSelectionChange={this.handleSelectionChange}
                allowsSelection={allowsSelection}
            />
        );
    }
}

SignalsTable.propTypes = {
    results: PropTypes.object,
    totalKeyValuePairs: PropTypes.number,
    signalType: PropTypes.string,
    isAdvancedSearchEnabled: PropTypes.bool,
    onSignalRecordsSelection: PropTypes.func,
    onSortSearch: PropTypes.func,
    onLoadMore: PropTypes.func,
    allowsSelection: PropTypes.bool,
    canCreateTraits: PropTypes.bool,
};

export default SignalsTable;
