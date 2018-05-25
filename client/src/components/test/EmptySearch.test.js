import React from 'react';
import { shallow } from 'enzyme';
import EmptySearch from '../EmptySearch';
import EmptyPlaceholder from '../../components/common/EmptyPlaceholder';
import Explore from '../../images/explore.svg';
import NoResult from '../../images/noResult.svg';

jest.mock('../../lib/getStaticUrl', () => ({
    getStaticUrl: () => 'localhost:3000/',
}));

describe('<EmptySearch/> component', () => {
    describe('when variant is `explore` passes in props', () => {
        const wrapper = shallow(<EmptySearch variant="explore" />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <EmptyPlaceholder/> component with Explore Image', () => {
            expect(wrapper.find(EmptyPlaceholder).exists()).toBe(true);
            expect(wrapper.find('img').props().src).toEqual(`//localhost:3000/${Explore}`);
        });
    });
    describe('when variant is `noResult` passes in props', () => {
        const wrapper = shallow(<EmptySearch variant="noResult" />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <EmptyPlaceholder/> component with NoResult Image', () => {
            expect(wrapper.find(EmptyPlaceholder).exists()).toBe(true);
            expect(wrapper.find('img').props().src).toEqual(`//localhost:3000/${NoResult}`);
        });
    });
});
