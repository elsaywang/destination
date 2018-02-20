import React, { Fragment } from 'react';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';
import Label from './Label';

function KeyValuePair(props) {
    const operatorOptions = [
        { label: '=', value: '=' },
        { label: '>', value: '>' },
        { label: '<', value: '<' },
    ];

    return (
        <Fragment>
            <Label value="Key">
                <Search
                    value={props.keyName}
                    placeholder="Type a key or key name"
                    onChange={props.onKeyChange}
                />
            </Label>
            <Select onChange={props.onOperatorChange} options={operatorOptions} />
            <Label value="Value">
                <Search
                    value={props.value}
                    placeholder="Type a value"
                    onChange={props.onValueChange}
                />
            </Label>
        </Fragment>
    );
}

export default KeyValuePair;
