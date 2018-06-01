import React, { Component } from 'react';
import Autocomplete from '@react/react-spectrum/Autocomplete';
import Select from '@react/react-spectrum/Select';
import Textfield from '@react/react-spectrum/Textfield';
import Label from './common/Label';
import operatorOptions from '../constants/operatorOptions';
import styles from './KeyValuePair.css';
import classNames from 'classnames';
import fetch from '../utils/fetch';
import { isValueValid, isKeyEmptyWithValue } from '../utils/searchValidation';
import InlineErrorMessage from './common/InlineErrorMessage';

class KeyValuePair extends Component {
    constructor(props) {
        super(props);

        this.onSelectOperatorChange = this.props.onOperatorChange.bind(this, this.props.pair.id);
        this.onKeyChange = this.props.onKeyChange.bind(this, this.props.pair.id);
        this.onValueChange = this.onValueChange.bind(this);
    }

    state = {
        autocompleteError: false,
        autocompleteErrorMessage: '',
    };

    getCompletions = key => {
        return fetch(`/portal/api/v1/signals/keys?search=${key}&total=8`)
            .then(response => {
                if (response.ok) {
                    this.setAutocompleteErrorMessage();

                    return response.json();
                }

                throw new Error(response.statusText);
            })
            .then(json => json.map(key => key.signalKey))
            .catch(error => {
                this.setState({
                    autocompleteError: true,
                    autocompleteErrorMessage: error.message,
                });
            });
    };

    getKeysByReportSuiteId = key => {
        const { reportSuiteId } = this.props;

        return fetch(
            `/portal/api/v1/signals/keys?search=${key}&reportSuiteId=${reportSuiteId}&total=8`,
        )
            .then(response => {
                if (response.ok) {
                    this.setAutocompleteErrorMessage();

                    return response.json();
                }

                throw new Error(response.statusText);
            })
            .then(suites =>
                suites.map(suite => ({
                    label: `${suite.signalKey} (${suite.signalKeyName})`,
                    id: suite.signalKey,
                })),
            )
            .catch(error => {
                this.setState({
                    autocompleteError: true,
                    autocompleteErrorMessage: error.message,
                });
            });
    };

    setAutocompleteErrorMessage = () => {
        if (isKeyEmptyWithValue(this.props.pair)) {
            this.setState({
                autocompleteError: true,
                autocompleteErrorMessage: 'Key cannot be empty when Value is specified.',
            });
        } else {
            this.setState({
                autocompleteError: false,
                autocompleteErrorMessage: '',
            });
        }
    };

    onValueChange = value => {
        this.props.onValueChange(this.props.pair.id, value);
        this.setAutocompleteErrorMessage();
    };

    render() {
        const { id, key, value, operator } = this.props.pair;
        const { advanced } = this.props;
        const forKey = `key${id}`;
        const forValue = `value${id}`;
        const keyPlaceholder = `Enter a key${advanced ? ' or key name' : ''}`;
        const keyLabel = `Key${advanced ? ' or Key Name' : ''}`;
        const valuePlaceholder = 'Enter a value';
        const valueLabel = 'Value';

        return (
            <span data-test="key-value-pair">
                <Label value={keyLabel} labelFor={forKey} style={{ position: 'relative' }}>
                    <Autocomplete
                        className="key-search"
                        getCompletions={
                            advanced ? this.getKeysByReportSuiteId : this.getCompletions
                        }
                        value={key}
                        onChange={this.onKeyChange}>
                        <Textfield
                            className={styles.textField}
                            data-test="key-search-field"
                            id={forKey}
                            placeholder={keyPlaceholder}
                            invalid={this.state.autocompleteError}
                        />
                    </Autocomplete>
                    <InlineErrorMessage
                        className={styles.error}
                        isInvalid={this.state.autocompleteError}
                        errorMessage={this.state.autocompleteErrorMessage}
                        showIcon={false}
                    />
                </Label>
                <Select
                    className={classNames(styles.operator, 'operator')}
                    value={operator}
                    onChange={this.onSelectOperatorChange}
                    options={operatorOptions}
                />
                <Label value={valueLabel} labelFor={forValue} style={{ position: 'relative' }}>
                    <Textfield
                        className={classNames(styles.textField, 'value-search')}
                        data-test="value-search"
                        id={forValue}
                        value={value}
                        placeholder={valuePlaceholder}
                        onChange={this.onValueChange}
                        invalid={!isValueValid(this.props.pair)}
                    />
                    <InlineErrorMessage
                        className={styles.error}
                        isInvalid={!isValueValid(this.props.pair)}
                        errorMessage="It can only be numerical values when it's > or <."
                        showIcon={false}
                    />
                </Label>
            </span>
        );
    }
}

export default KeyValuePair;
