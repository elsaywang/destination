import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table';
import { TableView } from '@react/react-spectrum/TableView';

describe('<Table/> component', () => {
    describe('rendering', () => {
        const sort = jest.fn();

        const props = {
            renderCell: (column, data) => {
                return <span>{data[column.key]}</span>;
            },
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    width: 50,
                    sortable: true,
                },
                {
                    title: 'Name',
                    key: 'name',
                    width: 50,
                    sortable: true,
                },
                {
                    title: 'Icons',
                    key: 'icons',
                    width: 50,
                    sortable: false,
                },
            ],
            onSortChange: sort,
        };

        const wrapper = shallow(<Table {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <TableView>', () => {
            expect(wrapper.find(TableView)).toBeTruthy();
        });
    });
});
