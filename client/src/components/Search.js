import React, { Component } from 'react';
import { GridColumn, GridRow } from '@react/react-spectrum/Grid';
import Well from '@react/react-spectrum/Well';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import Switch from '@react/react-spectrum/Switch';
import NumberInput from '@react/react-spectrum/NumberInput';
import AddCircle from '@react/react-spectrum/Icon/AddCircle';
import RemoveCircle from '@react/react-spectrum/Icon/RemoveCircle';
import AdvancedSearch from './AdvancedSearch';
import CustomDateRange from './CustomDateRange';
import KeyValuePair from './KeyValuePair';
import Label from './common/Label';
import InlineErrorMessage from './common/InlineErrorMessage';
import styles from './Search.css';
import statusOptions from '../constants/signalStatusOptions';
import { isFormValid } from '../utils/searchValidation';
import { getDateRangeOptionsWithinRetentionPolicy } from '../utils/dateRangeOptions';

class Search extends Component {
    getViewRecordsOptions = () =>
        getDateRangeOptionsWithinRetentionPolicy(this.props.maxSignalRetentionDays);

    renderKVPFields = pair => {
        const {
            keyValuePairs,
            advanced,
            source,
            onRemoveClick,
            onAddClick,
            onKeyChange,
            onOperatorChange,
            onValueChange,
        } = this.props;
        const validKeyValuePairsLimit = keyValuePairs.length < 3;
        const isLastPair = id => keyValuePairs[keyValuePairs.length - 1].id === id;
        const onRemove = () => onRemoveClick(pair.id);
        const reportSuiteId = source.reportSuiteIds;

        return (
            <GridRow key={pair.id}>
                <GridColumn size={12} className={styles.keyValuePairs}>
                    <KeyValuePair
                        key={pair.id}
                        pair={pair}
                        advanced={advanced}
                        reportSuiteId={
                            reportSuiteId && reportSuiteId.length ? reportSuiteId[0] : ''
                        }
                        onKeyChange={onKeyChange}
                        onOperatorChange={onOperatorChange}
                        onValueChange={onValueChange}
                    />
                    {isLastPair(pair.id) &&
                        validKeyValuePairsLimit && (
                            <Button
                                label="Add"
                                data-test="add-button"
                                onClick={onAddClick}
                                icon={<AddCircle />}
                                variant="action"
                                quiet
                            />
                        )}
                    {pair.id !== 0 && (
                        <Button
                            label="Remove"
                            data-test="remove-button"
                            onClick={onRemove}
                            icon={<RemoveCircle />}
                            variant="action"
                            quiet
                        />
                    )}
                </GridColumn>
            </GridRow>
        );
    };

    renderCustomDatepickers = () => {
        if (!this.props.isCustomDateRangeEnabled) {
            return null;
        }

        return (
            <CustomDateRange
                customStartDate={this.props.customStartDate}
                customEndDate={this.props.customEndDate}
                onCustomStartDateChange={this.props.onCustomStartDateChange}
                onCustomEndDateChange={this.props.onCustomEndDateChange}
                minCustomStartDateDaysAgo={this.props.maxSignalRetentionDays}
            />
        );
    };

    renderCTAs = () => (
        <GridColumn className={styles.ctas}>
            <Button
                label="Clear All"
                data-test="clear-all-button"
                onClick={this.props.onClearAll}
                quiet
                variant="secondary"
            />
            <Button
                label="Search"
                data-test="search-button"
                onClick={this.props.onSearch}
                variant="cta"
                disabled={!isFormValid(this.props)}
            />
        </GridColumn>
    );

    render() {
        return (
            <GridRow>
                <GridColumn size={12}>
                    <Switch
                        className="advanced-search-toggle"
                        onChange={this.props.onAdvancedSearchChange}
                        checked={this.props.advanced}
                        data-test="advanced-search-toggle"
                        aria-label="Advanced Search"
                        label="Advanced search for Adobe Analytics"
                    />
                    <div>
                        <InlineErrorMessage
                            isInvalid={this.props.errors.reportSuites.hasError}
                            errorMessage={this.props.errors.reportSuites.errorMessage}
                        />
                    </div>
                    <Well>
                        <div data-test="search-form">
                            {this.props.advanced && (
                                <AdvancedSearch
                                    enabled={this.props.advanced}
                                    onReportSuiteChange={this.props.onReportSuiteChange}
                                    onReportSuiteSelect={value =>
                                        this.props.onReportSuiteSelect(value)
                                    }
                                    sourceName={this.props.source.name}
                                    reportSuites={this.props.reportSuites}
                                />
                            )}

                            <GridRow>
                                <GridColumn size={12}>
                                    {this.props.keyValuePairs.map(this.renderKVPFields)}

                                    <GridRow>
                                        <GridColumn size={10}>
                                            <Label value="Signal Status">
                                                <Select
                                                    className="signal-status"
                                                    data-test="signal-status"
                                                    value={this.props.signalStatus}
                                                    onChange={this.props.onSignalStatusChange}
                                                    options={statusOptions}
                                                    quiet
                                                />
                                            </Label>

                                            <Label value="View Records For">
                                                <Select
                                                    className="view-records"
                                                    data-test="view-records"
                                                    value={this.props.viewRecordsFor}
                                                    onChange={this.props.onViewRecordsChange}
                                                    options={this.getViewRecordsOptions()}
                                                    quiet
                                                />
                                            </Label>

                                            {this.renderCustomDatepickers()}

                                            <Label value="Minimum Counts">
                                                <NumberInput
                                                    className="min-counts"
                                                    data-test="min-counts"
                                                    onChange={this.props.onMinEventFiresChange}
                                                    value={this.props.minEventFires}
                                                    min={this.props.eventFiresMinimum}
                                                    step={this.props.eventFiresStep}
                                                    quiet
                                                />
                                            </Label>
                                        </GridColumn>

                                        {this.renderCTAs()}
                                    </GridRow>
                                    <InlineErrorMessage
                                        className={styles.error}
                                        isInvalid={this.props.errors.searchForm.hasError}
                                        errorMessage={this.props.errors.searchForm.errorMessage}
                                    />
                                </GridColumn>
                            </GridRow>
                        </div>
                    </Well>
                </GridColumn>
            </GridRow>
        );
    }
}

export default Search;
