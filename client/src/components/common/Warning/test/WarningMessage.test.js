import React from 'react';
import { shallow } from 'enzyme';
import WarningMessage from '../WarningMessage';

describe('<WarningMessage/> component', () => {
    describe('rendering', () => {
        const { content } = 'there is a warning !';
        const wrapper = shallow(<WarningMessage {...content} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('passes `content` props with correct message into a <span>', () => {
            expect(wrapper.containsMatchingElement(<span>{content}</span>)).toBeTruthy();
        });
    });
});
