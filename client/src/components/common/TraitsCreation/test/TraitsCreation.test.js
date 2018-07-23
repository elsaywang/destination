import React from 'react';
import { shallow } from 'enzyme';
import TraitsCreation from '../TraitsCreation';
import MultiSignalsTraitsCreation from '../MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from '../SingleSignalTraitsCreation';
import { stringifySignals } from '../../../../utils/stringifySignals';

describe('<TraitsCreation /> component', () => {
    describe('rendering when it is used in Single-Signal Traits Creation', () => {
        const props = {
            categoryType: 'ONBOARDED',
            keyValuePairs: [],
            canCreateTraits: true,
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
            it('is for creating an onboarded trait when the single signal is an onboarded signal', () => {
                wrapper.setProps({ categoryType: 'ONBOARDED' });

                expect(
                    wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
                ).toEqual('Create Onboarded Trait');
            });

            it('is for creating a rule-based trait when the single signal is a real-time signal', () => {
                wrapper.setProps({ categoryType: 'REALTIME' });

                expect(
                    wrapper.find(SingleSignalTraitsCreation).props().traitsCreationLabelText,
                ).toEqual('Create Rule-Based Trait');
            });
        });
    });

    describe('rendering when it is used in Multi-Signals Traits Creation', () => {
        const props = {
            multiCreation: true,
            selectedSignals: {
                selectionMessage: '',
                hasTraitsCreationDisabledWarning: false,
                records: [],
            },
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
        const props = {
            categoryType: 'ONBOARDED',
            keyValuePairs: [],
        };
        const wrapper = shallow(<TraitsCreation {...props} />);

        it('returns the Create Rule-Based Trait URL when the `categoryType` is "REALTIME"', () => {
            wrapper.setProps({
                categoryType: 'REALTIME',
                keyValuePairs: [],
            });

            expect(
                wrapper
                    .instance()
                    .getCreateTraitURL()
                    .endsWith('#new/rule'),
            ).toBeTruthy();
        });

        it('returns the Create Onboarded Trait URL when the `categoryType` is "ONBOARDED"', () => {
            wrapper.setProps({
                categoryType: 'ONBOARDED',
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

    describe('storeSessionAndNavigateToTraits', () => {
        const props = {
            categoryType: 'ONBOARDED',
            keyValuePairs: [],
        };
        const wrapper = shallow(<TraitsCreation {...props} />);
        const event = {
            preventDefault: () => {},
        };

        beforeEach(() => {
            window.location.assign = jest.fn();
        });

        it('for single-signal trait creation, should store signalsParams in sessionStorage based on keyValuePairs', () => {
            const keyValuePairs = [{ key: 'key1', value: 'value1' }];
            const expectedSignals = [{ keyValuePairs }];
            const signalsParams = {
                signals: stringifySignals(expectedSignals),
            };

            wrapper.setProps({ keyValuePairs });
            wrapper.instance().storeSessionAndNavigateToTraits(event);

            const KEY = 'signalsParams';
            const VALUE = JSON.stringify(signalsParams);

            expect(sessionStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
            expect(sessionStorage.__STORE__[KEY]).toBe(VALUE);
            expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
        });

        it("for multi-signal trait creation, should store signalsParams in sessionStorage based on the `selectedSignals` prop's `records`", () => {
            const selectedSignals = {
                records: [{ keyValuePairs: [{ key: 'key1', value: 'value1' }] }],
            };
            const signalsParams = {
                signals: stringifySignals(selectedSignals.records),
            };

            wrapper.setProps({ selectedSignals });
            wrapper.instance().storeSessionAndNavigateToTraits(event);

            const KEY = 'signalsParams';
            const VALUE = JSON.stringify(signalsParams);

            expect(sessionStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
            expect(sessionStorage.__STORE__[KEY]).toBe(VALUE);
            expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
        });
    });
});
