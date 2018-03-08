import React from 'react';
import { shallow } from 'enzyme';
import SearchFilters from '../SearchFilters';
import Search from '../../components/Search';

describe('<SearchFilters /> component', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<SearchFilters onSearch={mockFn} />);

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

        it('.onAddClick() adds another keyValuePair to state.keyValuePairs', () => {
            const keyValuePairs = wrapper.state().keyValuePairs;
            const expected = [
                ...keyValuePairs,
                {
                    id: keyValuePairs[keyValuePairs.length - 1].id + 1,
                    key: '',
                    operator: '=',
                    value: '',
                },
            ];

            wrapper.props().onAddClick();
            expect(wrapper.state('keyValuePairs')).toEqual(expected);
            expect(wrapper).toMatchSnapshot();
        });

        it('.removeKeyValuePair() removes a keyValuePair at a given id in given keyValuePairs[] and returns a new array without it', () => {
            const searchFilters = new SearchFilters();
            const id = 1;
            const keyValuePairs = [
                {
                    id: 0,
                    key: '',
                    operator: '=',
                    value: '',
                },
                {
                    id: 1,
                    key: '',
                    operator: '=',
                    value: '',
                },
            ];
            const newKeyValuePairs = searchFilters.removeKeyValuePair(id, keyValuePairs);
            const expected = [keyValuePairs[0]];

            expect(newKeyValuePairs).toEqual(expected);
        });

        it('.onAdvancedSearchChange() changes advanced state to given value', () => {
            expect(wrapper.state('advanced')).toBe(initialState.advanced);

            wrapper.props().onAdvancedSearchChange(true);
            expect(wrapper.state('advanced')).toBe(true);
        });

        // TODO: test click handler in child component(s) instead
        xit('.onKeyChange() changes key state to given value at corresponding id in keyValuePairs[]', () => {
            const value = 'test';
            const event = {
                target: {
                    id: 0,
                },
            };

            expect(wrapper.state('keyValuePairs')[event.target.id].key).toBe(
                initialState.keyValuePairs[event.target.id].key,
            );

            wrapper.props().onKeyChange(value, event);
            const newKeyValuePairs = [...initialState.keyValuePairs];

            newKeyValuePairs[event.target.id].key = value;

            expect(wrapper.state('keyValuePairs')[event.target.id].key).toBe(value);
        });

        // TODO: test click handler in child component(s) instead
        xit('.onValueChange() changes value state to given value at corresponding id in keyValuePairs[]', () => {
            const value = 'test value';
            const event = {
                target: {
                    id: 0,
                },
            };

            expect(wrapper.state('keyValuePairs')[event.target.id].value).toBe(
                initialState.keyValuePairs[event.target.id].value,
            );

            wrapper.props().onValueChange(value, event);
            expect(wrapper.state('keyValuePairs')[event.target.id].value).toBe(value);
        });

        it('.onOperatorChange() changes operator state to given value at given id in keyValuePairs[]', () => {
            const value = '>';
            const id = 0;

            expect(wrapper.state('keyValuePairs')[id].operator).toBe(
                initialState.keyValuePairs[id].operator,
            );

            wrapper.props().onOperatorChange(id, value);
            expect(wrapper.state('keyValuePairs')[id].operator).toBe(value);
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
