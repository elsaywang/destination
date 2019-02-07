import React from 'react';
import { shallow } from 'enzyme';
import AddAccountModal from '../AddAccountModal';

describe('<AddAccountModal/> component', () => {
    describe('rendering', () => {
        const wrapper = shallow(<AddAccountModal />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
