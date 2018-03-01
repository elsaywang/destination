import React from 'react';
import { shallow } from 'enzyme';
import SearchFilters from '../containers/SearchFilters';
import Search from '../components/Search';

describe('<SearchFilters /> component', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<SearchFilters onSearch={mockFn} path="test" />);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Search /> component', () => {
            expect(wrapper.find(Search).exists()).toBe(true);
        });
    });

    describe('state changes based on events', () => {
        const initialState = {
            keyValuePairs: [
                {
                    id: 0,
                    key: '',
                    operator: '=',
                    value: '',
                },
            ],
            status: 'all',
            advanced: false,
            viewRecordsFor: 7,
            minCount: 1000,
        };

        it('.onAdvancedSearchChange() changes advanced state to given value', () => {
            expect(wrapper.state('advanced')).toBe(initialState.advanced);

            wrapper.props().onAdvancedSearchChange(true);
            expect(wrapper.state('advanced')).toBe(true);
        });

        it('.onKeyChange() changes key state to given value at given id in keyValuePairs[]', () => {
            const value = 'test';
            const event = {
                target: {
                    id: 0,
                },
            };

            expect(wrapper.state('keyValuePairs')[0].key).toBe(initialState.keyValuePairs[0].key);

            wrapper.props().onKeyChange(value, event);
            const newKeyValuePairs = [...initialState.keyValuePairs];

            newKeyValuePairs[event.target.id].key = value;

            expect(wrapper.state('keyValuePairs')[0].key).toBe(value);
        });

        it('.onValueChange() changes value state to given value at given id in keyValuePairs[]', () => {
            const value = 'test value';
            const event = {
                target: {
                    id: 0,
                },
            };

            expect(wrapper.state('keyValuePairs')[0].value).toBe(
                initialState.keyValuePairs[0].value,
            );

            wrapper.props().onValueChange(value, event);
            const newKeyValuePairs = [...initialState.keyValuePairs];

            newKeyValuePairs[event.target.id].value = value;

            expect(wrapper.state('keyValuePairs')[0].value).toBe(value);
        });

        it('.onOperatorChange() changes operator state to given value at given id in keyValuePairs[]', () => {
            const value = '>';
            const id = 0;

            expect(wrapper.state('keyValuePairs')[0].operator).toBe(
                initialState.keyValuePairs[0].operator,
            );

            wrapper.props().onOperatorChange(id, value);
            const newKeyValuePairs = [...initialState.keyValuePairs];

            newKeyValuePairs[id].operator = value;

            expect(wrapper.state('keyValuePairs')[0].operator).toBe(value);
        });

        it('.onStatusChange() changes status state to given value', () => {
            expect(wrapper.state('status')).toBe(initialState.status);

            wrapper.props().onStatusChange('unused');
            expect(wrapper.state('status')).toBe('unused');
        });

        it('.onViewRecordsChange() changes viewRecordsFor state to given value', () => {
            expect(wrapper.state('viewRecordsFor')).toBe(initialState.viewRecordsFor);

            wrapper.props().onViewRecordsChange(14);
            expect(wrapper.state('viewRecordsFor')).toBe(14);
        });

        it('.onMinCountChange() changes minCount state to given value', () => {
            expect(wrapper.state('minCount')).toBe(initialState.minCount);

            wrapper.props().onMinCountChange(10000);
            expect(wrapper.state('minCount')).toBe(10000);
        });

        xit('.onSearch() is called', () => {
            wrapper.props().onSearch(initialState);
            expect(wrapper.props().onSearch()).toHaveBeenCalled();
        });

        it('.onAddClick() adds another keyValuePair to state.keyValuePairs', () => {
            expect(wrapper.state('keyValuePairs')).toEqual(initialState.keyValuePairs);

            const expected = [
                ...initialState.keyValuePairs,
                {
                    id: initialState.keyValuePairs.length,
                    key: '',
                    operator: '=',
                    value: '',
                },
            ];

            wrapper.props().onAddClick();
            expect(wrapper.state('keyValuePairs')).toEqual(expected);
        });

        it('.onClearAll() to reset state back to initial state', () => {
            wrapper.props().onClearAll();
            expect(wrapper.state()).toEqual({
                keyValuePairs: [
                    {
                        id: 0,
                        key: '',
                        operator: '=',
                        value: '',
                    },
                ],
                status: 'all',
                advanced: false,
                viewRecordsFor: 7,
                minCount: 1000,
            });
        });
    });
});
