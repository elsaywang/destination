import React from 'react';
import { shallow } from 'enzyme';
import Activation from '../Activation';
import AddAccountModal from '../../AddAccountModal';

describe('<Activation/> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const props = {
            authentication: {
                adAccountId: '1',
                accountName: 'test',
                expireIn: 'Expired',
            },
            addAccount: mockFn,
        };
        const wrapper = shallow(<Activation {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <AddAccountModal/> modal', () => {
            expect(wrapper.find(AddAccountModal).exists()).toBeTruthy();
        });
    });
});
