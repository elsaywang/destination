import React from 'react';
import { shallow } from 'enzyme';
import MetricsView from '../MetricsView';
import Button from '@react/react-spectrum/Button';
import Popover from '@react/react-spectrum/Popover';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';

describe('<MetricsView/> component', () => {
    describe('rendering', () => {
        const props = {
            disabled: false,
            destination: {
                id: 20008,
                name: 'card',
                type: 'People-Based',
                shareableAudience: 245123,
                addressableAudience: 213123,
                matchRate: '89%',
                lifetimeAddressableAudience: 123123,
            },
        };
        const wrapper = shallow(<MetricsView {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <OverlayTrigger/>', () => {
            expect(wrapper.find(OverlayTrigger).exists()).toBeTruthy();
        });

        it('renders <Button/> and <Popover/> as <OverlayTrigger/> children ', () => {
            const childrenWrapper = wrapper.find(OverlayTrigger).children();
            expect(childrenWrapper.find(Button).exists()).toBeTruthy();
            expect(childrenWrapper.find(Popover).exists()).toBeTruthy();
        });
    });
});
