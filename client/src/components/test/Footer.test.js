import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('<Footer/> component', () => {
    const wrapper = shallow(<Footer />);
    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should have 4 footer items link', () => {
            expect(wrapper.find('a').length).toEqual(4);
        });

        it('should have 1 lable for `footerLanguage`', () => {
            expect(wrapper.find('label').length).toEqual(1);
            expect(wrapper.find('[htmlFor="footerLanguage"]').length).toEqual(1);
        });

        it('should have 1 footerCopyRight element', () => {
            expect(wrapper.find('div.footerCopyRight').length).toEqual(1);
        });
    });
});
