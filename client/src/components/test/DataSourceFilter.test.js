import React from 'react';
import { shallow } from 'enzyme';
import Select from '@react/react-spectrum/Select';
import DataSourceFilter from '../DataSourceFilter';

describe('<DataSourceFilter /> component', () => {
    const mockFn = jest.fn();
    const props = {
        signalType: 'ONBOARDED',
        onDataSourceSelect: mockFn,
        dataSources: [],
        selectedDataSource: '',
    };
    const wrapper = shallow(<DataSourceFilter {...props} />);
    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Select />', () => {
            expect(wrapper.find(Select).exists()).toBeTruthy();
        });

        it('renders <Select /> with datasources props passed in', () => {
            wrapper.setProps({
                dataSources: [
                    { dataSourceId: 167507, name: 'Test Datasource: 1535390150786140362' },
                ],
            });
            expect(wrapper.find(Select).props().options).toEqual([
                {
                    label: 'Test Datasource: 1535390150786140362 (167507)',
                    value: 'Test Datasource: 1535390150786140362 (167507)',
                },
            ]);
        });
    });
});
