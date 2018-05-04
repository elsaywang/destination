import React from 'react';
import { shallow } from 'enzyme';
import AdvancedSearch from '../AdvancedSearch';
import ComboBox from '@react/react-spectrum/ComboBox';
import Switch from '@react/react-spectrum/Switch';

describe('Advanced Search', () => {
    const mockFn = jest.fn();
    const reportSuites = [
        {
            name: 'datasource-cross-media',
            integrationCode: '{"suite":"Administrator", "datacenter":"microchip"}',
            type: 'GENERAL',
            idType: 'COOKIE',
            pid: 51083,
            dataSourceIds: 1696,
        },
        {
            name: 'datasource-impactful',
            integrationCode: '{"suite":"Representative", "datacenter":"conglomeration"}',
            type: 'GENERAL',
            idType: 'COOKIE',
            pid: 52229,
            dataSourceIds: 2620,
        },
    ];
    const wrapper = shallow(
        <AdvancedSearch
            sourceName="test"
            reportSuites={reportSuites}
            enabled={false}
            onFilterChange={mockFn}
            onAdvancedSearchChange={mockFn}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Switch />', () => {
            expect(wrapper.find(Switch).exists()).toBe(true);
        });

        it('renders <ComboBox />', () => {
            expect(wrapper.find(ComboBox).exists()).toBe(true);
        });

        it('renders <ComboBox /> with disabled: true when <AdvancedSearch /> is passed enabled: false', () => {
            wrapper.setProps({ enabled: false });
            expect(wrapper.find(ComboBox).props().disabled).toBe(true);
        });

        it('renders <ComboBox /> with disabled: false when <AdvancedSearch /> is passed enabled: true', () => {
            wrapper.setProps({ enabled: true });
            expect(wrapper.find(ComboBox).props().disabled).toBe(false);
        });

        it('renders <ComboBox /> with value passed in', () => {
            wrapper.setProps({ sourceName: 'abc' });
            expect(wrapper.find(ComboBox).props().value).toBe('abc');
        });
    });
});
