import React from 'react';
import { shallow } from 'enzyme';
import { TraitsCreationWarning } from '../TraitsCreationWarning';
import Warning from '../../components/common/Warning';
import {
    SignalsSelectionWarningMessage,
    SignalsSelectionLimitMessage,
} from '../../components/common/Warning/WarningTemplates';

describe('<TraitsCreationWarning/> component', () => {
    describe('rendering when `hasSignalSelectionsTypeWarning` and `isMaxSignalSelectionsReached` props both are false', () => {
        const initialprops = {
            hasSignalSelectionsTypeWarning: false,
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

    describe('rendering when `hasSignalSelectionsTypeWarning` prop is true', () => {
        const props = {
            hasSignalSelectionsTypeWarning: true,
            isMaxSignalSelectionsReached: false,
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

        it('should render both <SignalsSelectionLimitMessage/> and <SignalsSelectionWarningMessage/> when `isMaxSignalSelectionsReached` and `hasSignalSelectionsTypeWarning` props are true', () => {
            wrapper.setProps({ isMaxSignalSelectionsReached: true });
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
            ).toBe(true);
        });
    });

    describe('rendering when `isMaxSignalSelectionsReached` props is true', () => {
        const props = {
            hasSignalSelectionsTypeWarning: false,
            isMaxSignalSelectionsReached: true,
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
    });
});
