import React, { Component } from 'react';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import Well from '@react/react-spectrum/Well';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import NumberInput from '@react/react-spectrum/NumberInput';
import Add from '@react/react-spectrum/Icon/Add';
import AdvancedSearch from './AdvancedSearch';
import KeyValuePair from './KeyValuePair';
import Label from './Label';

import viewRecordsOptions from '../constants/dateRangeOptions';
import statusOptions from '../constants/signalStatusOptions';

const initialSearchState = {
    kvp: [
        {
            id: 0,
            key: '',
            operator: '=',
            value: '',
        },
    ],
    status: 'all',
    advanced: false,
    viewRecordsFor: 7,
    minCount: 1000,
};

class SearchExperience extends Component {
    constructor() {
        super();

        this.state = initialSearchState;
    }

    onAdvancedSearchChange = value => {
        this.setState({
            advanced: value,
        });
    };

    onKeyChange = (value, event) => {
        let kvp = [...this.state.kvp];

        kvp[event.target.id].key = value;
        this.setState({ kvp });
    };

    onValueChange = (value, event) => {
        let kvp = [...this.state.kvp];

        kvp[event.target.id].value = value;
        this.setState({ kvp });
    };

    onOperatorChange = (id, value) => {
        let kvp = [...this.state.kvp];

        kvp[id].operator = value;
        this.setState({ kvp });
    };

    onAddClick = () => {
        const nextId = this.state.kvp.length;
        const newKvp = {
            id: nextId,
            key: '',
            operator: '=',
            value: '',
        };

        this.setState(prevState => ({
            kvp: [...prevState.kvp, newKvp],
        }));
    };

    onStatusChange = value => {
        this.setState({
            status: value,
        });
    };

    onViewRecordsChange = value => {
        if (value === 'custom') {
            // AAM-34805
            // invoke custom date picker
            // set state to custom date range
        } else {
            this.setState({
                viewRecordsFor: value,
            });
        }
    };

    onMinCountChange = value => {
        this.setState({
            minCount: value,
        });
    };

    onSearchClick = () => {
        // make API call w/ this.state
    };

    clearAll = () => {
        this.setState(initialSearchState);
    };

    renderKVPFields = () =>
        this.state.kvp.map(pair => (
            <GridColumn size={7}>
                <KeyValuePair
                    key={pair.id}
                    pair={pair}
                    onKeyChange={this.onKeyChange}
                    onOperatorChange={this.onOperatorChange}
                    onValueChange={this.onValueChange}
                />
            </GridColumn>
        ));

    renderAddButton = () => (
        <GridColumn size={2}>
            <Button label="Add" onClick={this.onAddClick} icon={<Add />} variant="quiet" />
        </GridColumn>
    );

    renderOtherSearchFields = () => (
        <GridColumn size={7}>
            <Label value="Signal Status">
                <Select
                    value={this.state.status}
                    onChange={this.onStatusChange}
                    options={statusOptions}
                />
            </Label>

            <Label value="View Records For">
                <Select
                    value={this.state.viewRecordsFor}
                    onChange={this.onViewRecordsChange}
                    options={viewRecordsOptions}
                />
            </Label>

            <Label value="Minimum Counts">
                <NumberInput onChange={this.onMinCountChange} value={this.state.minCount} />
            </Label>
        </GridColumn>
    );

    renderSearchButtons = () => (
        <GridColumn size={3}>
            <Button label="Search" onClick={this.onSearchClick} variant="cta" />

            <Button label="Clear All" onClick={this.clearAll} variant="secondary" />
        </GridColumn>
    );

    render() {
        return (
            <GridRow>
                <GridColumn size={12}>
                    <Well>
                        <AdvancedSearch onAdvancedSearchChange={this.onAdvancedSearchChange} />

                        <GridRow>
                            <GridColumn size={8}>
                                <GridRow valign="bottom">
                                    {this.renderKVPFields()}
                                    {this.renderAddButton()}
                                </GridRow>

                                <GridRow valign="bottom">
                                    {this.renderOtherSearchFields()}
                                    {this.renderSearchButtons()}
                                </GridRow>
                            </GridColumn>
                        </GridRow>
                    </Well>
                </GridColumn>
            </GridRow>
        );
    }
}

export default SearchExperience;
