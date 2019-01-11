import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';
import DropdownMenu from '../../DropdownMenu';
import Well from '@react/react-spectrum/Well';

describe('<Layout/> component', () => {
    describe('rendering without any children component', () => {
        const mockFn = jest.fn();
        const wrapper = shallow(<Layout heading="Destinations" />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <DropdownMenu/> when `heading` props is `Destinations`', () => {
            expect(wrapper.find(DropdownMenu).exists()).toBeTruthy();
        });
        it('renders not <DropdownMenu/> when `heading` props is `Configuration`', () => {
            wrapper.setProps({ heading: `Configuration` });
            expect(wrapper.find(DropdownMenu).exists()).toBeFalsy();
        });
    });

    describe('rendering when including children component', () => {
        const mockFn = jest.fn();
        const wrapper = shallow(
            <Layout heading="Destinations">
                <Well />
            </Layout>,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <Well/>  children component', () => {
            expect(
                wrapper
                    .children()
                    .find(Well)
                    .exists(),
            ).toBeTruthy();
        });
    });
});
