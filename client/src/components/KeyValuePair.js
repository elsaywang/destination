import React, { Component, Fragment } from 'react';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';
import Label from './Label';
import operatorOptions from '../constants/operatorOptions';

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
                        className="key-search"
                        id={id}
                        value={key}
                        placeholder="Type a key or key name"
                        onChange={onKeyChange}
                    />
                </Label>
                <Select
                    className="operator"
                    value={operator}
                    onChange={this.onSelectOperatorChange}
                    options={operatorOptions}
                />
                <Label value="Value">
                    <Search
                        className="value-search"
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
