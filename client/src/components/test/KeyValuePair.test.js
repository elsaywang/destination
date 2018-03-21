import React from 'react';
import { shallow } from 'enzyme';
import operators from '../../constants/operatorOptions';
import KeyValuePair from '../KeyValuePair';
import Autocomplete from '@react/react-spectrum/Autocomplete';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';
import Textfield from '@react/react-spectrum/Textfield';

describe('<KeyValuePair /> component', () => {
    const mockFn = jest.fn();
    const pair = {
        id: 0,
        key: '',
        operator: '=',
        value: '',
    };
    const wrapper = shallow(
        <KeyValuePair
            pair={pair}
            onKeySelect={mockFn}
            onOperatorChange={mockFn}
            onValueChange={mockFn}
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

        it('renders <Search /> for value search', () => {
            expect(
                wrapper
                    .find(Search)
                    .filter('.value-search')
                    .exists(),
            ).toBe(true);
        });
    });
});
