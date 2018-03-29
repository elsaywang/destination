import React from 'react';
import { shallow } from 'enzyme';
import { BulkCreation } from '../BulkCreation';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';

describe('<BulkCreation/> component', () => {
    describe('rendering when there is no signal selected', () => {
        const mockFn = jest.fn();
        const initialprops = {
            selectedSignals: {
                displayContext: '',
                createTraitFromMultiSignals: mockFn,
                records: [],
                warning: '',
            },
        };
        const wrapper = shallow(<BulkCreation {...initialprops} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders null element', () => {
            expect(wrapper.getElement()).toBe(null);
        });
    });

    describe('rendering when there are selectedSignals.records pass in props ', () => {
        const props = {
            selectedSignals: {
                displayContext: '1 Real-time signal selected ',
                records: [{ rowIndex: 0, signalType: 'Adobe Analytics' }],
                warning: '',
            },
        };
        const wrapper = shallow(<BulkCreation {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders the displayContext passed from selectedSignals prop into a <span/>', () => {
            expect(
                wrapper.containsMatchingElement(
                    <span>{props.selectedSignals.displayContext}</span>,
                ),
            ).toBeTruthy();
        });

        it('renders <Button /> component with correct "Create Trait From Multi Signals" labeling', () => {
            expect(wrapper.find(Button).exists()).toBe(true);
            expect(wrapper.find(Button).props().label).toEqual('Create Trait From Multi Signals');
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
                    displayContext: '1 Real-time signal , 1 Onboarded signal selected ',
                    records: [
                        { rowIndex: 0, signalType: 'Adobe Analytics' },
                        { rowIndex: 1, signalType: 'Onboarded Records' },
                    ],
                    warning: 'There is error in your selected signals ! ',
                },
            };
            wrapper.setProps({ ...propsWithWarning });
            expect(wrapper.find(Button).props().variant).toEqual('action');
            expect(wrapper.find(Button).props().disabled).toBe(true);
        });
    });
});
