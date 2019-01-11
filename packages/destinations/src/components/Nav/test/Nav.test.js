import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../Nav';
import { NavLink } from 'react-router-dom';
import { Tab, TabList } from '@react/react-spectrum/TabList';

describe('<Nav/> component', () => {
    describe('rendering', () => {
        const props = {
            routes: [
                { route: '/', name: '' },
                { route: '/destinations', name: 'People-Based' },
                { route: '/deviceBased', name: 'Device-Based' },
                { route: '/cookieBased', name: 'Cookie-Based' },
                { route: '/urlBased', name: 'URL-Based' },
                { route: '/adobeExperienceCloud', name: 'Adobe Experience Cloud' },
            ],
        };
        const wrapper = shallow(<Nav {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Tab> and <TabList>', () => {
            expect(wrapper.find(Tab)).toBeTruthy();
            expect(wrapper.find(TabList)).toBeTruthy();
        });

        it('renders <NavLink/>', () => {
            expect(wrapper.find(NavLink)).toBeTruthy();
        });
    });
});
