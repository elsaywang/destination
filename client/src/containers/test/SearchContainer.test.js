import React from 'react';
import { shallow } from 'enzyme';
import SearchContainer from '../SearchContainer';
import SearchFilters from '../SearchFilters';
import SignalTypeFilter from '../../components/SignalTypeFilter';
import SignalsTable from '../../components/SignalsTable';
import configureStore from '../../configureStore';

describe('<SearchContainer /> component', () => {
    const mockFn = jest.fn();
    const initialState = {
        counts: {
            all: 72093,
            adobeAnalytics: 34300,
            actionableLogFiles: 359,
            generalOnlineData: 27,
            onboardedRecords: 37407,
        },
        signalType: 'all',
        sortSearch: mockFn,
    };
    const wrapper = shallow(<SearchContainer store={configureStore()} />).dive();

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <SearchFilters /> component', () => {
            expect(wrapper.find(SearchFilters).exists()).toBe(true);
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

        describe('when table results are passed in as a prop', () => {
            beforeAll(() => {
                wrapper.setProps({
                    results: {
                        list: [{ id: 0, name: 'test' }],
                    },
                });
            });

            it('renders <SignalSourceFilter /> component', () => {
                expect(wrapper.find(SignalTypeFilter).exists()).toBe(true);
            });

            it('renders <SignalsTable /> component', () => {
                expect(wrapper.find(SignalsTable).exists()).toBe(true);
            });
        });
    });

    describe('state changes based on events', () => {
        it('.handleSignalTypeChange() changes state.signalType', () => {
            const newSignalType = 'adobeAnalytics';

            expect(wrapper.state('signalType')).toBe(initialState.signalType);
            wrapper.instance().handleSignalTypeChange(newSignalType);
            expect(wrapper.state('signalType')).toBe(newSignalType);
        });
    });
});
