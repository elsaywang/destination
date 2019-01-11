import React from 'react';
import { shallow } from 'enzyme';
import operators from '../../constants/operatorOptions';
import KeyValuePair from '../KeyValuePair';
import Autocomplete from '@react/react-spectrum/Autocomplete';
import Select from '@react/react-spectrum/Select';
import Textfield from '@react/react-spectrum/Textfield';
import InlineErrorMessage from '../common/InlineErrorMessage';

describe('<KeyValuePair /> component', () => {
    const mockFn = jest.fn();
    const pair = {
        id: 0,
        key: '',
        operator: '==',
        value: '',
    };
    const advanced = false;
    const wrapper = shallow(
        <KeyValuePair
            enabled={advanced}
            pair={pair}
            onKeyChange={mockFn}
            onOperatorChange={mockFn}
            onValueChange={mockFn}
            reportSuiteId="test"
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Autocomplete /> and <Textfield /> child for key / key name search', () => {
            const autocomplete = wrapper.find(Autocomplete);

            expect(autocomplete.filter('.key-search').exists()).toBe(true);
            expect(autocomplete.find(Textfield).exists()).toBe(true);
        });

        it('renders <Select /> with operator options', () => {
            const operatorSelect = wrapper.find(Select).filter('.operator');
            const operatorOptions = operatorSelect.props().options;

            expect(operatorSelect.exists()).toBe(true);
            expect(operatorOptions).toMatchObject(operators);
        });

        it('renders <Textfield /> for value search', () => {
            expect(
                wrapper
                    .find(Textfield)
                    .filter('[data-test="value-search"]')
                    .exists(),
            ).toBe(true);
        });

        it('renders <Textfield /> as invalid if value is invalid and show error message', () => {
            const newPair = {
                key: '',
                operator: '>',
                value: 'a',
            };

            wrapper.setProps({
                pair: newPair,
            });

            expect(
                wrapper
                    .find(Textfield)
                    .filter('[data-test="value-search"]')
                    .props().invalid,
            ).toBe(true);
            expect(wrapper.find(InlineErrorMessage).exists()).toBe(true);
        });
    });

    describe('getCompletions', () => {
        const instance = wrapper.instance();

        describe('when advanced search is not enabled', () => {
            it('should get regular key suggestions', () => {
                const spy = jest.spyOn(instance, 'getKeySuggestions').mockImplementation(() => {});

                instance.getCompletions();

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('when advanced search is enabled', () => {
            beforeEach(() => {
                wrapper.setProps({ advanced: true });
            });

            afterEach(() => {
                wrapper.setProps({ advanced: false });
            });

            it('should get key suggestions for Analytics dimensions', () => {
                const spy = jest
                    .spyOn(instance, 'getAnalyticsKeySuggestions')
                    .mockImplementation(() => {});

                instance.getCompletions();

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
