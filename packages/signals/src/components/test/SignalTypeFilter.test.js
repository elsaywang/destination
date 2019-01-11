import React from 'react';
import { shallow } from 'enzyme';
import SignalTypeFilter from '../SignalTypeFilter';
import Heading from '@react/react-spectrum/Heading';

describe('<SignalTypeFilter /> component', () => {
    const mockFn = jest.fn();
    const props = {
        signalType: 'ALL',
        isSearched: false,
    };
    const state = {
        value: 'ALL',
    };
    const wrapper = shallow(
        <SignalTypeFilter
            onSignalTypeChange={mockFn}
            signalType={props.signalType}
            isSearched={props.isSearched}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Heading /> component', () => {
            expect(wrapper.find(Heading).exists()).toBe(true);
        });
    });

    describe('event handlers', () => {
        it('.handleSignalTypeChange() calls `onSignalTypeChange` prop with a signalType that corresponds to index of the signal type tab clicked', () => {
            wrapper.instance().handleSignalTypeSelect('ANALYTICS');
            expect(wrapper.instance().state.value).toBe('ANALYTICS');
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ANALYTICS');

            wrapper.instance().handleSignalTypeSelect('ALF');
            expect(wrapper.instance().state.value).toBe('ALF');
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ALF');

            wrapper.instance().handleSignalTypeSelect('REALTIME');
            expect(wrapper.instance().state.value).toBe('REALTIME');
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('REALTIME');

            wrapper.instance().handleSignalTypeSelect('ONBOARDED');
            expect(wrapper.instance().state.value).toBe('ONBOARDED');
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ONBOARDED');

            wrapper.instance().handleSignalTypeSelect('ALL');
            expect(wrapper.instance().state.value).toBe('ALL');
            expect(wrapper.instance().props.onSignalTypeChange).toHaveBeenCalledWith('ALL');
        });
    });
});
