import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import SearchContainer from '../SearchContainer';
import Search from '../../components/Search';
import SignalTypeFilter from '../../components/SignalTypeFilter';
import SignalsTable from '../../components/SignalsTable';
import SavedSearch from '../../containers/SavedSearch';
import Empty from '../../components/common/Empty';
import Explore from '../../images/explore.svg';
import NoResult from '../../images/noResult.svg';
import SaveSearchExecution from '../../components/SaveSearchExecution';
import configureStore from '../../configureStore';

describe('<SearchContainer /> component', () => {
    const store = configureStore();
    const wrapper = shallow(
        <Provider store={store}>
            <SearchContainer />
        </Provider>,
    )
        .dive({ context: { store } })
        .dive();

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Search /> component', () => {
            expect(wrapper.find(Search).exists()).toBe(true);
        });

        it('renders <SavedSearch /> component', () => {
            expect(wrapper.find(SavedSearch).exists()).toBe(true);
        });

        it('renders <Empty/> component with Explore image', () => {
            expect(wrapper.find(Empty).exists()).toBe(true);
            expect(wrapper.find('img').props().src).toEqual(Explore);
        });

        it('does not render <SignalSourceFilter /> component when there are no props.results passed in', () => {
            wrapper.setProps({
                results: {
                    list: [],
                },
            });
            expect(wrapper.find(SignalTypeFilter).exists()).toBe(false);
        });

        it('does not render <SignalsTable /> component when there are no props.results passed in', () => {
            wrapper.setProps({
                results: {
                    list: [],
                },
            });
            expect(wrapper.find(SignalsTable).exists()).toBe(false);
        });

        it('does not render <SaveSearchExecution /> component when there are no props.results passed in', () => {
            wrapper.setProps({
                results: {
                    list: [],
                },
            });
            expect(wrapper.find(SaveSearchExecution).exists()).toBe(false);
        });

        describe('when table results are passed in as a prop', () => {
            beforeAll(() => {
                wrapper.setProps({
                    results: {
                        list: [
                            {
                                id: 0,
                                name: 'test',
                            },
                        ],
                    },
                });
            });

            it('renders <SignalSourceFilter /> component', () => {
                expect(wrapper.find(SignalTypeFilter).exists()).toBe(true);
            });

            it('renders <SignalsTable /> component', () => {
                expect(wrapper.find(SignalsTable).exists()).toBe(true);
            });

            it('renders <SavedSearch /> component', () => {
                expect(wrapper.find(SavedSearch).exists()).toBe(true);
            });

            it('renders <SaveSearchExecution /> component', () => {
                expect(wrapper.find(SaveSearchExecution).exists()).toBe(true);
            });

            it('does not render <Empty/> component', () => {
                expect(wrapper.find(Empty).exists()).toBe(false);
            });
        });

        describe('when table results are passed in as a prop without any search result returned ', () => {
            beforeAll(() => {
                wrapper.setProps({
                    results: {
                        list: [],
                    },
                });
                wrapper.setState({ searched: true });
            });
            it('renders <Empty/> component with NoResult Image', () => {
                expect(wrapper.find(Empty).exists()).toBe(true);
                expect(wrapper.find('img').props().src).toEqual(NoResult);
            });
        });
    });

    describe('state changes based on events', () => {
        const initialState = {
            name: '',
            searched: false,
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
                sourceType: null,
                dataSourceIds: [],
                reportSuiteIds: [],
            },
            viewRecordsFor: 7,
            minEventFires: 1000,
            counts: {
                ALL: 72093,
                ANALYTICS: 34300,
                ALF: 359,
                REALTIME: 27,
                ONBOARDED: 37407,
            },
        };

        it('.onAddClick() adds another keyValuePair to state.keyValuePairs', () => {
            const keyValuePairs = wrapper.state().keyValuePairs;
            const expected = [
                ...keyValuePairs,
                {
                    id: keyValuePairs[keyValuePairs.length - 1].id + 1,
                    key: '',
                    operator: '==',
                    value: '',
                },
            ];

            wrapper.instance().onAddClick();
            expect(wrapper.state('keyValuePairs')).toEqual(expected);
            expect(wrapper).toMatchSnapshot();
        });

        it('.onRemoveClick() adds another keyValuePair to state.keyValuePairs', () => {
            const id = 1;
            const keyValuePairs = wrapper.state().keyValuePairs;
            const expected = [keyValuePairs[0]];

            wrapper.instance().onRemoveClick(id);
            expect(wrapper.state('keyValuePairs')).toEqual(expected);
            expect(wrapper).toMatchSnapshot();
        });

        it('.onAdvancedSearchChange() changes advanced state to given value and clears filter', () => {
            expect(wrapper.state('advanced')).toBe(initialState.advanced);

            wrapper.instance().onAdvancedSearchChange(true);
            expect(wrapper.state('advanced')).toBe(true);
            expect(wrapper.state('source').name).toBe('');
        });

        it('.onKeyChange() changes key state to given value at corresponding id in keyValuePairs[]', () => {
            const value = 'test';
            const id = 0;

            expect(wrapper.state('keyValuePairs')[id].key).toBe(initialState.keyValuePairs[id].key);

            wrapper.instance().onKeyChange(id, value);
            const newKeyValuePairs = [...initialState.keyValuePairs];

            newKeyValuePairs[id].key = value;

            expect(wrapper.state('keyValuePairs')[id].key).toBe(value);
        });

        it('.onValueChange() changes value state to given value at corresponding id in keyValuePairs[]', () => {
            const value = 'test value';
            const id = 0;

            expect(wrapper.state('keyValuePairs')[id].value).toBe(
                initialState.keyValuePairs[id].value,
            );

            wrapper.instance().onValueChange(id, value);
            expect(wrapper.state('keyValuePairs')[id].value).toBe(value);
        });

        it('.onOperatorChange() changes operator state to given value at given id in keyValuePairs[]', () => {
            const value = '>';
            const id = 0;

            expect(wrapper.state('keyValuePairs')[id].operator).toBe(
                initialState.keyValuePairs[id].operator,
            );

            wrapper.instance().onOperatorChange(id, value);
            expect(wrapper.state('keyValuePairs')[id].operator).toBe(value);
        });

        it('.onSignalStatusChange() changes status state to given value', () => {
            expect(wrapper.state('signalStatus')).toBe(initialState.signalStatus);

            wrapper.instance().onSignalStatusChange('UNUSED');
            expect(wrapper.state('signalStatus')).toBe('UNUSED');
        });

        it('.onViewRecordsChange() changes viewRecordsFor state to given value', () => {
            expect(wrapper.state('viewRecordsFor')).toBe(initialState.viewRecordsFor);

            wrapper.instance().onViewRecordsChange(14);
            expect(wrapper.state('viewRecordsFor')).toBe(14);
        });

        it('.onMinEventFiresChange() changes minEventFires state to given value', () => {
            expect(wrapper.state('minEventFires')).toBe(initialState.minEventFires);

            wrapper.instance().onMinEventFiresChange(10000);
            expect(wrapper.state('minEventFires')).toBe(10000);
        });

        xit('.onSearch() is called', () => {
            wrapper.instance().onSearch(initialState);
            expect(wrapper.instance().onSearch()).toHaveBeenCalled();
        });

        it('.onClearAll() to reset state back to initial state', () => {
            wrapper.instance().onClearAll();
            expect(wrapper.state('name')).toEqual('');
            expect(wrapper.state('searched')).toEqual(false);
            expect(wrapper.state('keyValuePairs')).toEqual([
                {
                    id: 0,
                    key: '',
                    operator: '==',
                    value: '',
                },
            ]);
            expect(wrapper.state('signalStatus')).toEqual('ALL');
            expect(wrapper.state('advanced')).toEqual(false);
            expect(wrapper.state('source').name).toEqual('');
            expect(wrapper.state('source').sourceType).toEqual(null);
            expect(wrapper.state('source').reportSuiteIds).toEqual([]);
            expect(wrapper.state('source').dataSourceIds).toEqual([]);
            expect(wrapper.state('viewRecordsFor')).toEqual(7);
            expect(wrapper.state('minEventFires')).toEqual(1000);
        });

        it('.handleSignalTypeChange() changes state.signalType', () => {
            const newSignalType = 'ANALYTICS';

            expect(wrapper.state('source').sourceType).toBe(initialState.source.sourceType);
            wrapper.instance().handleSignalTypeChange(newSignalType);
            expect(wrapper.state('source').sourceType).toBe(newSignalType);
        });
    });
});
