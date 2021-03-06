import React from 'react';
import { shallow } from 'enzyme';
import Search from '../Search';
import AdvancedSearch from '../AdvancedSearch';
import CustomDateRange from '../CustomDateRange';
import KeyValuePair from '../KeyValuePair';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import Switch from '@react/react-spectrum/Switch';
import signalStatuses from '../../constants/signalStatusOptions';
import { getDateRangeOptions } from '../../utils/dateRangeOptions';
import { isFormValid } from '../../utils/searchValidation';
import InlineErrorMessage from '../../components/common/InlineErrorMessage';

describe('<Search /> component', () => {
    const state = {
        name: '',
        keyValuePairs: [
            {
                id: 0,
                key: '',
                operator: '==',
                value: '',
            },
        ],
        signalStatus: 'ALL',
        advanced: false,
        source: {
            name: '',
            dataSourceIds: 0,
            reportSuiteIds: 0,
            sourceType: 'ALL',
        },
        viewRecordsFor: '7D',
        customStartDate: '04-24-2018',
        customEndDate: '05-01-2018',
        minEventFires: 1000,
        reportSuites: [],
        errors: {
            searchForm: {
                hasError: false,
                errorMessage: '',
            },
            savedSearch: {
                hasError: false,
                errorMessage: '',
            },
            reportSuites: {
                hasError: false,
                errorMessage: '',
            },
        },
        searched: false,
    };
    const mockFn = jest.fn();
    const wrapper = shallow(
        <Search
            {...state}
            onAdvancedSearchChange={mockFn}
            onKeySelect={mockFn}
            onValueChange={mockFn}
            onOperatorChange={mockFn}
            onAddClick={mockFn}
            onRemoveClick={mockFn}
            onSignalStatusChange={mockFn}
            onViewRecordsChange={mockFn}
            onCustomStartDateChange={mockFn}
            onCustomEndDateChange={mockFn}
            onMinEventFiresChange={mockFn}
            onReportSuiteChange={mockFn}
            onReportSuiteSelect={mockFn}
            onSearch={mockFn}
            onClearAll={mockFn}
            isCustomDateRangeEnabled={false}
            eventFiresMinimum={0}
            eventFiresStep={1000}
            maxSignalRetentionDays={30}
            disabled={false}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Switch />', () => {
            expect(wrapper.find(Switch).exists()).toBe(true);
        });

        it('does not render <AdvancedSearch /> when advanced is toggled off', () => {
            wrapper.setProps({ advanced: false });
            expect(wrapper.find(AdvancedSearch).exists()).toBe(false);
        });

        it('renders <AdvancedSearch /> when advanced is toggled on', () => {
            wrapper.setProps({ advanced: true });
            expect(wrapper.find(AdvancedSearch).exists()).toBe(true);
        });

        it('renders <InlineErrorMessage /> when there is an error retrieving report suites', () => {
            wrapper.setProps({
                errors: {
                    ...state.errors,
                    reportSuites: {
                        hasError: true,
                        errorMessage: 'Error!',
                    },
                },
            });

            expect(wrapper.find(InlineErrorMessage).exists()).toBe(true);
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
            expect(viewRecordsOptions).toMatchObject(getDateRangeOptions());
        });

        it('renders Minimum Counts input', () => {
            expect(wrapper.find('.min-counts').exists()).toBe(true);
        });

        it('renders <Button /> with label "Add" and not render <Button /> with label "Remove" when there is only one keyValuePair', () => {
            expect(wrapper.find(Button).someWhere(button => button.props().label === 'Add')).toBe(
                true,
            );
            expect(
                wrapper.find(Button).someWhere(button => button.props().label === 'Remove'),
            ).toBe(false);
        });

        it('should not render Add <Button /> when there are 3 keyValuePairs', () => {
            const newState = {
                ...state,
                keyValuePairs: [
                    {
                        id: 0,
                        key: '',
                        operator: '==',
                        value: '',
                    },
                    {
                        id: 1,
                        key: '',
                        operator: '==',
                        value: '',
                    },
                    {
                        id: 2,
                        key: '',
                        operator: '==',
                        value: '',
                    },
                ],
            };

            const newWrapper = shallow(<Search {...newState} />);

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

            const newWrapper = shallow(<Search {...newState} />);

            expect(
                newWrapper.find(Button).someWhere(button => button.props().label === 'Remove'),
            ).toBe(true);
        });

        it('does not render <CustomDateRange /> by default, when the `isCustomDateRangeEnabled` prop is false', () => {
            expect(wrapper.find(CustomDateRange).exists()).toBeFalsy();
        });

        it('renders <CustomDateRange /> when the `isCustomDateRangeEnabled` prop is true', () => {
            const newWrapper = shallow(
                <Search {...state} isCustomDateRangeEnabled={true} maxSignalRetentionDays={30} />,
            );

            expect(newWrapper.find(CustomDateRange).exists()).toBeTruthy();
        });

        it('renders <Button /> with label "Search"', () => {
            expect(
                wrapper.find(Button).someWhere(button => button.props().label === 'Search'),
            ).toBe(true);
        });

        it('renders <Button /> with label "Search" as disabled when form is invalid', () => {
            const newState = {
                ...state,
                keyValuePairs: [
                    {
                        id: 0,
                        key: 'new',
                        operator: '==',
                        value: 'abc',
                    },
                ],
            };

            const newWrapper = shallow(<Search {...newState} />);

            expect(newWrapper.find('[data-test="search-button"]').is('[disabled]')).toBe(true);
        });
        it('renders <Button /> with label "Search" as disabled when disabled props is true', () => {
            wrapper.setProps({ disabled: true });

            expect(wrapper.find('[data-test="search-button"]').is('[disabled]')).toBe(true);
        });
        it('renders <Button /> with label "Clear All"', () => {
            expect(
                wrapper.find(Button).someWhere(button => button.props().label === 'Clear All'),
            ).toBe(true);
        });

        it('should render <InlineErrorMessage /> when there is an error', () => {
            wrapper.setProps({
                errors: {
                    ...state.errors,
                    searchForm: {
                        hasError: true,
                        errorMessage: 'Error!',
                    },
                },
            });

            expect(wrapper.find(InlineErrorMessage).exists()).toBe(true);
        });
    });
});
