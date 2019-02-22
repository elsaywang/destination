import React from 'react';
import { shallow } from 'enzyme';
import DeleteAction from '../DeleteAction';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Button from '@react/react-spectrum/Button';

describe('<DeleteAction/> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const props = {
            handleDelete: mockFn,
            id: 20008,
            name: 'card',
            type: 'destination',
        };
        const wrapper = shallow(<DeleteAction {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <ModalTrigger/> with <Button/> and <Dialog/> children', () => {
            expect(wrapper.find(ModalTrigger).exists()).toBeTruthy();
            const childrenWrapper = wrapper.find(ModalTrigger).children();
            expect(childrenWrapper.find(Button).exists()).toBeTruthy();
            expect(childrenWrapper.find(Dialog).exists()).toBeTruthy();
        });
    });
});
