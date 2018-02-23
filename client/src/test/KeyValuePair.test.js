import React from 'react';
import { shallow } from 'enzyme';
import operators from '../constants/operatorOptions';
import KeyValuePair from '../components/KeyValuePair';
import Select from '@react/react-spectrum/Select';
import Search from '@react/react-spectrum/Search';

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
            onKeyChange={mockFn}
            onOperatorChange={mockFn}
            onValueChange={mockFn}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Search /> for key / key name search', () => {
            expect(
                wrapper
                    .find(Search)
                    .filter('.key-search')
                    .exists(),
            ).toBe(true);
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
