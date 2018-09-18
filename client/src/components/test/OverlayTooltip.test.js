import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from '@react/react-spectrum/Tooltip';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Info from '@react/react-spectrum/Icon/Info';
import OverlayTooltip from '../../components/common/OverlayTooltip';
import Button from '@react/react-spectrum/Button';

describe('<OverlayTooltip /> component', () => {
    const message = 'You may save up to 10 searches';

    describe('when message is passed as props ', () => {
        const wrapper = shallow(<OverlayTooltip message={message} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <OverlayTooltip /> component', () => {
            expect(wrapper.find('[data-test="overlay-tooltip"]').exists()).toBeTruthy();
        });

        it('renders <OverlayTrigger/> component', () => {
            expect(wrapper.find(OverlayTrigger).exists()).toBeTruthy();
        });

        it('renders <Button/> with Info icon', () => {
            expect(wrapper.find(Button).exists()).toBeTruthy();
            expect(wrapper.find(Button).props().icon).toEqual(<Info size="S" />);
        });

        it('renders <Tooltip/> with message', () => {
            expect(wrapper.find(Tooltip).exists()).toBeTruthy();
            expect(wrapper.find(Tooltip).containsMatchingElement({ message })).toBeTruthy();
        });
    });
});
