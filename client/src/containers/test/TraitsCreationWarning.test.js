import React from 'react';
import { shallow } from 'enzyme';
import { TraitsCreationWarning } from '../TraitsCreationWarning';
import Warning from '../../components/common/Warning';
import {
    SignalsSelectionWarningMessage,
    SignalsSelectionLimitMessage,
} from '../../components/common/Warning/WarningTemplates';

describe('<TraitsCreationWarning/> component', () => {
    describe('rendering when `hasTraitsCreationDisabledWarning` and `isMaxSignalSelectionsReached` props both are false', () => {
        const initialprops = {
            hasTraitsCreationDisabledWarning: false,
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

    describe('rendering when `hasTraitsCreationDisabledWarning` prop is true', () => {
        const props = {
            hasTraitsCreationDisabledWarning: true,
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

        it('should not render <SignalsSelectionLimitMessage/> when `isMaxSignalSelectionsReached` and `hasTraitsCreationDisabledWarning` props are true', () => {
            wrapper.setProps({ isMaxSignalSelectionsReached: true });
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(
                wrapper
                    .find(Warning)
                    .children()
                    .find(SignalsSelectionLimitMessage)
                    .exists(),
            ).toBe(false);
        });
    });

    describe('rendering when `isMaxSignalSelectionsReached` props is true', () => {
        const props = {
            hasTraitsCreationDisabledWarning: false,
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

        it('should not render <SignalsSelectionWarningMessage/> as children component within <Warning/> as `hasTraitsCreationDisabledWarning` props is false', () => {
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
