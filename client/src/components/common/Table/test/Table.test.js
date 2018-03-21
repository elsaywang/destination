import React from 'react';
import { shallow } from 'enzyme';
import { TableView } from '@react/react-spectrum/TableView';
import Table from '../Table';

describe('<Table /> component', () => {
    const items = [
        {
            name: 'Coffee',
            description: 'Good dog',
        },
        {
            name: 'Mongo',
            description: 'Bad dog',
        },
    ];
    const columns = [
        {
            title: 'Name',
            key: 'name',
        },
        {
            title: 'Description',
            key: 'description',
        },
    ];
    const renderCell = (column, data) => <span>{data}</span>;

    const wrapper = shallow(<Table items={items} columns={columns} renderCell={renderCell} />);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <TableView />', () => {
            expect(wrapper.find(TableView).exists()).toBe(true);
        });
        it('passes the `renderCell` prop to the <TableView />', () => {
            expect(wrapper.find(TableView).prop('renderCell')).toEqual(renderCell);
        });
    });
    describe('created data source for the table', () => {
        const dataSource = wrapper.find(TableView).prop('dataSource');

        it('should implement a `getColumns` method that returns the `columns` prop', () => {
            expect(dataSource.getColumns()).toEqual(columns);
        });

        it('should be constructed with the `items` prop', () => {
            expect(dataSource.items).toEqual(items);
        });
    });
    describe('table height', () => {
        it('should be set on a parent element that wraps the <TableView />', () => {
            expect(wrapper.find('.table-wrapper').prop('style')).toHaveProperty('height');
        });

        describe('getTableHeight', () => {
            const { getTableHeight } = new Table();

            it('should return a string ending in px', () => {
                expect(getTableHeight(items).substr(-2)).toEqual('px');
            });

            it('should return the amount of pixels that exactly fits the amount of rows in the table', () => {
                expect(getTableHeight(items)).toEqual('136px');
            });

            it('should return a maximum height if more rows than `maxRows` are passed in', () => {
                expect(getTableHeight(new Array(15))).toEqual('520px');
            });

            it('should return a maximum height if more rows than a custom `maxRows` are passed in', () => {
                expect(getTableHeight(items, 1)).toEqual('88px');
            });

            // TODO
            // it('should return the amount of pixels that exactly fits the empty-state table when no items are passed in', () => {});
        });
    });
});