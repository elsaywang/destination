import React from 'react';
import { shallow } from 'enzyme';
import TraitsCreation from '../TraitsCreation';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';
import MultiSignalsTraitsCreation from '../MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from '../SingleSignalTraitsCreation';
import { stringifySignals } from '../../../../utils/stringifySignals';

jest.mock('../../../../utils/stringifySignals');
stringifySignals.mockImplementation(() => '');

describe('<TraitsCreation/> component', () => {
    describe('rendering when it is used in Single-Signal Traits Creation', () => {
        const mockFn = jest.fn();
        const props = {
            dataType: 'ONBOARDED',
            keyValuePairs: [],
            handleTraitsCreation: mockFn,
        };

        const wrapper = shallow(<TraitsCreation {...props} />);
        const creationWrapper = wrapper.instance();

        it('matches the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with prop `multiCreation` is undefined', () => {
            expect(creationWrapper.props.multiCreation).toBeUndefined();
        });

        it('renders <SingleSignalTraitsCreation/> component', () => {
            expect(wrapper.find(SingleSignalTraitsCreation).exists()).toBe(true);
        });

        describe('Trait creation label', () => {
            it('is for creaitng an onboarded trait when the single signal is an onboarded signal', () => {
                const wrapper = shallow(<TraitsCreation dataType={'ONBOARDED'} />);

                expect(
                    wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
                ).toEqual('Create Onboarded Trait');
            });

            it('is for creating a rule-based trait when the single signal is a real-time signal', () => {
                const wrapper = shallow(<TraitsCreation dataType={'REALTIME'} />);

                expect(
                    wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
                ).toEqual('Create Rule-Based Trait');
            });
        });
    });

    describe('rendering when it is used in Multi-Signals Traits Creation', () => {
        const mockFn = jest.fn();
        const props = {
            multiCreation: true,
            selectedSignals: { selectionMessage: '', hasWarning: false, records: [] },
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
    });
});
