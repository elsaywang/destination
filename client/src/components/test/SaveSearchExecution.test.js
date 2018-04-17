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

describe('<SaveSearchExecution/>', () => {
    const wrapper = shallow(<SaveSearchExecution />);
    const children = wrapper.find(ModalTrigger).children();
    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders <ModalTrigger/>', () => {
        expect(wrapper.find(ModalTrigger).exists()).toBeTruthy();
    });

    it('<ModalTrigger/> including children <Button/> and <Dialog/>', () => {
        expect(children.find(Button).exists()).toBeTruthy();
        expect(children.find(Dialog).exists()).toBeTruthy();
    });

    it('child <Button/> passes corrent props `label,variant,quiet,icon`', () => {
        expect(children.find(Button).props().label).toEqual('Save This Search');
        expect(children.find(Button).props().variant).toEqual('action');
        expect(children.find(Button).props().quiet).toBeTruthy();
        expect(children.find(Button).props().icon).toEqual(<Add />);
    });

    it('child <Dialog/> includes corrent content <SaveSearchExecutionContent/>', () => {
        expect(
            children
                .find(Dialog)
                .find(SaveSearchExecutionContent)
                .exists(),
        ).toBeTruthy();
    });

    //TODO:ADD BACK once OverlayTrigger and PopOver are updated
    // xit('renders <OverlayTrigger/>', () => {
    //     expect(wrapper.find(OverlayTrigger).exists()).toBeTruthy();
    // });
    //
    // xit('<OverlayTrigger/> passes correct props `trigger, placement`', () => {
    //     expect(wrapper.find(OverlayTrigger).props().trigger).toEqual('click');
    //     expect(wrapper.find(OverlayTrigger).props().placement).toEqual('bottom');
    // });
    //
    // xit('<OverlayTrigger/> including children <Button/> and <Popover/>', () => {
    //     expect(children.find(Button).exists()).toBeTruthy();
    //     expect(children.find(Popover).exists()).toBeTruthy();
    // });
    //
    // xit('child <Button/> passes corrent props `label,variant,quiet,icon`', () => {
    //     expect(children.find(Button).props().label).toEqual('Save This Search');
    //     expect(children.find(Button).props().variant).toEqual('action');
    //     expect(children.find(Button).props().quiet).toBeTruthy();
    //     expect(children.find(Button).props().icon).toEqual(<Add />);
    // });
    //
    // xit('child <Popover/> includes corrent content <SaveSearchExecutionContent/>', () => {
    //     expect(
    //         children
    //             .find(Popover)
    //             .find(SaveSearchExecutionContent)
    //             .exists(),
    //     ).toBeTruthy();
    // });
});
