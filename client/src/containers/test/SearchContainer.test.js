import React from 'react';
import mockdate from 'mockdate';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import SearchContainer from '../SearchContainer';
import Search from '../../components/Search';
import SignalTypeFilter from '../../components/SignalTypeFilter';
import SignalsTable from '../../components/SignalsTable';
import SavedSearch from '../../containers/SavedSearch';
import EmptySearch from '../../components/EmptySearch';
import SaveSearchExecution from '../../components/SaveSearchExecution';
import configureStore from '../../configureStore';
import Wait from '@react/react-spectrum/Wait';
import { fetchSignals } from '../../utils/fetchSignals';

jest.mock('../../utils/fetchSignals');

describe('<SearchContainer /> component', () => {
    mockdate.set(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)

    const store = configureStore();
    const wrapper = shallow(
        <Provider store={store}>
            <SearchContainer />
        </Provider>,
    )
        .dive({ context: { store } })
        .dive();

    describe('rendering', () => {
        beforeAll(() => {
            wrapper.setProps({
                results: {
                    list: [],
                },
                isResultsLoaded: false,
            });
            wrapper.setState({ searched: false });
        });
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Search /> component', () => {
            expect(wrapper.find(Search).exists()).toBe(true);
        });

        it('renders <SavedSearch /> component', () => {
            expect(wrapper.find(SavedSearch).exists()).toBe(true);
        });

        it('renders <EmptySearch/> component with `explore` variant pass in props when searched state is set to false', () => {
            expect(wrapper.find(EmptySearch).exists()).toBe(true);
            expect(wrapper.find(EmptySearch).props().variant).toEqual('explore');
        });

        it('does always render <SignalSourceFilter /> component when there are no props.results passed in ', () => {
            expect(wrapper.find(SignalTypeFilter).exists()).toBe(true);
        });

        it('does not render <SignalsTable /> component when there are no props.results passed in', () => {
            expect(wrapper.find(SignalsTable).exists()).toBe(false);
        });

        it('does always render <SaveSearchExecution /> component when there are no props.results passed in', () => {
            expect(wrapper.find(SaveSearchExecution).exists()).toBe(true);
        });

        it('does not render <Wait /> component when there are no props.results passed in and searched state is falsy', () => {
            expect(wrapper.find(<Wait />).exists()).toBe(false);
        });

        describe('when table results are passed in as a prop with records and `isResultsLoaded` prop is true', () => {
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
                    isResultsLoaded: true,
                });
                wrapper.setState({ searched: true });
            });

            it('matches snapshot', () => {
                expect(wrapper).toMatchSnapshot();
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

            it('does not render <EmptySearch/> component', () => {
                expect(wrapper.find(EmptySearch).exists()).toBe(false);
            });

            it('does not render <Wait/> component', () => {
                expect(wrapper.find(Wait).exists()).toBe(false);
            });
        });

        describe('when table results are passed in as a prop with no records but isResultsLoaded props is true and seached state is truthy', () => {
            beforeAll(() => {
                wrapper.setProps({
                    results: {
                        list: [],
                    },
                    isResultsLoaded: true,
                });
                wrapper.setState({ searched: true });
            });

            it('renders <EmptySearch/> component with `noResult` variant', () => {
                expect(wrapper.find(EmptySearch).exists()).toBe(true);
                expect(wrapper.find(EmptySearch).props().variant).toEqual('noResult');
            });
        });

        describe('when search results in an error', () => {
            beforeAll(() => {
                wrapper.setProps({
                    errors: {
                        ...wrapper.instance().props.errors,
                        searchForm: {
                            hasError: true,
                            message: 'Forbidden',
                        },
                    },
                });

                wrapper.setState({ searched: true });
            });

            it('renders <EmptySearch/> component with `errorFetching` variant', () => {
                expect(wrapper.find(EmptySearch).exists()).toBe(true);
                expect(wrapper.find(EmptySearch).props().variant).toEqual('errorFetching');
            });
        });

        describe('Helpers', () => {
            describe('shouldShowResults', () => {
                describe('when results exist and are loaded', () => {
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
                            isResultsLoaded: true,
                        });
                    });

                    it('should return true', () => {
                        expect(wrapper.instance().shouldShowResults()).toBeTruthy();
                    });
                });

                describe('when results do not exist but have been requested', () => {
                    beforeAll(() => {
                        wrapper.setProps({
                            results: {
                                list: [],
                            },
                            isResultsLoaded: true,
                        });
                    });

                    it('should return false', () => {
                        expect(wrapper.instance().shouldShowResults()).toBeFalsy();
                    });
                });

                describe('when results do not exist and have not been requested', () => {
                    beforeAll(() => {
                        wrapper.setProps({
                            results: {
                                list: [],
                            },
                            isResultsLoaded: false,
                        });
                    });

                    it('should return false', () => {
                        expect(wrapper.instance().shouldShowResults()).toBeFalsy();
                    });
                });

                describe('when results exist but have not been requested, should never happen', () => {
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
                            isResultsLoaded: false,
                        });
                    });

                    it('should return false', () => {
                        expect(wrapper.instance().shouldShowResults()).toBeFalsy();
                    });
                });

                afterAll(() => {
                    wrapper.setProps({
                        results: {
                            list: [],
                        },
                        isResultsLoaded: true,
                    });
                });
            });

            describe('isSearchDisabled', () => {
                describe('when a search has been executed but results are still loading', () => {
                    beforeAll(() => {
                        wrapper.setState({ searched: true });
                        wrapper.setProps({ isResultsLoaded: false });
                    });

                    it('should return true', () => {
                        expect(wrapper.instance().isSearchDisabled()).toBeTruthy();
                    });
                });

                describe('when a search has been executed and results have loaded', () => {
                    beforeAll(() => {
                        wrapper.setState({ searched: true });
                        wrapper.setProps({ isResultsLoaded: true });
                    });

                    it('should return false', () => {
                        expect(wrapper.instance().isSearchDisabled()).toBeFalsy();
                    });
                });

                describe('when a search has not been executed and no results were loaded', () => {
                    beforeAll(() => {
                        wrapper.setState({ searched: false });
                        wrapper.setProps({ isResultsLoaded: false });
                    });

                    it('should return false', () => {
                        expect(wrapper.instance().isSearchDisabled()).toBeFalsy();
                    });
                });

                describe('when a search has not been executed but results have loaded', () => {
                    beforeAll(() => {
                        wrapper.setState({ searched: false });
                        wrapper.setProps({ isResultsLoaded: true });
                    });

                    it('should return false', () => {
                        expect(wrapper.instance().isSearchDisabled()).toBeFalsy();
                    });
                });

                afterAll(() => {
                    wrapper.setState({ searched: true });
                    wrapper.setProps({ isResultsLoaded: true });
                });
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
                sourceType: 'ALL',
                dataSourceIds: [],
                reportSuiteIds: [],
            },
            viewRecordsFor: '7D',
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
            expect(wrapper.state('searched')).toBe(false);
            expect(wrapper.state('source').name).toBe('');
        });

        it('.onReportSuiteChange() changes source name state and reportSuiteIds to the given value if it is matched', () => {
            expect(wrapper.state('source').name).toBe(initialState.source.name);

            wrapper.setProps({
                reportSuites: [
                    {
                        suite: 'test-report-suite',
                        name: 'test report suite',
                    },
                ],
            });
            wrapper.instance().onReportSuiteChange('test report suite');
            expect(wrapper.state('source').name).toBe('test report suite');
            expect(wrapper.state('source').reportSuiteIds).toEqual(['test-report-suite']);
        });

        it('.onReportSuiteChange() changes only the source name state to the given value if it is not matched', () => {
            wrapper.setProps({
                reportSuites: [
                    {
                        suite: 'test-report-suite',
                        name: 'test report suite',
                    },
                ],
            });

            wrapper.instance().onReportSuiteChange('test report suite123');
            expect(wrapper.state('source').name).toBe('test report suite123');
            expect(wrapper.state('source').reportSuiteIds).toEqual([]);
        });

        it('.onReportSuiteSelect() changes source state to reflect the report suite that corresponds to the given value', () => {
            wrapper.setProps({
                reportSuites: [
                    {
                        suite: 'test-report-suite-123',
                        name: 'Test Report Suite 123',
                    },
                ],
            });

            wrapper.instance().onReportSuiteSelect({
                value: 'test-report-suite-123',
                label: 'test-report-suite-123 (Test Report Suite 123)',
            });

            expect(wrapper.state('source')).toEqual({
                name: 'test-report-suite-123 (Test Report Suite 123)',
                dataSourceIds: [],
                reportSuiteIds: ['test-report-suite-123'],
                sourceType: 'ANALYTICS',
            });
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
            expect(wrapper.state('source').sourceType).toEqual('ALL');
            expect(wrapper.state('source').reportSuiteIds).toEqual([]);
            expect(wrapper.state('source').dataSourceIds).toEqual([]);
            expect(wrapper.state('viewRecordsFor')).toEqual('7D');
            expect(wrapper.state('minEventFires')).toEqual(1000);
        });

        it('.handleSignalTypeChange() changes state.signalType', () => {
            const newSignalType = 'ANALYTICS';

            expect(wrapper.state('source').sourceType).toBe(initialState.source.sourceType);
            wrapper.instance().handleSignalTypeChange(newSignalType);
            expect(wrapper.state('source').sourceType).toBe(newSignalType);
        });

        it('.handleSignalTypeChange() for `ONBOARDED` signalType enables the dataSources filter', () => {
            const onBoarded = 'ONBOARDED';
            wrapper.instance().handleSignalTypeChange(onBoarded);
            expect(wrapper.state('source').sourceType).toBe(onBoarded);
            expect(wrapper.instance().isFilteredBySignalSource()).toBeTruthy();
            expect(wrapper.find('[data-test="signal-source-filter"]')).toBeTruthy();
        });
    });

    describe('handling search events', () => {
        afterEach(() => {
            fetchSignals.mockClear();
            wrapper.setProps({ isEndOfResults: false });
        });

        describe('.handleLoadMore()', () => {
            it('should not throttle requests if the end of results are reached', () => {
                expect(store.getState().results.isThrottled).toBe(false);
                wrapper.setProps({ isEndOfResults: true });
                wrapper.instance().handleLoadMore();

                expect(store.getState().results.isThrottled).toBe(false);
            });

            it('should not call `loadMore` if the end of results are reached', () => {
                expect(store.getState().results.isThrottled).toBe(false);
                wrapper.setProps({ isEndOfResults: true });
                wrapper.instance().handleLoadMore();

                expect(fetchSignals).not.toHaveBeenCalled();
            });

            it('should initially throttle future requests to load more results', () => {
                expect(store.getState().results.isThrottled).toBe(false);
                wrapper.instance().handleLoadMore();
                expect(store.getState().results.isThrottled).toBe(true);
            });

            it('should disable throttling requests to load more results after `throttleMs` milliseconds', () => {
                return expect(
                    new Promise(resolve => {
                        wrapper.instance().handleLoadMore(1);
                        setTimeout(() => resolve(store.getState().results.isThrottled), 2);
                    }),
                ).resolves.toBe(false);
            });

            it('should call `loadMore` and increment the searched page if not throttled', () => {
                wrapper.instance().handleLoadMore(0);

                expect(fetchSignals).toHaveBeenCalledTimes(1);
            });

            it('should not call `loadMore` if throttled', () => {
                wrapper.setProps({ results: { list: [], isThrottled: true } });
                wrapper.instance().handleLoadMore(0);

                expect(fetchSignals).not.toHaveBeenCalled();
            });
        });
    });

    mockdate.reset();
});
