import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import Select from '@react/react-spectrum/Select';

function SaveSearchSortingCriteria({
    selectOptions,
    radioGroupOptions,
    onDefaultSortingChange,
    handleRadioChange,
    radioCheckedValue,
    radioGroupStyle,
}) {
    return (
        <Fragment>
            <Select options={selectOptions} onChange={onDefaultSortingChange} />
            <div className={radioGroupStyle}>
                <RadioGroup>
                    {radioGroupOptions.map(({ label, value }) => (
                        <Radio
                            key={value}
                            {...{ label, value }}
                            checked={value === radioCheckedValue}
                            onChange={handleRadioChange}
                        />
                    ))}
                </RadioGroup>
            </div>
        </Fragment>
    );
}

SaveSearchSortingCriteria.propTypes = {
    selectOptions: PropTypes.array,
    radioGroupOptions: PropTypes.array,
    onDefaultSortingChange: PropTypes.func,
    handleRadioChange: PropTypes.func,
    radioCheckedValue: PropTypes.string,
    radioGroupStyle: PropTypes.string,
};

export default SaveSearchSortingCriteria;
