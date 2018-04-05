import React from 'react';
import { shallow } from 'enzyme';
import TraitsCreation from '../TraitsCreation';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';
import MultiSignalsTraitsCreation from '../MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from '../SingleSignalTraitsCreation';

describe('<TraitsCreation/> component', () => {
    describe('rendering when it is used in Single-Signal Traits Creation', () => {
        const mockFn = jest.fn();
        const props = {
            multiCreation: false,
            selectedSignals: { selectionMessage: '', warning: false },
            traitsCreationLabelText: 'Create Onboarded Trait',
            handleTraitsCreation: mockFn,
        };

        const wrapper = shallow(<TraitsCreation {...props} />);
        const creationWrapper = wrapper.instance();

        it('matches the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with prop `multiCreation` is false', () => {
            expect(creationWrapper.props.multiCreation).toEqual(false);
        });

        it('renders <SingleSignalTraitsCreation/> component', () => {
            expect(wrapper.find(SingleSignalTraitsCreation).exists()).toBe(true);
        });

        it('<SingleSignalTraitsCreation/> has `traitsCreationLabelText` props with correct text', () => {
            expect(
                wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
            ).toEqual(props.traitsCreationLabelText);
        });
    });

    describe('rendering when it is used in Multi-Signals Traits Creation', () => {
        const mockFn = jest.fn();
        const props = {
            multiCreation: true,
            selectedSignals: { selectionMessage: '', warning: false },
            traitsCreationLabelText: 'Create Trait From Multi Signals',
            handleTraitsCreation: mockFn,
        };

        const wrapper = shallow(<TraitsCreation {...props} />);
        const creationWrapper = wrapper.instance();

        it('matches the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with prop `multiCreation` is true', () => {
            expect(creationWrapper.props.multiCreation).toEqual(true);
        });

        it('renders <MultiSignalsTraitsCreation/> component', () => {
            expect(wrapper.find(MultiSignalsTraitsCreation).exists()).toBe(true);
        });

        it('<MultiSignalsTraitsCreation/> has `traitsCreationLabelText` props with correct text', () => {
            expect(
                wrapper.find(MultiSignalsTraitsCreation).props().traitsCreationLabelText,
            ).toEqual(props.traitsCreationLabelText);
        });
    });
});
