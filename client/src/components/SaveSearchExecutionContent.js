import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Label from '../components/common/Label';
import Textfield from '@react/react-spectrum/Textfield';
import Checkbox from '@react/react-spectrum/Checkbox';
import SaveSearchSortingCriteria from './SaveSearchSortingCriteria';
import styles from './SaveSearchExecution.css';
import {
    textFieldLabelName,
    textFieldPlaceHolder,
    saveThisSearch,
    checkBoxLabel,
    defaultSorting,
    radioGroupOptions,
    sortingOptions,
} from '../utils/saveSearch';

class SaveSearchExecutionContent extends Component {
    constructor() {
        super();
        this.state = {
            isBoxChecked: false,
        };
    }

    toggleCheckbox = () => {
        this.setState({ isBoxChecked: !this.state.isBoxChecked });
        this.props.onTrackResultInDashBoardChange(!this.state.isBoxChecked);
    };

    handleRadioChange = value => {
        this.props.onSortingOrderChange(value === 'descending');
    };

    executionForm = () => {
        return (
            <Fragment>
                <Label value={textFieldLabelName} labelFor={saveThisSearch}>
                    <Textfield
                        style={{ minWidth: 230 }}
                        placeholder={textFieldPlaceHolder}
                        onChange={this.props.onSaveSearchNameChange}
                        quiet
                    />
                </Label>
                <div className={styles.contentCheckBox}>
                    <Checkbox
                        label={checkBoxLabel}
                        onChange={this.toggleCheckbox}
                        checked={this.state.isBoxChecked}
                    />
                </div>
                {this.state.isBoxChecked && (
                    <Label value={defaultSorting} labelFor={defaultSorting}>
                        <SaveSearchSortingCriteria
                            selectOptions={sortingOptions}
                            radioGroupOptions={radioGroupOptions}
                            onDefaultSortingChange={this.props.onDefaultSortingChange}
                            handleRadioChange={this.handleRadioChange}
                            radioCheckedValue="descending"
                            radioGroupStyle={styles.contentRadioGroup}
                        />
                    </Label>
                )}
            </Fragment>
        );
    };
    render() {
        return this.executionForm();
    }
}

SaveSearchExecutionContent.propTypes = {
    onSaveSearchNameChange: PropTypes.func,
    onTrackResultInDashBoardChange: PropTypes.func,
    onDefaultSortingChange: PropTypes.func,
    onSortingOrderChange: PropTypes.func,
};
export default SaveSearchExecutionContent;
