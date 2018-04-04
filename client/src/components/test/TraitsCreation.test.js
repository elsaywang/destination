import React from 'react';
import { shallow } from 'enzyme';
import TraitsCreation from '../TraitsCreation';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';

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

        it('passes `traitsCreationLabelText` props with correct text', () => {
            expect(creationWrapper.props.traitsCreationLabelText).toEqual(
                props.traitsCreationLabelText,
            );
        });

        it('includes <Add/> icon with size=`S`', () => {
            expect(wrapper.find(Add).exists()).toBe(true);
            expect(wrapper.find(Add).props().size).toEqual('S');
        });

        it('renders the correct text passed from `traitsCreationLabelText` prop in a <div/>', () => {
            expect(
                wrapper.containsMatchingElement(<div>{props.traitsCreationLabelText}</div>),
            ).toBeTruthy();
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

        it('passes `traitsCreationLabelText` props with correct text', () => {
            expect(creationWrapper.props.traitsCreationLabelText).toEqual(
                props.traitsCreationLabelText,
            );
        });

        it('renders the correct message passed from `selectedSignals.selectionMessage` prop in a <span/>', () => {
            expect(
                wrapper.containsMatchingElement(
                    <span>{props.selectedSignals.selectionMessage}</span>,
                ),
            ).toBeTruthy();
        });

        it('renders <Button /> component has correct labeling passed from `traitsCreationLabelText` prop', () => {
            expect(wrapper.find(Button).exists()).toBe(true);
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
                    warning: true,
                },
            };
            wrapper.setProps({ ...propsWithWarning });
            expect(wrapper.find(Button).props().variant).toEqual('action');
            expect(wrapper.find(Button).props().disabled).toBe(true);
        });
    });
});
