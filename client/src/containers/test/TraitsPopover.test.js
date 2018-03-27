import React from 'react';
import { shallow } from 'enzyme';
import TraitsPopover from '../TraitsPopover';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import Link from '@react/react-spectrum/Link';
import Button from '@react/react-spectrum/Button';
import Wait from '@react/react-spectrum/Wait';

describe('<TraitsPopover /> component', () => {
    const wrapper = shallow(<TraitsPopover sids={[1, 2, 3]} />);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <OverlayTrigger /> with <Button /> and <Popover /> children', () => {
            const overlayTrigger = wrapper.find(OverlayTrigger);

            expect(overlayTrigger.filter('[data-test="overlay-trigger"]').exists()).toBe(true);
            expect(overlayTrigger.find(Button).exists()).toBe(true);
            expect(overlayTrigger.find(Popover).exists()).toBe(true);
        });

        it('renders <Button /> trigger with correct Trait(s) labeling', () => {
            wrapper.setProps({
                sids: [1, 2],
            });

            expect(
                wrapper
                    .find(Button)
                    .filter('[data-test="overlay-trigger-button"]')
                    .html(),
            ).toContain('2 Traits');

            wrapper.setProps({
                sids: [1],
            });

            expect(
                wrapper
                    .find(Button)
                    .filter('[data-test="overlay-trigger-button"]')
                    .html(),
            ).toContain('1 Trait');
        });

        it('renders <Popover /> title with correct "Included in x Trait(s)" labeling', () => {
            wrapper.setProps({
                sids: [1, 2],
            });

            expect(wrapper.find(Popover).props().title).toContain('Included in 2 Traits');

            wrapper.setProps({
                sids: [1],
            });

            expect(wrapper.find(Popover).props().title).toContain('Included in 1 Trait');
        });

        it('renders <Wait /> when loading', () => {
            wrapper.setState({
                loading: true,
            });

            expect(wrapper.find(Wait).exists()).toBe(true);
        });

        it('renders content in Popover when not loading', () => {
            wrapper.setState({
                loading: false,
                traits: [{ id: 1, name: 'i am a trait' }],
            });

            expect(wrapper.find(Wait).exists()).toBe(false);
            expect(
                wrapper
                    .find(Popover)
                    .filter('[data-test="overlay-trigger-popover"]')
                    .find(Link).length,
            ).toBe(1);
            expect(
                wrapper
                    .find(Popover)
                    .filter('[data-test="overlay-trigger-popover"]')
                    .html(),
            ).toContain('i am a trait');
        });
    });
});
