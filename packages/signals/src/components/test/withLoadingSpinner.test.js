import React from 'react';
import { shallow } from 'enzyme';
import withLoadingSpinner from '../../components/withLoadingSpinner';
import Heading from '@react/react-spectrum/Heading';
import Wait from '@react/react-spectrum/Wait';

describe('rendering', () => {
    it('renders <Wait /> when boolean passed in is false', () => {
        const list = [1, 2, 3];
        const WrappedHeading = withLoadingSpinner(Heading);
        const wrapper = shallow(<WrappedHeading isLoaded={Boolean(list.length)} list={list} />);

        expect(wrapper.find(Heading).exists()).toBe(true);
    });

    it('renders <Heading /> when boolean passed in is false', () => {
        const list = [];
        const WrappedHeading = withLoadingSpinner(Heading);
        const wrapper = shallow(<WrappedHeading isLoaded={Boolean(list.length)} list={list} />);

        expect(wrapper.find(Wait).exists()).toBe(true);
    });
});
