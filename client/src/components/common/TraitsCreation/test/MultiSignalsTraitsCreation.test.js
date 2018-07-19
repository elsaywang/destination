import React from 'react';
import { shallow } from 'enzyme';
import MultiSignalsTraitsCreation from '../MultiSignalsTraitsCreation';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';

describe('<MultiSignalsTraitsCreation/> component', () => {
    const mockFn = jest.fn();
    const props = {
        selectedSignals: { selectionMessage: '', hasWarning: false },
        storeSessionAndNavigateToTraits: mockFn,
    };
    const wrapper = shallow(<MultiSignalsTraitsCreation {...props} />);

    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the correct message passed from `selectedSignals.selectionMessage` prop in a <span/>', () => {
        expect(
            wrapper.containsMatchingElement(<span>{props.selectedSignals.selectionMessage}</span>),
        ).toBeTruthy();
    });

    describe('<Button /> child component', () => {
        const button = wrapper.find(Button);

        it('renders', () => {
            expect(button.exists()).toBeTruthy();
        });

        it('includes <Add/> as an icon prop', () => {
            expect(button.props().icon).toEqual(<Add />);
        });

        it('has the correct hardcoded label', () => {
            expect(button.props().label).toEqual('Create Trait From Multiple Signals');
        });

        it('has "action" variant when no warning message is passed from props', () => {
            expect(button.props().variant).toEqual('action');
            expect('disabled' in wrapper.props()).toBeFalsy();
        });

        it('is disabled <Button /> with "action" variant when warning message is passed from props', () => {
            const propsWithWarning = {
                selectedSignals: {
                    selectionMessage: '1 Real-time signal, 1 Onboarded signal selected',
                    records: [
                        { rowIndex: 0, signalType: 'Adobe Analytics' },
                        { rowIndex: 1, signalType: 'Onboarded Records' },
                    ],
                    hasWarning: true,
                },
            };

            wrapper.setProps({ ...propsWithWarning });
            expect(wrapper.find(Button).props().variant).toEqual('action');
            expect(wrapper.find(Button).props().disabled).toBeTruthy();
        });
    });
});
