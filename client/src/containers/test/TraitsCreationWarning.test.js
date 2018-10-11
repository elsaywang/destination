import React from 'react';
import { shallow } from 'enzyme';
import { TraitsCreationWarning } from '../TraitsCreationWarning';
import Warning from '../../components/common/Warning';
import {
    SignalsSelectionWarningMessage,
    SignalsSelectionLimitMessage,
    OnboardedSignalSelectionWarningMessage,
} from '../../components/common/Warning/WarningTemplates';

describe('<TraitsCreationWarning/> component', () => {
    describe('rendering when `hasSignalSelectionsTypeWarning` and `isMaxSignalSelectionsReached` props both are false', () => {
        const initialprops = {
            hasSignalSelectionsTypeWarning: false,
            hasOnboardedSignalSelectionsWarning: false,
            isMaxSignalSelectionsReached: false,
            maxSignalSelections: 5,
        };

        const wrapper = shallow(<TraitsCreationWarning {...initialprops} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders null element', () => {
            expect(wrapper.getElement()).toBe(null);
        });
    });

    describe('rendering when only `hasSignalSelectionsTypeWarning` prop is true', () => {
        const props = {
            hasSignalSelectionsTypeWarning: true,
            isMaxSignalSelectionsReached: false,
            hasOnboardedSignalSelectionsWarning: false,
            maxSignalSelections: 5,
        };

        const wrapper = shallow(<TraitsCreationWarning {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <SignalsSelectionWarningMessage/> as children component within <Warning/>', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionWarningMessage)
                    .exists(),
            ).toBe(true);
        });

        it('should not render <SignalsSelectionLimitMessage/> as children component within <Warning/>', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionLimitMessage)
                    .exists(),
            ).toBe(false);
        });

        it('should render only <SignalsSelectionLimitMessage/> when `isMaxSignalSelectionsReached`, `hasSignalSelectionsTypeWarning` and `hasOnboardedSignalSelectionsWarning` props are true', () => {
            wrapper.setProps({
                isMaxSignalSelectionsReached: true,
                hasOnboardedSignalSelectionsWarning: false,
            });
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionLimitMessage)
                    .exists(),
            ).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionWarningMessage)
                    .exists(),
            ).toBe(false);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(OnboardedSignalSelectionWarningMessage)
                    .exists(),
            ).toBe(false);
        });
    });

    describe('rendering when only `isMaxSignalSelectionsReached` props is true', () => {
        const props = {
            hasSignalSelectionsTypeWarning: false,
            isMaxSignalSelectionsReached: true,
            hasOnboardedSignalSelectionsWarning: false,
            maxSignalSelections: 5,
        };

        const wrapper = shallow(<TraitsCreationWarning {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <SignalsSelectionLimitMessage/> as children component within <Warning/>', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionLimitMessage)
                    .exists(),
            ).toBe(true);
        });

        it('should not render <SignalsSelectionWarningMessage/> as children component within <Warning/> as `hasSignalSelectionsTypeWarning` props is false', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionWarningMessage)
                    .exists(),
            ).toBe(false);
        });

        it('should not render <OnboardedSignalSelectionWarningMessage/> as children component within <Warning/> as `hasOnboardedSignalSelectionsWarning` props is false', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(OnboardedSignalSelectionWarningMessage)
                    .exists(),
            ).toBe(false);
        });
    });

    describe('rendering when only `hasOnboardedSignalSelectionsWarning` props is true', () => {
        const props = {
            hasSignalSelectionsTypeWarning: false,
            isMaxSignalSelectionsReached: false,
            hasOnboardedSignalSelectionsWarning: true,
            maxSignalSelections: 5,
        };

        const wrapper = shallow(<TraitsCreationWarning {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders no <SignalsSelectionLimitMessage/> as children component within <Warning/>', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionLimitMessage)
                    .exists(),
            ).toBe(false);
        });

        it('renders no <SignalsSelectionWarningMessage/> as children component within <Warning/>', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionWarningMessage)
                    .exists(),
            ).toBe(false);
        });

        it('should render <OnboardedSignalSelectionWarningMessage/> as children component within <Warning/> as `hasOnboardedSignalSelectionsWarning` props is true', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(OnboardedSignalSelectionWarningMessage)
                    .exists(),
            ).toBe(true);
        });
    });
});
