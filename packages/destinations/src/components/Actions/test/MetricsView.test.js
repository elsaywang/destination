import React from 'react';
import { shallow } from 'enzyme';
import MetricsView from '../MetricsView';
import Button from '@react/react-spectrum/Button';
import Popover from '@react/react-spectrum/Popover';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import MetricsContext from '../MetricsContext';

describe('<MetricsView/> component', () => {
    describe('rendering `PEOPLE_BASED`', () => {
        const props = {
            disabled: false,
            destination: {
                destinationId: 20008,
                name: 'card',
                destinationType: 'PEOPLE_BASED',
                shareableAudience: 245123,
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

        it('renders <MetricsContext/> as <Popover/> children', () => {
            const childrenWrapper = wrapper.find(Popover).children();
            expect(childrenWrapper.find(MetricsContext).exists()).toBeTruthy();
        });
    });

    describe('rendering `S2S`', () => {
        const props = {
            disabled: false,
            destination: {
                destinationId: 2009,
                name: 'card',
                destinationType: 'S2S',
                addressableAudienceMetrics: {
                    addressableAudience: 213123,
                    matchRate: '89%',
                    lifetimeAddressableAudience: 123123,
                },
            },
        };
        const wrapper = shallow(<MetricsView {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
