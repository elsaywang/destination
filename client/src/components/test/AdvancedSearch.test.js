import React from 'react';
import { shallow } from 'enzyme';
import AdvancedSearch from '../AdvancedSearch';
import ComboBox from '@react/react-spectrum/ComboBox';

describe('Advanced Search', () => {
    const mockFn = jest.fn();
    const reportSuites = [
        {
            dataSourceId: 168815,
            pid: 1194,
            name: 'Test Report Suite Edited1505153440289',
            suite: 'test-report-suite-edited1505153440289',
            datacenter: 'sin',
        },
        {
            dataSourceId: 169626,
            pid: 1194,
            name: 'Test Report Suite Edited1505154745046',
            suite: 'test-report-suite-edited1505154745046',
            datacenter: 'sin',
        },
    ];
    const wrapper = shallow(
        <AdvancedSearch
            sourceName="test"
            reportSuites={reportSuites}
            enabled={false}
            onReportSuiteChange={mockFn}
            onReportSuiteSelect={mockFn}
            onAdvancedSearchChange={mockFn}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
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
