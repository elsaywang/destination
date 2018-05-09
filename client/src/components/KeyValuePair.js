import React, { Component } from 'react';
import Autocomplete from '@react/react-spectrum/Autocomplete';
import Select from '@react/react-spectrum/Select';
import Textfield from '@react/react-spectrum/Textfield';
import Label from './common/Label';
import operatorOptions from '../constants/operatorOptions';
import styles from './KeyValuePair.css';
import classNames from 'classnames';
import { isValueValid } from '../utils/searchValidation';

class KeyValuePair extends Component {
    constructor(props) {
        super(props);

        this.onSelectOperatorChange = this.props.onOperatorChange.bind(this, this.props.pair.id);
        this.onKeyChange = this.props.onKeyChange.bind(this, this.props.pair.id);
        this.onValueChange = this.props.onValueChange.bind(this, this.props.pair.id);
    }

    getCompletions = key => {
        return fetch(`/api/signals/keys?search=${key}`).then(response => response.json());
    };

    getKeysByReportSuiteId = () => {
        const { reportSuiteId } = this.props;

        return fetch(`/api/v1/report-suites/${reportSuiteId}/keys`)
            .then(response => response.json())
            .then(suites => suites.keys.map(suite => suite.name));
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
                <Label value={keyLabel} labelFor={forKey}>
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
                        />
                    </Autocomplete>
                </Label>
                <Select
                    className={classNames(styles.operator, 'operator')}
                    value={operator}
                    onChange={this.onSelectOperatorChange}
                    options={operatorOptions}
                />
                <Label value={valueLabel} labelFor={forValue}>
                    <Textfield
                        className={classNames(styles.textField, 'value-search')}
                        data-test="value-search"
                        id={forValue}
                        value={value}
                        placeholder={valuePlaceholder}
                        onChange={this.onValueChange}
                        invalid={!isValueValid(this.props.pair)}
                    />
                </Label>
            </span>
        );
    }
}

export default KeyValuePair;
