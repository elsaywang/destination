import React, { Component } from 'react';
import debounce from 'debounce-promise';
import Autocomplete from '@react/react-spectrum/Autocomplete';
import Select from '@react/react-spectrum/Select';
import Textfield from '@react/react-spectrum/Textfield';
import Label from './common/Label';
import operatorOptions from '../constants/operatorOptions';
import { keySuggestionsDebounceMs } from '../constants/lazyLoadConstants';
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

    state = this.getInitialAutocompleteError();

    getInitialAutocompleteError() {
        return {
            autocompleteError: false,
            autocompleteErrorMessage: '',
        };
    }

    getKeySuggestions = key => {
        return fetch(`/portal/api/v1/signals/keys?search=${encodeURIComponent(key)}&total=8`)
            .then(response => {
                if (response.ok) {
                    this.setAutocompleteErrorMessage();

                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(resp => {
                const { analyticsServiceAvailable, solrServiceAvailable, signalKeys } = resp;
                this.setAutocompleteErrorMessage({
                    analyticsServiceAvailable,
                    solrServiceAvailable,
                });
                return signalKeys;
            })
            .then(json => json.map(key => key.signalKey))
            .catch(error =>
                this.setAutocompleteErrorMessage({
                    error: {
                        autocompleteError: true,
                        autocompleteErrorMessage: error.message,
                    },
                }),
            );
    };

    getAnalyticsKeySuggestions = key => {
        const { reportSuiteId } = this.props;

        return fetch(
            `/portal/api/v1/signals/keys?search=${encodeURIComponent(
                key,
            )}&reportSuiteId=${encodeURIComponent(reportSuiteId)}&total=8`,
        )
            .then(response => {
                if (response.ok) {
                    this.setAutocompleteErrorMessage();

                    return response.json();
                }

                throw new Error(response.statusText);
            })
            .then(resp => {
                const { analyticsServiceAvailable, solrServiceAvailable, signalKeys } = resp;
                this.setAutocompleteErrorMessage({
                    analyticsServiceAvailable,
                    solrServiceAvailable,
                });
                return signalKeys;
            })
            .then(suites =>
                suites.map(suite => ({
                    label: suite.signalKeyName
                        ? `${suite.signalKey} (${suite.signalKeyName})`
                        : `${suite.signalKey}`,
                    id: suite.signalKey,
                })),
            )
            .catch(error =>
                this.setAutocompleteErrorMessage({
                    error: {
                        autocompleteError: true,
                        autocompleteErrorMessage: error.message,
                    },
                }),
            );
    };

    getCompletions = key =>
        this.props.advanced ? this.getAnalyticsKeySuggestions(key) : this.getKeySuggestions(key);

    getCompletionsDebounced = debounce(this.getCompletions, keySuggestionsDebounceMs);

    setAutocompleteErrorMessage = ({
        analyticsServiceAvailable = true,
        solrServiceAvailable = true,
        error = this.getInitialAutocompleteError(),
    } = {}) => {
        if (isKeyEmptyWithValue(this.props.pair)) {
            this.setState({
                ...error,
                autocompleteError: true,
                autocompleteErrorMessage: 'Key cannot be empty when value is specified.',
            });
        } else if (!analyticsServiceAvailable && this.props.advanced) {
            this.setState({
                ...error,
                autocompleteError: true,
                autocompleteErrorMessage:
                    'Key suggestions for Analytics variables are not available.',
            });
        } else if (!solrServiceAvailable) {
            this.setState({
                ...error,
                autocompleteError: true,
                autocompleteErrorMessage: 'Key suggestions are not available.',
            });
        } else {
            this.setState({
                ...error,
            });
        }
    };

    onValueChange = value => {
        this.props.onValueChange(this.props.pair.id, value);
        this.setAutocompleteErrorMessage();
    };

    render() {
        const { id, key, value, operator } = this.props.pair;
        const { advanced, errors, searched } = this.props;
        const forKey = `key${id}`;
        const forValue = `value${id}`;
        const keyPlaceholder = `Enter a key${advanced ? ' or key name' : ''}`;
        const keyLabel = `Key${advanced ? ' or Key Name' : ''}`;
        const valuePlaceholder = 'Enter a value';
        const valueLabel = 'Value';
        const isKeyInvalid =
            this.state.autocompleteError && !errors.searchForm.hasError && !searched;

        return (
            <span data-test="key-value-pair">
                <Label value={keyLabel} labelFor={forKey} style={{ position: 'relative' }}>
                    <Autocomplete
                        className="key-search"
                        getCompletions={this.getCompletionsDebounced}
                        value={key}
                        onChange={this.onKeyChange}>
                        <Textfield
                            className={styles.textField}
                            data-test="key-search-field"
                            id={forKey}
                            placeholder={keyPlaceholder}
                            invalid={isKeyInvalid}
                        />
                    </Autocomplete>
                    <InlineErrorMessage
                        className={styles.error}
                        isInvalid={isKeyInvalid}
                        errorMessage={this.state.autocompleteErrorMessage}
                        showIcon={false}
                    />
                </Label>
                <Select
                    className={classNames(styles.operator, 'operator')}
                    value={operator}
                    onChange={this.onSelectOperatorChange}
                    options={operatorOptions}
                    data-test="operator"
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
