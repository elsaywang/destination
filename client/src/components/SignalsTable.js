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
import { renderSelectedSignalsMessage, hasWarning } from '../utils/';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';
import styles from './SignalsTable.css';
import TraitsPopover from '../containers/TraitsPopover';

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

    handleSelectionChange = selectedItems => {
        const { onSignalRecordsSelection, results } = this.props;
        const items = this.formatSignalsList(results.list);
        const selectedRowIndexSet = [];
        //selectedItems is iterable
        for (let indexPath of selectedItems) {
            selectedRowIndexSet.push(indexPath.index);
        }
        const records = selectedRowIndexSet.map(i => ({ rowIndex: i, ...items[i] }));
        const warning = hasWarning(records);
        const selectionMessage = renderSelectedSignalsMessage(records);
        onSignalRecordsSelection({ records, displayContext, warning });
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
            includedInTraits: this.formatIncludedInTraits(signal),
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

    formatIncludedInTraits(signal) {
        const { keyValuePairs, includedInTraits, source } = signal;
        const { sourceType } = source;
        return { keyValuePairs, sids: includedInTraits, sourceType };
    }

    renderCreateTraitLink(context) {
        return <div className={styles.linkText}>{context}</div>;
    }

    formatTraitLinkText(sourceType) {
        if (sourceType === 'ONBOARDED') {
            return this.renderCreateTraitLink('Create Onboarded Trait');
        }

        return this.renderCreateTraitLink('Create Rule-based Trait');
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

    renderIncludedInTraits = data => {
        const { sids, sourceType } = data;
        const number = sids.length;

        if (number === 0) {
            return (
                <Link href="#">
                    <div className={styles.link}>
                        <Add size="S" />
                        {this.formatTraitLinkText(sourceType)}
                    </div>
                </Link>
            );
        }
        return (
            <div className={styles.traitsPopover}>
                <TraitsPopover sids={sids} />
            </div>
        );
    };

    render() {
        const { results, signalType, isAdvancedSearchEnabled, sortSearch } = this.props;
        const columns = this.getColumns(signalType, isAdvancedSearchEnabled);
        const items = this.formatSignalsList(results.list);

        return (
            <Table
                items={items}
                columns={columns}
                renderCell={this.renderCell}
                sortSearch={sortSearch}
                onSelectionChange={this.handleSelectionChange}
            />
        );
    }
}

SignalsTable.propTypes = {
    results: PropTypes.object,
    signalType: PropTypes.string,
    isAdvancedSearchEnabled: PropTypes.bool,
    onSignalRecordsSelection: PropTypes.func,
    sortSearch: PropTypes.func,
};

export default SignalsTable;
