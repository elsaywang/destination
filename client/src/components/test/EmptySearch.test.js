import React from 'react';
import { shallow } from 'enzyme';
import EmptySearch from '../EmptySearch';
import Empty from '../../components/common/Empty';
import Explore from '../../images/explore.svg';
import NoResult from '../../images/noResult.svg';

describe('<EmptySearch/> component', () => {
    describe('when variant is `explore` passes in props', () => {
        const wrapper = shallow(<EmptySearch variant="explore" />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Empty/> component with Explore Image', () => {
            expect(wrapper.find(Empty).exists()).toBe(true);
            expect(wrapper.find('img').props().src).toEqual(Explore);
        });
    });
    describe('when variant is `noResult` passes in props', () => {
        const wrapper = shallow(<EmptySearch variant="noResult" />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Empty/> component with NoResult Image', () => {
            expect(wrapper.find(Empty).exists()).toBe(true);
            expect(wrapper.find('img').props().src).toEqual(NoResult);
        });
    });
});
