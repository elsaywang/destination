import React from 'react';
import { shallow } from 'enzyme';
import AdvancedSearch from '../components/AdvancedSearch';
import Select from '@react/react-spectrum/Select';
import Switch from '@react/react-spectrum/Switch';

describe('Advanced Search', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
        <AdvancedSearch enabled={false} onFilterChange={mockFn} onAdvancedSearchChange={mockFn} />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Switch />', () => {
            expect(wrapper.find(Switch).exists()).toBe(true);
        });

        it('renders <Select />', () => {
            expect(wrapper.find(Select).exists()).toBe(true);
        });

        it('renders <Select /> with disabled: true when <AdvancedSearch /> is passed enabled: false', () => {
            wrapper.setProps({ enabled: false });
            expect(wrapper.find(Select).props().disabled).toBe(true);
        });

        it('renders <Select /> with disabled: false when <AdvancedSearch /> is passed enabled: true', () => {
            wrapper.setProps({ enabled: true });
            expect(wrapper.find(Select).props().disabled).toBe(false);
        });
    });
});
