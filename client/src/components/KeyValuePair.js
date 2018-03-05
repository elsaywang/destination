import React, { Component, Fragment } from 'react';
import Autocomplete from '@react/react-spectrum/Autocomplete';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';
import Textfield from '@react/react-spectrum/Textfield';
import Label from './Label';
import operatorOptions from '../constants/operatorOptions';
import styles from './KeyValuePair.css';
import classNames from 'classnames';

class KeyValuePair extends Component {
    constructor(props) {
        super(props);

        this.onSelectOperatorChange = this.props.onOperatorChange.bind(this, this.props.pair.id);
        this.onKeySelect = this.props.onKeyChange.bind(this, this.props.pair.id);
    }

    getCompletions = key => {
        // TODO: implement `/api/signals/keys?search=${key}` endpoint when API is ready
        return fetch(`http://localhost:3002/api/results`)
            .then(response => response.json())
            .then(json =>
                json.reduce((curr, signal) => {
                    signal.keyValuePairs.forEach(kvp => {
                        if (kvp.key.includes(key)) {
                            curr.push(kvp.key);
                        }
                    });

                    return curr;
                }, []),
            );
    };

    render() {
        const { onValueChange, pair } = this.props;
        const { id, value, operator } = pair;

        return (
            <Fragment>
                <Label value="Key" labelFor="key">
                    <Autocomplete
                        id={id}
                        className={classNames(styles['key-search'], 'key-search')}
                        getCompletions={this.getCompletions}
                        onSelect={this.onKeySelect}>
                        <Textfield id="key" placeholder="Type a key or key name" />
                    </Autocomplete>
                </Label>
                <Select
                    className={classNames(styles.operator, 'operator')}
                    value={operator}
                    onChange={this.onSelectOperatorChange}
                    options={operatorOptions}
                />
                <Label value="Value (Optional)" labelFor={id}>
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
