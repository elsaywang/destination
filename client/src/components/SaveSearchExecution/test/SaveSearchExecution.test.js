import React, { Component } from 'react';
import Button from '@react/react-spectrum/Button';
import { shallow } from 'enzyme';
import SaveSearchExecution from '../SaveSearchExecution';
import SaveSearchExecutionContent from '../SaveSearchExecutionContent';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Popover from '@react/react-spectrum/Popover';
import Add from '@react/react-spectrum/Icon/Add';
import InlineErrorMessage from '../../../components/common/InlineErrorMessage';

describe('<SaveSearchExecution/>', () => {
    describe('rendering when no error passes in', () => {
        const mockFn = jest.fn();
        const props = {
            disabled: true,
            confirmSaveThisSearch: mockFn,
            cancelSaveSearch: mockFn,
            updateSaveSearchName: mockFn,
            trackSearchResultInDashboard: mockFn,
            selectDefaultSorting: mockFn,
            changeSortingOrder: mockFn,
            error: {
                hasError: false,
                errorMessage: '',
            },
        };
        const wrapper = shallow(<SaveSearchExecution {...props} />);
        const children = wrapper.find(ModalTrigger).children();

        it('matches the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should not render <InlineErrorMessage/>', () => {
            expect(wrapper.find(InlineErrorMessage).exists()).toBeFalsy();
        });

        it('renders <ModalTrigger/>', () => {
            expect(wrapper.find(ModalTrigger).exists()).toBeTruthy();
        });

        it('<ModalTrigger/> including children <Button/> and <Dialog/>', () => {
            expect(children.find(Button).exists()).toBeTruthy();
            expect(children.find(Dialog).exists()).toBeTruthy();
        });

        it('child <Dialog/> includes corrent content <SaveSearchExecutionContent/>', () => {
            expect(
                children
                    .find(Dialog)
                    .find(SaveSearchExecutionContent)
                    .exists(),
            ).toBeTruthy();
        });

        it('Trigger <Button/> should be disabled when prop `disabled` is passed in as true', () => {
            expect(children.find(Button).props().disabled).toBeTruthy();
        });

        it('Trigger <Button/> should be active when prop `disabled` is passed in as false', () => {
            wrapper.setProps({ disabled: false });
            const updatedChildren = wrapper.find(ModalTrigger).children();
            expect(updatedChildren.find(Button).props().disabled).toBeFalsy();
        });
    });

    describe('rendering when error passes in', () => {
        const mockFn = jest.fn();
        const props = {
            disabled: false,
            error: {
                hasError: true,
                errorMessage: 'Invalid Method',
            },
        };
        const wrapper = shallow(<SaveSearchExecution {...props} />);

        it('matches the snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should render <InlineErrorMessage/>', () => {
            expect(wrapper.find(InlineErrorMessage).exists()).toBeTruthy();
        });

        it('shoud not render <ModalTrigger/>', () => {
            expect(wrapper.find(ModalTrigger).exists()).toBeFalsy();
        });

        it('shoud not render <Button/> and <Dialog/>', () => {
            expect(wrapper.find(Button).exists()).toBeFalsy();
            expect(wrapper.find(Dialog).exists()).toBeFalsy();
        });

        it('shoud not render <SaveSearchExecutionContent/>', () => {
            expect(wrapper.find(SaveSearchExecutionContent).exists()).toBeFalsy();
        });
    });
});

//TODO:ADD BACK once OverlayTrigger and PopOver are updated
xdescribe('<SaveSearchExecution/>', () => {
    const wrapper = shallow(<SaveSearchExecution />);
    const children = wrapper.find(OverlayTrigger).children();
    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders <OverlayTrigger/>', () => {
        expect(wrapper.find(OverlayTrigger).exists()).toBeTruthy();
    });

    it('<OverlayTrigger/> including children <Button/> and <Popover/>', () => {
        expect(children.find(Button).exists()).toBeTruthy();
        expect(children.find(Popover).exists()).toBeTruthy();
    });

    it('child <Popover/> includes corrent content <SaveSearchExecutionContent/>', () => {
        expect(
            children
                .find(Popover)
                .find(SaveSearchExecutionContent)
                .exists(),
        ).toBeTruthy();
    });
});
