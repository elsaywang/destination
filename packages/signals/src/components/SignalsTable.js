import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import classNames from 'classnames';
import Table from './common/Table';
import {
    allSignalsColumns,
    analyticsColumns,
    advancedAnalyticsColumns,
    actionableLogFilesColumns,
    generalOnlineDataColumns,
    onboardedRecordsColumns,
} from '../constants/columns';
import { defaultRowHeight, maxRowHeight } from '../constants/rows';
import {
    renderSelectedSignalsMessage,
    hasSignalSelectionsTypeWarning,
} from '../utils/signalSelection';
import {
    formatDataSourceOptionName,
    formatReportSuiteOptionName,
} from '../utils/signalSourceOptions';
import styles from './SignalsTable.css';
import TraitsCreation from './common/TraitsCreation';
import TraitsPopover from '../containers/TraitsPopover';
import { isEmpty } from '../utils';
import { dataSourceEditUrl } from '../utils/urls';
import Link from '@react/react-spectrum/Link';

class SignalsTable extends Component {
    renderCell = (column, data) => {
        switch (column.key) {
            case 'keyValuePairs':
                return this.renderKeyValuePairs(data);
            case 'keyName':
                return this.renderKeyName(data);
            case 'totalCount':
                return this.renderTotalCounts(data);
            case 'includedInTraits':
                return this.renderIncludedInTraits(data);
            case 'signalType':
                return this.renderSignalType(data);
            default:
                return <span>{data}</span>;
        }
    };

    handleSelectionChange = selectedItems => {
        const { onSignalRecordsSelection, results, signalType } = this.props;
        const items = this.formatSignalsList(results);
        const selectedRowIndexSet = [];
        //selectedItems is iterable
        for (let indexPath of selectedItems) {
            selectedRowIndexSet.push(indexPath.index);
        }
        const records = selectedRowIndexSet.map(index => ({ rowIndex: index, ...items[index] }));
        const selectionMessage = renderSelectedSignalsMessage(records);

        onSignalRecordsSelection({
            selectionMessage,
            signalType,
            hasSignalSelectionsTypeWarning: hasSignalSelectionsTypeWarning(records),
            selectedRowIndexes: selectedRowIndexSet,
        });
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
            keyName: this.formatKeyName(signal),
            signalType: this.formatSignalType(signal),
            signalSource: this.formatSignalSource(signal),
            includedInTraits: this.formatIncludedInTraits(signal),
        }));
    }

    formatKeyName(signal) {
        const { keyValuePairs = [] } = signal;

        return keyValuePairs.map(({ keyName = '—' }) => keyName);
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
        const { sourceName } = signal;

        if (sourceName && dataSourceIds && dataSourceIds.length) {
            const dataSourceId = dataSourceIds[0];
            return (
                <Link href={dataSourceEditUrl(dataSourceId)}>
                    <div
                        data-test="data-source-name"
                        className={classNames(styles.truncate, styles.sourceName)}>
                        {formatDataSourceOptionName(dataSourceId, sourceName)}
                    </div>
                </Link>
            );
        }

        switch (sourceType) {
            case 'ANALYTICS':
                return reportSuiteIds && reportSuiteIds.length ? (
                    <div
                        data-test="report-suite-name"
                        className={classNames(styles.truncate, styles.sourceName)}>
                        {formatReportSuiteOptionName(reportSuiteIds.join(''), sourceName)}
                    </div>
                ) : (
                    '—'
                );
            case 'ONBOARDED':
                return dataSourceIds && dataSourceIds.length
                    ? formatDataSourceOptionName(dataSourceIds.join(''), sourceName)
                    : '—';
            default:
                return '—';
        }
    }

    formatIncludedInTraits(signal) {
        const { keyValuePairs, includedInTraits, categoryType, source } = signal;

        const sids = includedInTraits === null ? [] : includedInTraits;

        return {
            keyValuePairs,
            sids,
            categoryType,
            source,
        };
    }

    renderKeyValuePairs(keyValuePairs) {
        return (
            <div className={classNames(styles.truncate, styles.keyValuePairs)}>
                {keyValuePairs.map(({ key, value }, index) => {
                    return (
                        <div
                            className={classNames(styles.truncate, styles.keyValuePairs)}
                            key={index}
                            data-test={`key-value-pair-${index}`}>
                            {`${key}=${value}`}
                        </div>
                    );
                })}
            </div>
        );
    }

    renderKeyName(keyNames) {
        return (
            <div>
                {keyNames.map((keyName, index) => (
                    <div className={styles.truncate} key={index} data-test={`key-name-${index}`}>
                        {keyName}
                    </div>
                ))}
            </div>
        );
    }

    renderSignalType(signalType) {
        return <div className={styles.signalType}>{signalType}</div>;
    }

    renderTotalCounts(totalCounts) {
        return (
            <FormattedNumber value={totalCounts}>
                {counts => <div style={{ width: '100%' }}>{counts}</div>}
            </FormattedNumber>
        );
    }

    renderIncludedInTraits = data => {
        const { keyValuePairs, sids, source } = data;
        const { dataSourceIds, sourceType } = source;
        const number = sids.length;

        if (number === 0) {
            return (
                <TraitsCreation
                    canCreateTraits={this.props.canCreateTraits}
                    keyValuePairs={keyValuePairs}
                    signalType={sourceType}
                    multiCreation={false}
                    selectedDataSourceIds={dataSourceIds}
                />
            );
        }

        return (
            <div className={styles.traitsPopover}>
                <TraitsPopover sids={sids} />
            </div>
        );
    };

    getRowHeight = () => {
        const { results } = this.props;
        const items = this.formatSignalsList(results);
        const defaultKeyValuePairs = 1;

        if (isEmpty(items)) {
            return defaultRowHeight;
        }

        const { keyValuePairs: { length: totalKeyValuePairs } = [] } = items[0];

        return totalKeyValuePairs > defaultKeyValuePairs ? maxRowHeight : defaultRowHeight;
    };

    render() {
        const {
            results,
            signalType,
            isAdvancedSearchEnabled,
            onSortSearch,
            onLoadMore,
            allowsSelection,
            selectedRowIndexes,
            isMaxSignalSelectionsReached,
        } = this.props;
        const columns = this.getColumns(signalType, isAdvancedSearchEnabled);
        const items = this.formatSignalsList(results);
        const rowHeight = this.getRowHeight();

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
                selectedRowIndexes={selectedRowIndexes}
                isMaxSelectedRowsReached={isMaxSignalSelectionsReached}
            />
        );
    }
}

SignalsTable.propTypes = {
    results: PropTypes.array,
    signalType: PropTypes.string,
    isAdvancedSearchEnabled: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
    onSignalRecordsSelection: PropTypes.func,
    onSortSearch: PropTypes.func,
    onLoadMore: PropTypes.func,
    allowsSelection: PropTypes.bool,
    canCreateTraits: PropTypes.bool,
    selectedRowIndexes: PropTypes.array,
};

export default SignalsTable;
