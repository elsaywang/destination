import React from 'react';
import { shallow } from 'enzyme';
import Activation from '../Activation';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Popover from '@react/react-spectrum/Popover';
import Button from '@react/react-spectrum/Button';
import Well from '@react/react-spectrum/Well';

describe('<Activation/> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const props = {
            authentication: {
                adAccountId: 1,
                accountName: 'test',
                expireIn: 'Expired',
            },
            addAccount: mockFn,
        };
        const wrapper = shallow(<Activation {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <ModalTrigger/> with <Button/> and <Dialog/> children', () => {
            expect(wrapper.find(ModalTrigger).exists()).toBeTruthy();
            const childrenWrapper = wrapper.find(ModalTrigger).children();
            expect(childrenWrapper.find(Button).exists()).toBeTruthy();
            expect(childrenWrapper.find(Dialog).exists()).toBeTruthy();
        });

        it('renders additional wrapped children component if there is one', () => {
            const wrapperWtihChildren = shallow(
                <Activation {...props}>
                    <Well />
                </Activation>,
            ).children();
            expect(wrapperWtihChildren.find(Well).exists()).toBeTruthy();
        });
    });
});
