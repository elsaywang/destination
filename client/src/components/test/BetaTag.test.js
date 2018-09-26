import React from 'react';
import { shallow } from 'enzyme';
import BetaTag from '../../components/common/BetaTag';
import { Tag } from '@react/react-spectrum/TagList';

describe('<BetaTag/> component', () => {
    const wrapper = shallow(<BetaTag />);
    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should have <Tag/> component', () => {
            expect(wrapper.find(<Tag />)).toBeTruthy();
        });
    });
});
