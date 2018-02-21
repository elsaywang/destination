import React, { Component, Fragment } from 'react';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';
import Label from './Label';

const operatorOptions = [
    { label: '=', value: '=' },
    { label: '>', value: '>' },
    { label: '<', value: '<' },
];

class KeyValuePair extends Component {
    constructor(props) {
        super(props);

        this.onSelectOperatorChange = this.props.onOperatorChange.bind(this, this.props.pair.id);
    }

    render() {
        const { onKeyChange, onValueChange, pair } = this.props;
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
                    onChange={this.onSelectOperatorChange}
                    options={operatorOptions}
                />
                <Label value="Value">
                    <Search
                        id={id}
                        value={value}
                        placeholder="Type a value"
                        onChange={onValueChange}
                    />
                </Label>
            </Fragment>
        );
    }
}

export default KeyValuePair;
