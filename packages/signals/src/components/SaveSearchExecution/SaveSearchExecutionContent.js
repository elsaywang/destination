import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import Textfield from '@react/react-spectrum/Textfield';
import Checkbox from '@react/react-spectrum/Checkbox';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import Select from '@react/react-spectrum/Select';
import styles from './SaveSearchExecution.css';
import {
    textFieldLabelName,
    textFieldPlaceHolder,
    saveSearch,
    checkBoxLabel,
    defaultSorting,
} from './saveSearchExecutionMessages.js';
import {
    descending,
    sortingOptions,
    radioGroupOptions,
    defaultSortingKey,
} from '../../constants/sortOptions';

class SaveSearchExecutionContent extends Component {
    state = {
        isTrackInDashboardChecked: false,
    };

    toggleCheckbox = isTrackInDashboardChecked => {
        this.setState({ isTrackInDashboardChecked });
        this.props.onTrackResultInDashboardChange(isTrackInDashboardChecked);
    };

    handleRadioChange = value => {
        this.props.onSortingOrderChange(value === descending);
    };

    render() {
        return (
            <div data-test="save-this-search-dialog-content">
                <FieldLabel label={textFieldLabelName} labelFor={saveSearch}>
                    <Textfield
                        data-test="save-this-search-name-field"
                        className={styles.contentTextField}
                        placeholder={textFieldPlaceHolder}
                        onChange={this.props.onSaveSearchNameChange}
                        required
                        quiet
                    />
                </FieldLabel>
                <div className={styles.contentCheckBox}>
                    <Checkbox
                        data-test="save-this-search-checkbox"
                        label={checkBoxLabel}
                        onChange={this.toggleCheckbox}
                        checked={this.state.isTrackInDashboardChecked}
                    />
                </div>
                <FieldLabel label={defaultSorting} labelFor={defaultSorting}>
                    <Select
                        data-test="save-this-search-sort-column"
                        options={sortingOptions}
                        onChange={this.props.onDefaultSortingChange}
                        defaultValue={defaultSortingKey}
                    />
                    <div className={styles.contentRadioGroup}>
                        <RadioGroup data-test="save-this-search-sort-direction">
                            {radioGroupOptions.map(({ label, value }) => (
                                <Radio
                                    key={value}
                                    {...{ label, value }}
                                    checked={value === descending}
                                    onChange={this.handleRadioChange}
                                    data-test={`save-this-search-sort-${value}`}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                </FieldLabel>
            </div>
        );
    }
}

SaveSearchExecutionContent.propTypes = {
    onSaveSearchNameChange: PropTypes.func,
    onTrackResultInDashboardChange: PropTypes.func,
    onDefaultSortingChange: PropTypes.func,
    onSortingOrderChange: PropTypes.func,
};
export default SaveSearchExecutionContent;
