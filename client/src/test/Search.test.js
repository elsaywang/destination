import React from 'react';
import { shallow } from 'enzyme';
import Search from '../components/Search';
import AdvancedSearch from '../components/AdvancedSearch';
import KeyValuePair from '../components/KeyValuePair';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import signalStatuses from '../constants/signalStatusOptions';
import dateRangeOptions from '../constants/dateRangeOptions';

describe('<Search /> component', () => {
    const state = {
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
    const mockFn = jest.fn();
    const wrapper = shallow(
        <Search
            {...state}
            onAdvancedSearchChange={mockFn}
            onKeyChange={mockFn}
            onValueChange={mockFn}
            onOperatorChange={mockFn}
            onAddClick={mockFn}
            onRemoveClick={mockFn}
            onStatusChange={mockFn}
            onViewRecordsChange={mockFn}
            onMinCountChange={mockFn}
            onSearch={mockFn}
            onClearAll={mockFn}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <AdvancedSearch />', () => {
            expect(wrapper.find(AdvancedSearch).exists()).toBe(true);
        });

        it('renders <KeyValuePair /> according to number of keyValuePairs in the state', () => {
            expect(wrapper.find(KeyValuePair).length).toBe(state.keyValuePairs.length);
        });

        it('renders Signal Status <Select /> with signal status options', () => {
            const signalStatusSelect = wrapper.find(Select).filter('.signal-status');
            const signalStatusOptions = signalStatusSelect.props().options;

            expect(signalStatusSelect.exists()).toBe(true);
            expect(signalStatusOptions).toMatchObject(signalStatuses);
        });

        it('renders View Records <Select /> with date range options', () => {
            const viewRecordsSelect = wrapper.find(Select).filter('.view-records');
            const viewRecordsOptions = viewRecordsSelect.props().options;

            expect(viewRecordsSelect.exists()).toBe(true);
            expect(viewRecordsOptions).toMatchObject(dateRangeOptions);
        });

        it('renders Minimum Counts input', () => {
            // TODO: change this to check for specific input when we receive updated mocks
            expect(wrapper.find('.min-counts').exists()).toBe(true);
        });

        it('renders <Button /> with label "Add"', () => {
            expect(wrapper.find(Button).someWhere(button => button.props().label === 'Add')).toBe(
                true,
            );
        });

        it('should not render Add <Button /> when there are 3 keyValuePairs', () => {
            const newState = {
                ...state,
                keyValuePairs: [
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
                    {
                        id: 2,
                        key: '',
                        operator: '=',
                        value: '',
                    },
                ],
            };

            const newWrapper = shallow(
                <Search
                    {...newState}
                    onAdvancedSearchChange={mockFn}
                    onKeyChange={mockFn}
                    onValueChange={mockFn}
                    onOperatorChange={mockFn}
                    onAddClick={mockFn}
                    onRemoveClick={mockFn}
                    onStatusChange={mockFn}
                    onViewRecordsChange={mockFn}
                    onMinCountChange={mockFn}
                    onSearch={mockFn}
                    onClearAll={mockFn}
                />,
            );

            expect(
                newWrapper.find(Button).someWhere(button => button.props().label === 'Add'),
            ).toBe(false);
        });

        it('renders <Button /> with label "Remove" when there is more than one keyValuePair passed in', () => {
            expect(
                wrapper.find(Button).someWhere(button => button.props().label === 'Remove'),
            ).toBe(false);

            const newState = {
                ...state,
                keyValuePairs: [
                    ...state.keyValuePairs,
                    {
                        id: 1,
                        key: 'new',
                        operator: '>',
                        value: 'new',
                    },
                ],
            };

            const newWrapper = shallow(
                <Search
                    {...newState}
                    onAdvancedSearchChange={mockFn}
                    onKeyChange={mockFn}
                    onValueChange={mockFn}
                    onOperatorChange={mockFn}
                    onAddClick={mockFn}
                    onRemoveClick={mockFn}
                    onStatusChange={mockFn}
                    onViewRecordsChange={mockFn}
                    onMinCountChange={mockFn}
                    onSearch={mockFn}
                    onClearAll={mockFn}
                />,
            );

            expect(
                newWrapper.find(Button).someWhere(button => button.props().label === 'Remove'),
            ).toBe(true);
        });

        it('renders <Button /> with label "Search"', () => {
            expect(
                wrapper.find(Button).someWhere(button => button.props().label === 'Search'),
            ).toBe(true);
        });

        it('renders <Button /> with label "Clear All"', () => {
            expect(
                wrapper.find(Button).someWhere(button => button.props().label === 'Clear All'),
            ).toBe(true);
        });
    });
});
