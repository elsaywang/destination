import React from 'react';
import { shallow } from 'enzyme';
import SaveSearchExecutionContent from '../SaveSearchExecutionContent';
import SaveSearchSortingCriteria from '../SaveSearchSortingCriteria';
import Label from '../../components/common/Label';
import Textfield from '@react/react-spectrum/Textfield';
import Checkbox from '@react/react-spectrum/Checkbox';
import Select from '@react/react-spectrum/Select';
import styles from '../SaveSearchExecution.css';
import {
    textFieldLabelName,
    textFieldPlaceHolder,
    saveThisSearch,
    checkBoxLabel,
    defaultSorting,
    radioGroupOptions,
    sortingOptions,
} from '../../utils/saveSearch';

describe('<SaveSearchExecutionContent /> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const wrapper = shallow(
            <SaveSearchExecutionContent
                onSaveSearchNameChange={mockFn}
                onTrackResultInDashBoardChange={mockFn}
                onDefaultSortingChange={mockFn}
                onSortingOrderChange={mockFn}
            />,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it(`renders <Label/> with correct label and value and it's child <Textfield> with correct placeholder name`, () => {
            expect(wrapper.find(Label).exists()).toBeTruthy();
            expect(wrapper.find(Label).props().value).toEqual(textFieldLabelName);
            expect(wrapper.find(Label).props().labelFor).toEqual(saveThisSearch);
            expect(
                wrapper
                    .find(Label)
                    .children()
                    .find(Textfield),
            ).toBeTruthy();
            expect(
                wrapper
                    .find(Label)
                    .children()
                    .find(Textfield)
                    .props().placeholder,
            ).toEqual(textFieldPlaceHolder);
        });
        it(`renders <Checkbox/> with correct label and default is unchecked`, () => {
            wrapper.setState({ isBoxChecked: false });
            expect(wrapper.find(Checkbox).exists()).toBeTruthy();
            expect(wrapper.find(Checkbox).props().label).toEqual(checkBoxLabel);
            expect(wrapper.find(Checkbox).props().checked).toBeFalsy();
        });

        describe('when CheckBox is checked', () => {
            beforeAll(() => {
                wrapper.instance().toggleCheckbox();
            });

            it('renders a new <Label/> with correct label/value and children of <SaveSearchSortingCriteria/>', () => {
                expect(wrapper.state('isBoxChecked')).toBeTruthy();
                const updatedWrapper = shallow(<div>{wrapper.instance().executionForm()}</div>);
                expect(updatedWrapper.find(Label).at(1).exists).toBeTruthy();
                expect(
                    updatedWrapper
                        .find(Label)
                        .at(1)
                        .props().labelFor,
                ).toEqual(defaultSorting);
                expect(
                    updatedWrapper
                        .find(Label)
                        .children()
                        .find(SaveSearchSortingCriteria),
                ).toBeTruthy();
            });

            it('<SaveSearchSortingCriteria/> has correct props pass down', () => {
                const updatedWrapper = shallow(<div>{wrapper.instance().executionForm()}</div>);
                const childWrapper = updatedWrapper
                    .find(Label)
                    .children()
                    .find(SaveSearchSortingCriteria);
                expect(childWrapper.find(SaveSearchSortingCriteria).props().selectOptions).toEqual(
                    sortingOptions,
                );
                expect(
                    childWrapper.find(SaveSearchSortingCriteria).props().radioGroupOptions,
                ).toEqual(radioGroupOptions);
                expect(
                    childWrapper.find(SaveSearchSortingCriteria).props().radioCheckedValue,
                ).toEqual('descending');
                expect(
                    childWrapper.find(SaveSearchSortingCriteria).props().radioGroupStyle,
                ).toEqual(styles.radioGroupStyle);
            });
        });
    });
});
