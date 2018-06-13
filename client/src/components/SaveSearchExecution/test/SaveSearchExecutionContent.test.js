import React from 'react';
import { shallow } from 'enzyme';
import SaveSearchExecutionContent from '../SaveSearchExecutionContent';
import Label from '../../../components/common/Label';
import Textfield from '@react/react-spectrum/Textfield';
import Checkbox from '@react/react-spectrum/Checkbox';
import Select from '@react/react-spectrum/Select';
import RadioGroup from '@react/react-spectrum/RadioGroup';
import Radio from '@react/react-spectrum/Radio';
import { descending, sortingOptions, radioGroupOptions } from '../../../constants/sortOptions';
import {
    textFieldLabelName,
    textFieldPlaceHolder,
    saveSearch,
    checkBoxLabel,
    defaultSorting,
} from '../saveSearchExecutionMessages';

describe('<SaveSearchExecutionContent /> component', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
        <SaveSearchExecutionContent
            onSaveSearchNameChange={mockFn}
            onTrackResultInDashboardChange={mockFn}
            onDefaultSortingChange={mockFn}
            onSortingOrderChange={mockFn}
        />,
    );
    describe('rendering when Checkbox is unchecked', () => {
        beforeAll(() => {
            wrapper.instance().toggleCheckbox(false);
        });

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it(`renders <Label/> with correct label and value and it's child <Textfield> with correct placeholder name`, () => {
            expect(wrapper.find(Label).exists()).toBeTruthy();
            expect(
                wrapper
                    .find(Label)
                    .children()
                    .find(Textfield),
            ).toBeTruthy();
        });
        it(`renders <Checkbox/> with correct label and default is unchecked`, () => {
            expect(wrapper.state('isTrackInDashboardChecked')).toBeFalsy();
            expect(wrapper.find(Checkbox).exists()).toBeTruthy();
        });

        it('renders <Label/> children of <Select/> and <RadioGroup/> including 2 <Radio/>', () => {
            expect(wrapper.find(Select)).toBeTruthy();
            expect(wrapper.find(RadioGroup).exists()).toBeTruthy();
            expect(wrapper.find(Radio).length).toBe(2);
        });
    });

    describe('when Checkbox is checked', () => {
        beforeAll(() => {
            wrapper.instance().toggleCheckbox(true);
        });
        it('state.isTrackInDashboardChecked is updated to true ', () => {
            expect(wrapper.state('isTrackInDashboardChecked')).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Label/> children of <Select/> and <RadioGroup/> including 2 <Radio/>', () => {
            wrapper.setState({ isTrackInDashboardChecked: true });
            expect(wrapper.find(Select)).toBeTruthy();
            expect(wrapper.find(RadioGroup).exists()).toBeTruthy();
            expect(wrapper.find(Radio).length).toBe(2);
        });
    });
});
