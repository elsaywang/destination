import React from 'react';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import Well from '@react/react-spectrum/Well';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import NumberInput from '@react/react-spectrum/NumberInput';
import Add from '@react/react-spectrum/Icon/Add';
import AdvancedSearch from './AdvancedSearch';
import KeyValuePair from './KeyValuePair';
import Label from './Label';
import withSearchFilters from '../HOCs/withSearchFilters';

import viewRecordsOptions from '../constants/dateRangeOptions';
import statusOptions from '../constants/signalStatusOptions';

function Search(props) {
    const renderKVPFields = () =>
        props.kvp.map(pair => (
            <GridColumn size={7}>
                <KeyValuePair
                    key={pair.id}
                    pair={pair}
                    onKeyChange={props.onKeyChange}
                    onOperatorChange={props.onOperatorChange}
                    onValueChange={props.onValueChange}
                />
            </GridColumn>
        ));

    return (
        <GridRow>
            <GridColumn size={12}>
                <Well>
                    <AdvancedSearch onAdvancedSearchChange={props.onAdvancedSearchChange} />

                    <GridRow>
                        <GridColumn size={8}>
                            <GridRow valign="bottom">
                                {renderKVPFields()}
                                <GridColumn size={2}>
                                    <Button
                                        label="Add"
                                        onClick={props.onAddClick}
                                        icon={<Add />}
                                        variant="quiet"
                                    />
                                </GridColumn>
                            </GridRow>

                            <GridRow valign="bottom">
                                <GridColumn size={7}>
                                    <Label value="Signal Status">
                                        <Select
                                            value={props.status}
                                            onChange={props.onStatusChange}
                                            options={statusOptions}
                                        />
                                    </Label>

                                    <Label value="View Records For">
                                        <Select
                                            value={props.viewRecordsFor}
                                            onChange={props.onViewRecordsChange}
                                            options={viewRecordsOptions}
                                        />
                                    </Label>

                                    <Label value="Minimum Counts">
                                        <NumberInput
                                            onChange={props.onMinCountChange}
                                            value={props.minCount}
                                        />
                                    </Label>
                                </GridColumn>

                                <GridColumn size={3}>
                                    <Button label="Search" onClick={props.onSearch} variant="cta" />
                                    <Button
                                        label="Clear All"
                                        onClick={props.onClearAll}
                                        variant="secondary"
                                    />
                                </GridColumn>
                            </GridRow>
                        </GridColumn>
                    </GridRow>
                </Well>
            </GridColumn>
        </GridRow>
    );
}

export default withSearchFilters(Search);
