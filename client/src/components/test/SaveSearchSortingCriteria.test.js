import React from 'react';
import { shallow } from 'enzyme';
import SaveSearchSortingCriteria from '../SaveSearchSortingCriteria';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import Select from '@react/react-spectrum/Select';
import styles from '../SaveSearchExecution.css';
import { defaultSorting, radioGroupOptions, sortingOptions } from '../../utils/saveSearch';

describe('when CheckBox is checked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
        <SaveSearchSortingCriteria
            selectOptions={sortingOptions}
            radioGroupOptions={radioGroupOptions}
            onDefaultSortingChange={mockFn}
            handleRadioChange={mockFn}
            radioCheckedValue="descending"
            radioGroupStyle={styles.contentRadioGroup}
        />,
    );
    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('renders <Label/> with correct label/value and children of <Select/> and <RadioGroup/> including 2 <Radio/>', () => {
        expect(wrapper.find(Select)).toBeTruthy();
        expect(wrapper.find(RadioGroup).exists()).toBeTruthy();
        expect(wrapper.find(Radio).length).toBe(2);
    });

    it('renders <Select/> with correct option list', () => {
        expect(wrapper.find(Select).props().options.length).toBe(sortingOptions.length);
        expect(wrapper.find(Select).props().options).toBe(sortingOptions);
    });

    it(`renders <RadioGroup/> including 2 <Radio/> with correct label and value`, () => {
        radioGroupOptions.map(({ label, value }, index) => {
            expect(
                wrapper
                    .find(Radio)
                    .at(index)
                    .props().label,
            ).toEqual(label);
            expect(
                wrapper
                    .find(Radio)
                    .at(index)
                    .props().value,
            ).toEqual(value);
            expect(
                wrapper
                    .find(Radio)
                    .at(index)
                    .props().checked,
            ).toEqual(value === 'descending');
            expect(
                wrapper
                    .find(Radio)
                    .at(index)
                    .props().radioGroupStyle,
            ).toEqual(styles.radioGroupStyle);
        });
    });
});
