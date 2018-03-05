import React from 'react';
import { shallow } from 'enzyme';
import SignalSourceFilter from '../components/SignalSourceFilter';
import Heading from '@react/react-spectrum/Heading';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import getSignalSourceOptions from '../constants/getSignalSourceOptions';

describe('<SignalSourceFilter /> component', () => {
    const mockFn = jest.fn();
    const initialState = {
        counts: {
            all: 72093,
            adobeAnalytics: 34300,
            actionableLogFiles: 359,
            generalOnlineData: 27,
            onboardedRecords: 37407,
        },
        filter: 'all',
    };
    let wrapper = shallow(
        <SignalSourceFilter
            handleSignalSourceChange={mockFn}
            counts={initialState.counts}
            filter={initialState.filter}
        />,
    );
    const signalSourceOptions = getSignalSourceOptions(initialState.counts);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Heading /> component', () => {
            expect(wrapper.find(Heading).exists()).toBe(true);
        });

        it('renders <TabList /> component with correct number of <Tab />s', () => {
            expect(wrapper.find(TabList).exists()).toBe(true);
            expect(wrapper.find(Tab).length).toBe(signalSourceOptions.length);
        });

        it('renders correctly selected <Tab /> component when props.filter change', () => {
            const filter = 'adobeAnalytics';
            const optionMatchingFilter = signalSourceOptions.find(option => option.value === filter)
                .label;

            wrapper.setProps({ filter });

            expect(
                wrapper
                    .find(Tab)
                    .filterWhere(tab => tab.props().selected)
                    .html(),
            ).toContain(optionMatchingFilter);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Tab /> component with correct label when props.count change', () => {
            wrapper
                .find(Tab)
                .map((tab, index) =>
                    expect(tab.html()).toContain(signalSourceOptions[index].label),
                );

            const newState = {
                counts: {
                    all: 1100,
                    adobeAnalytics: 1000,
                    actionableLogFiles: 100,
                    generalOnlineData: 0,
                    onboardedRecords: 0,
                },
            };
            const newSignalSourceOptions = getSignalSourceOptions(newState.counts);

            wrapper.setProps({
                ...newState,
            });

            wrapper
                .find(Tab)
                .map((tab, index) =>
                    expect(tab.html()).toContain(newSignalSourceOptions[index].label),
                );
            expect(wrapper).toMatchSnapshot();
        });
    });
});
