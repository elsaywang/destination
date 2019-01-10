import React from 'react';
import { shallow } from 'enzyme';
import DropdownMenu from '../DropdownMenu';
import { Menu, MenuItem } from '@react/react-spectrum/Menu';
import Dropdown from '@react/react-spectrum/Dropdown';
import Button from '@react/react-spectrum/Button';

describe('<DropdownMenu/> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const props = {
            title: 'Create Destinations',
            onDropdownSelect: mockFn,
            selectedValue: 'integratedPartner',
            menuOptions: [
                {
                    value: 'experienceCloudActivation',
                    label: 'Experience Cloud Activation',
                },
                {
                    value: 'integratedPartner',
                    label: 'Integrated Partner',
                },
                { value: 'customerActivation', label: 'Customer Activation' },
            ],
        };
        const wrapper = shallow(<DropdownMenu {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Button/> ', () => {
            expect(wrapper.find(Button).exists()).toBeTruthy();
        });

        it('renders <Menu/> and <MenuItem/> ', () => {
            expect(wrapper.find(Menu).exists()).toBeTruthy();
            expect(wrapper.find(MenuItem).exists()).toBeTruthy();
        });
    });
});
