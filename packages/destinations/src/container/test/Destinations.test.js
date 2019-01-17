import React from 'react';
import { shallow } from 'enzyme';
import { Destinations } from '../Destinations';
import Table from '../../components/Table';
import SideNavFilter from '../../components/SideNavFilter';

describe('renders <App/> without crashing', () => {
    const props = {
        fetchDestinations: () => {
            /* no-op */
        },
        destinations: {
            list: [
                {
                    action: '',
                    description: 'Maxime ut totam nemo assumenda ratione impedit.',
                    id: 0,
                    name: 'input',
                    platform: 'Twitter',
                    shareableAudience: 41898,
                },
                {
                    action: '',
                    description: 'Et nesciunt voluptatibus facilis blanditiis.',
                    id: 1,
                    name: 'Bedfordshire',
                    platform: 'Google',
                    shareableAudience: 18751,
                },
                {
                    action: '',
                    description: 'Repellat sit dolor ut quisquam et ducimus.',
                    id: 2,
                    name: 'Shoes',
                    platform: 'Twitter',
                    shareableAudience: 5434,
                },
                {
                    action: '',
                    description: 'Blanditiis tenetur culpa aut distinctio.',
                    id: 3,
                    name: 'mesh',
                    platform: 'LinkedIn',
                    shareableAudience: 40918,
                },
            ],
            requestInFlight: false,
        },
        destinationType: 'Integrated Platforms',
    };
    const wrapper = shallow(<Destinations {...props} />);
    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <Table/>', () => {
            expect(wrapper.find(Table).exists()).toBeTruthy();
        });
        it('renders <SideNavFilter/> when `destinationType` is `Integrated Platforms`', () => {
            expect(wrapper.find(SideNavFilter).exists()).toBeTruthy();
        });
        it('renders no <SideNavFilter/> when `destinationType` is non-`Integrated Platforms`', () => {
            wrapper.setProps({ destinationType: 'Adobe Experience Cloud' });
            expect(wrapper.find(SideNavFilter).exists()).toBeFalsy();
        });
    });
});
