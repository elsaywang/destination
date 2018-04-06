import React from 'react';
import { shallow } from 'enzyme';
import MultiSignalsTraitsCreation from '../MultiSignalsTraitsCreation';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';

describe('<MultiSignalsTraitsCreation/> component', () => {
    const mockFn = jest.fn();
    const props = {
        selectedSignals: { selectionMessage: '', hasWarning: false },
        traitsCreationLabelText: 'Create Trait From Multi Signals',
        handleTraitsCreation: mockFn,
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

    it('renders <Button /> component has correct labeling passed from `traitsCreationLabelText` prop', () => {
        expect(wrapper.find(Button).exists()).toBeTruthy();
        expect(wrapper.find(Button).props().label).toEqual(props.traitsCreationLabelText);
    });

    it('renders <Button /> component includes <Add/> as an icon prop', () => {
        expect(wrapper.find(Button).props().icon).toEqual(<Add />);
    });

    it('renders non-disabled <Button /> with "action" variant when no warning message passes from props', () => {
        expect(wrapper.find(Button).props().variant).toEqual('action');
        expect('disabled' in wrapper.props()).toBeFalsy();
    });

    it('renders disabled <Button /> with "action" variant when warning message passes from props', () => {
        const propsWithWarning = {
            selectedSignals: {
                selectionMessage: '1 Real-time signal , 1 Onboarded signal selected ',
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
