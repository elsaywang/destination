import React from 'react';
import { shallow } from 'enzyme';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';
import SingleSignalTraitsCreation from '../SingleSignalTraitsCreation';

describe('<SingleSignalTraitsCreation/> component', () => {
    const mockFn = jest.fn();
    const props = {
        createTraitUrl: 'testUrl',
        traitsCreationLabelText: 'Create Rule-Based Trait',
        canCreateTraits: true,
    };

    describe('when user has trait creation permission', () => {
        const wrapper = shallow(<SingleSignalTraitsCreation {...props} />);

        it('matches the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
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

        describe('<a> child element that hyperlinks to trait create page', () => {
            const anchor = wrapper.find('a');

            it('renders', () => {
                expect(anchor.exists()).toBeTruthy();
            });

            it('has the `createTraitUrl` prop as its href', () => {
                expect(anchor.props().href).toEqual('testUrl');
            });
        });
    });

    describe('when user does not have trait creation permission', () => {
        const newProps = {
            ...props,
            canCreateTraits: false,
        };
        const noTraitCreationWrapper = shallow(<SingleSignalTraitsCreation {...newProps} />);

        it('matches the snapshot', () => {
            expect(noTraitCreationWrapper).toMatchSnapshot();
        });

        it('renders "0 Traits"', () => {
            expect(noTraitCreationWrapper.text()).toBe('0 Traits');
        });
    });
});
