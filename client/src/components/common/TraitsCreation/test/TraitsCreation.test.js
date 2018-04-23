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
        const props = {
            dataType: 'ONBOARDED',
            keyValuePairs: [],
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
                wrapper.setProps({ dataType: 'ONBOARDED' });

                expect(
                    wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
                ).toEqual('Create Onboarded Trait');
            });

            it('is for creating a rule-based trait when the single signal is a real-time signal', () => {
                wrapper.setProps({ dataType: 'REALTIME' });

                expect(
                    wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
                ).toEqual('Create Rule-Based Trait');
            });
        });
    });

    describe('rendering when it is used in Multi-Signals Traits Creation', () => {
        const props = {
            multiCreation: true,
            selectedSignals: { selectionMessage: '', hasWarning: false, records: [] },
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

    describe('getCreateTraitURL', () => {
        stringifySignals.mockClear();
        const props = {
            dataType: 'ONBOARDED',
            keyValuePairs: [],
        };
        const wrapper = shallow(<TraitsCreation {...props} />);

        it('for single-signal trait creation, calls `stringifySignals` on an array of an object containing the `keyValuePairs` prop', () => {
            const keyValuePairs = [{ key: 'key1', value: 'value1' }];
            const expectedSignals = [{ keyValuePairs }];

            wrapper.setProps({ keyValuePairs });

            expect(stringifySignals).toBeCalledWith(expectedSignals);
        });

        it("for multi-signal trait creation, calls `stringifySignals` on the `selectedSignals` prop's `records`", () => {
            const selectedSignals = {
                records: [{ keyValuePairs: [{ key: 'key1', value: 'value1' }] }],
            };

            wrapper.setProps({ selectedSignals });

            expect(stringifySignals).toBeCalledWith(selectedSignals.records);
        });

        it('returns the Create Rule-Based Trait URL when the `dataType` is "REALTIME"', () => {
            wrapper.setProps({
                dataType: 'REALTIME',
                keyValuePairs: [],
            });

            expect(
                wrapper
                    .instance()
                    .getCreateTraitURL()
                    .endsWith('#new/rule'),
            ).toBeTruthy();
        });

        it('returns the Create Onboarded Trait URL when the `dataType` is "ONBOARDED"', () => {
            wrapper.setProps({
                dataType: 'ONBOARDED',
                keyValuePairs: [],
            });

            expect(
                wrapper
                    .instance()
                    .getCreateTraitURL()
                    .endsWith('#new/onboarded'),
            ).toBeTruthy();
        });
    });
});
