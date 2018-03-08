import React from 'react';
import { shallow } from 'enzyme';
import SignalTypeFilter from '../SignalTypeFilter';
import Heading from '@react/react-spectrum/Heading';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import getSignalTypeOptions from '../../constants/getSignalTypeOptions';

describe('<SignalTypeFilter /> component', () => {
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
    };
    let wrapper = shallow(
        <SignalTypeFilter
            handleSignalTypeChange={mockFn}
            counts={initialState.counts}
            signalType={initialState.signalType}
        />,
    );
    const signalTypeOptions = getSignalTypeOptions(initialState.counts);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Heading /> component', () => {
            expect(wrapper.find(Heading).exists()).toBe(true);
        });

        it('renders <TabList /> component with correct number of <Tab />s', () => {
            expect(wrapper.find(TabList).exists()).toBe(true);
            expect(wrapper.find(Tab).length).toBe(signalTypeOptions.length);
        });

        it('renders correctly selected <Tab /> component when props.signalType change', () => {
            const signalType = 'adobeAnalytics';
            const optionMatchingSignalType = signalTypeOptions.find(
                option => option.value === signalType,
            ).label;

            wrapper.setProps({ signalType });

            expect(
                wrapper
                    .find(Tab)
                    .filterWhere(tab => tab.props().selected)
                    .html(),
            ).toContain(optionMatchingSignalType);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Tab /> component with correct label when props.count change', () => {
            wrapper
                .find(Tab)
                .map((tab, index) => expect(tab.html()).toContain(signalTypeOptions[index].label));

            const newState = {
                counts: {
                    all: 1100,
                    adobeAnalytics: 1000,
                    actionableLogFiles: 100,
                    generalOnlineData: 0,
                    onboardedRecords: 0,
                },
            };
            const newSignalTypeOptions = getSignalTypeOptions(newState.counts);

            wrapper.setProps({
                ...newState,
            });

            wrapper
                .find(Tab)
                .map((tab, index) =>
                    expect(tab.html()).toContain(newSignalTypeOptions[index].label),
                );
            expect(wrapper).toMatchSnapshot();
        });
    });
});
