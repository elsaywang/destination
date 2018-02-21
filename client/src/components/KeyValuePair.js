import React, { Fragment } from 'react';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';
import Label from './Label';

function KeyValuePair({ onKeyChange, onOperatorChange, onValueChange, pair }) {
    const operatorOptions = [
        { label: '=', value: '=' },
        { label: '>', value: '>' },
        { label: '<', value: '<' },
    ];
    const { id, key, value, operator } = pair;

    return (
        <Fragment>
            <Label value="Key">
                <Search
                    id={id}
                    value={key}
                    placeholder="Type a key or key name"
                    onChange={onKeyChange}
                />
            </Label>
            <Select
                value={operator}
                onChange={onOperatorChange.bind(this, id)}
                options={operatorOptions}
            />
            <Label value="Value">
                <Search id={id} value={value} placeholder="Type a value" onChange={onValueChange} />
            </Label>
        </Fragment>
    );
}

export default KeyValuePair;
