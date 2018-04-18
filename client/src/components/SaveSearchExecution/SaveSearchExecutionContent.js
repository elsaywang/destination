import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Label from '../../components/common/Label';
import Textfield from '@react/react-spectrum/Textfield';
import Checkbox from '@react/react-spectrum/Checkbox';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import Select from '@react/react-spectrum/Select';
import styles from './SaveSearchExecution.css';
import {
    textFieldLabelName,
    textFieldPlaceHolder,
    saveThisSearch,
    checkBoxLabel,
    defaultSorting,
} from './saveSearchExecutionMessages.js';
import { descending, sortingOptions, radioGroupOptions } from '../../constants/sortOptions';

class SaveSearchExecutionContent extends Component {
    state = {
        isTrackInDashboardChecked: false,
    };

    toggleCheckbox = isChecked => {
        this.setState(prevState => ({
            isTrackInDashboardChecked: !prevState.isTrackInDashboardChecked,
        }));
        this.props.onTrackResultInDashboardChange(!isChecked);
    };

    handleRadioChange = value => {
        this.props.onSortingOrderChange(value === descending);
    };

    render() {
        return (
            <Fragment>
                <Label value={textFieldLabelName} labelFor={saveThisSearch}>
                    <Textfield
                        className={styles.contentTextField}
                        placeholder={textFieldPlaceHolder}
                        onChange={this.props.onSaveSearchNameChange}
                        quiet
                    />
                </Label>
                <div className={styles.contentCheckBox}>
                    <Checkbox
                        label={checkBoxLabel}
                        onChange={this.toggleCheckbox}
                        checked={this.state.isTrackInDashboardChecked}
                    />
                </div>
                {this.state.isTrackInDashboardChecked && (
                    <Label value={defaultSorting} labelFor={defaultSorting}>
                        <Fragment>
                            <Select
                                options={sortingOptions}
                                onChange={this.props.onDefaultSortingChange}
                            />
                            <div className={styles.contentRadioGroup}>
                                <RadioGroup>
                                    {radioGroupOptions.map(({ label, value }) => (
                                        <Radio
                                            key={value}
                                            {...{ label, value }}
                                            checked={value === descending}
                                            onChange={this.handleRadioChange}
                                        />
                                    ))}
                                </RadioGroup>
                            </div>
                        </Fragment>
                    </Label>
                )}
            </Fragment>
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
