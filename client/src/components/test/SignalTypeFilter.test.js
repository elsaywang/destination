import React from 'react';
import { shallow } from 'enzyme';
import SignalTypeFilter from '../SignalTypeFilter';
import Heading from '@react/react-spectrum/Heading';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import { getSignalTypeOptions } from '../../constants/signalTypeOptions';

describe('<SignalTypeFilter /> component', () => {
    const mockFn = jest.fn();
    const props = {
        signalType: 'ALL',
    };
    const state = {
        counts: {
            ALL: 72093,
            ANALYTICS: 34300,
            ALF: 359,
            REALTIME: 27,
            ONBOARDED: 37407,
        },
    };
    const wrapper = shallow(
        <SignalTypeFilter onSignalTypeChange={mockFn} signalType={props.signalType} />,
    );
    const signalTypeOptions = getSignalTypeOptions(state.counts);

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
            const signalType = 'ANALYTICS';
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
                    ALL: 1100,
                    ANALYTICS: 1000,
                    ALF: 100,
                    REALTIME: 0,
                    ONBOARDED: 0,
                },
            };
            const newSignalTypeOptions = getSignalTypeOptions(newState.counts);

            wrapper.setState({
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

    describe('event handlers', () => {
        it('.handleSignalTypeChange() calls `onSignalTypeChange` prop with a signalType that corresponds to index of the signal type tab clicked', () => {
            wrapper.instance().handleSignalTypeChange(0);
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ALL');
            wrapper.instance().handleSignalTypeChange(1);
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ANALYTICS');
            wrapper.instance().handleSignalTypeChange(2);
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ALF');
            wrapper.instance().handleSignalTypeChange(3);
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('REALTIME');
            wrapper.instance().handleSignalTypeChange(4);
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ONBOARDED');
        });
    });
});
