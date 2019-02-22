import React from 'react';
import { shallow } from 'enzyme';
import { Destinations } from '../Destinations';
import Table from '../../components/Table';
import SideNavFilter from '../../components/SideNavFilter';
import { routes } from '../../constants/navTab';

describe('renders <App/> without crashing', () => {
    const noOp = () => {};
    const props = {
        fetchDestinations: noOp,
        fetchMoreDestinations: noOp,
        applyFilter: noOp,
        destinations: {
            byIds: {
                0: {
                    action: '',
                    description: 'Maxime ut totam nemo assumenda ratione impedit.',
                    id: 0,
                    name: 'input',
                    platform: 'Twitter',
                    shareableAudience: 41898,
                },
                1: {
                    action: '',
                    description: 'Et nesciunt voluptatibus facilis blanditiis.',
                    id: 1,
                    name: 'Bedfordshire',
                    platform: 'Google',
                    shareableAudience: 18751,
                },
                2: {
                    action: '',
                    description: 'Repellat sit dolor ut quisquam et ducimus.',
                    id: 2,
                    name: 'Shoes',
                    platform: 'Twitter',
                    shareableAudience: 5434,
                },
                3: {
                    action: '',
                    description: 'Blanditiis tenetur culpa aut distinctio.',
                    id: 3,
                    name: 'mesh',
                    platform: 'LinkedIn',
                    shareableAudience: 40918,
                },
            },
            idsToDisplay: [0, 1, 2, 3],
            replacementDataInFlight: false,
        },
        currentDestination: routes.find(({ name }) => name === 'Integrated Platforms'),
    };
    const wrapper = shallow(<Destinations {...props} />);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <Table/>', () => {
            expect(wrapper.find(Table).exists()).toBeTruthy();
        });
        it('renders <SideNavFilter/> when `currentDestination` name is `Integrated Platforms`', () => {
            expect(wrapper.find(SideNavFilter).exists()).toBeTruthy();
        });
        it('renders no <SideNavFilter/> when `currentDestination` name is non-`Integrated Platforms`', () => {
            const nonIntegratedPlatform = routes.find(
                ({ name }) => name && name !== 'Integrated Platforms',
            );
            wrapper.setProps({ currentDestination: nonIntegratedPlatform });
            expect(wrapper.find(SideNavFilter).exists()).toBeFalsy();
        });
    });
});
