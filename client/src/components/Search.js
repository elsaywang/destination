import React, { Component, Fragment } from 'react';
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

import viewRecordsOptions from '../constants/dateRangeOptions';
import statusOptions from '../constants/signalStatusOptions';
import { isFormValid } from '../utils/searchValidation';

class Search extends Component {
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
                <GridColumn
                    size={12}
                    style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 10 }}>
                    <KeyValuePair
                        key={pair.id}
                        pair={pair}
                        advanced={advanced}
                        reportSuiteId={reportSuiteId ? reportSuiteId[0] : 0}
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
            />
        );
    };

    renderCTAs = () => (
        <GridColumn size={3}>
            <Button
                label="Search"
                data-test="search-button"
                onClick={this.props.onSearch}
                variant="cta"
                disabled={!isFormValid(this.props)}
            />
            <Button
                label="Clear All"
                data-test="clear-all-button"
                onClick={this.props.onClearAll}
                variant="secondary"
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
                    <Well>
                        <div data-test="search-form">
                            {this.props.advanced && (
                                <AdvancedSearch
                                    enabled={this.props.advanced}
                                    onFilterChange={this.props.onFilterChange}
                                    onFilterSelect={value => this.props.onFilterSelect(value)}
                                    sourceName={this.props.source.name}
                                    reportSuites={this.props.reportSuites}
                                />
                            )}

                            <GridRow>
                                <GridColumn size={12}>
                                    {this.props.keyValuePairs.map(this.renderKVPFields)}

                                    <GridRow>
                                        <GridColumn size={7}>
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
                                                    options={viewRecordsOptions}
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
                                                    quiet
                                                />
                                            </Label>
                                        </GridColumn>

                                        {this.renderCTAs()}
                                    </GridRow>
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
