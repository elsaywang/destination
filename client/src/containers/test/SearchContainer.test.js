import React from 'react';
import { shallow } from 'enzyme';
import SearchContainer from '../SearchContainer';
import SearchFilters from '../SearchFilters';
import SelectList from '@react/react-spectrum/SelectList';
import SignalTypeFilter from '../../components/SignalTypeFilter';
import SignalsTable from '../../components/SignalsTable';
import configureStore from '../../configureStore';

describe('<SearchContainer /> component', () => {
    const initialState = {
        counts: {
            all: 72093,
            adobeAnalytics: 34300,
            actionableLogFiles: 359,
            generalOnlineData: 27,
            onboardedRecords: 37407,
        },
        signalType: 'all',
    };
    const wrapper = shallow(<SearchContainer store={configureStore()} />).dive();

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <SearchFilters /> component', () => {
            expect(wrapper.find(SearchFilters).exists()).toBe(true);
        });

        it('renders <SignalTypeFilter /> component', () => {
            expect(wrapper.find(SignalTypeFilter).exists()).toBe(true);
        });

        it('renders <SignalsTable /> component', () => {
            expect(wrapper.find(SignalsTable).exists()).toBe(true);
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
