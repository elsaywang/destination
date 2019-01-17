import React from 'react';
import { shallow } from 'enzyme';
import EmptyState, { PrimaryMessage, SecondaryMessage } from '../EmptyState';
import DefaultEmptyStateIcon from '../DefaultEmptyStateIcon';

describe('rendering', () => {
    const props = {
        primaryMessage: 'Start adding accounts to enable people based destinations',
        secondaryMessage: '',
    };
    const wrapper = shallow(<EmptyState {...props} />);

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render <DefaultEmptyStateIcon/> as default icon', () => {
        expect(wrapper.find(DefaultEmptyStateIcon)).toBeTruthy();
    });
    
    it('should always contain <PrimaryMessage/>', () => {
        expect(wrapper.find(PrimaryMessage)).toBeTruthy();
    });

    it('should <SecondaryMessage/> as  `secondaryMessage` props has no value', () => {
        expect(wrapper.find(SecondaryMessage)).toBeTruthy();
    });
});
