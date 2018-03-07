import React, { Component } from 'react';
import { GridColumn, GridRow } from '@react/react-spectrum/Grid';
import Well from '@react/react-spectrum/Well';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import NumberInput from '@react/react-spectrum/NumberInput';
import AddCircle from '@react/react-spectrum/Icon/AddCircle';
import RemoveCircle from '@react/react-spectrum/Icon/RemoveCircle';
import AdvancedSearch from './AdvancedSearch';
import KeyValuePair from './KeyValuePair';
import Label from './common/Label';

import viewRecordsOptions from '../constants/dateRangeOptions';
import statusOptions from '../constants/signalStatusOptions';

class Search extends Component {
    renderKVPFields = () => {
        return this.props.keyValuePairs.map(pair => (
            <GridRow key={pair.id} valign="bottom">
                <GridColumn size={4}>
                    <KeyValuePair
                        key={pair.id}
                        pair={pair}
                        onKeyChange={this.props.onKeyChange}
                        onOperatorChange={this.props.onOperatorChange}
                        onValueChange={this.props.onValueChange}
                    />
                </GridColumn>
                <GridColumn size={2}>
                    <Button
                        className="add-button"
                        label="Add"
                        onClick={this.props.onAddClick}
                        icon={<AddCircle />}
                        variant="quiet"
                    />
                    {pair.id !== 0 && (
                        <Button
                            className="remove-button"
                            data-id={pair.id}
                            label="Remove"
                            onClick={this.props.onRemoveClick}
                            icon={<RemoveCircle />}
                            variant="quiet"
                        />
                    )}
                </GridColumn>
            </GridRow>
        ));
    };

    renderCTAs = () => (
        <GridColumn size={3}>
            <Button label="Search" onClick={this.props.onSearch} variant="cta" />
            <Button label="Clear All" onClick={this.props.onClearAll} variant="secondary" />
        </GridColumn>
    );

    render() {
        return (
            <GridRow>
                <GridColumn size={12}>
                    <Well>
                        <AdvancedSearch
                            enabled={this.props.advanced}
                            onAdvancedSearchChange={this.props.onAdvancedSearchChange}
                        />

                        <GridRow>
                            <GridColumn size={12}>
                                {this.renderKVPFields()}

                                <GridRow valign="bottom">
                                    <GridColumn size={7}>
                                        <Label value="Signal Status">
                                            <Select
                                                className="signal-status"
                                                value={this.props.status}
                                                onChange={this.props.onStatusChange}
                                                options={statusOptions}
                                            />
                                        </Label>

                                        <Label value="View Records For">
                                            <Select
                                                className="view-records"
                                                value={this.props.viewRecordsFor}
                                                onChange={this.props.onViewRecordsChange}
                                                options={viewRecordsOptions}
                                            />
                                        </Label>

                                        <Label value="Minimum Counts">
                                            <NumberInput
                                                className="min-counts"
                                                onChange={this.props.onMinCountChange}
                                                value={this.props.minCount}
                                            />
                                        </Label>
                                    </GridColumn>

                                    {this.renderCTAs()}
                                </GridRow>
                            </GridColumn>
                        </GridRow>
                    </Well>
                </GridColumn>
            </GridRow>
        );
    }
}

export default Search;
