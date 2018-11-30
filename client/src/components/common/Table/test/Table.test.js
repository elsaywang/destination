import React from 'react';
import { shallow } from 'enzyme';
import { TableView } from '@react/react-spectrum/TableView';
import Table from '../Table';
import { defaultRowHeight } from '../../../../constants/rows';

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
    const sortSearch = jest.fn();
    const selectedRowIndexes = [0];
    const onSelectionChange = jest.fn();
    const onLoadMore = jest.fn();
    const wrapper = shallow(
        <Table
            items={items}
            columns={columns}
            renderCell={renderCell}
            sortSearch={sortSearch}
            onLoadMore={onLoadMore}
            onSelectionChange={onSelectionChange}
            selectedRowIndexes={selectedRowIndexes}
        />,
    );

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
        it('passes the `onSelectionChange` prop to the <TableView />', () => {
            expect(wrapper.find(TableView).prop('onSelectionChange')).toEqual(onSelectionChange);
        });
    });
    describe('shouldComponentUpdate', () => {
        it('should return false if `nextProps` has different `selectedRowIndexes` than `this.props`', () => {
            const actual = wrapper.instance().shouldComponentUpdate({ selectedRowIndexes: [0, 1] });

            expect(actual).toBeFalsy();
        });

        it('should return true if `nextProps` has the same `selectedRowIndexes` as `this.props`', () => {
            const actual = wrapper.instance().shouldComponentUpdate({ selectedRowIndexes: [0] });

            expect(actual).toBeTruthy();
        });

        it('should return true if `selectedRowIndexes` props is undefined ', () => {
            wrapper.setProps({ selectedRowIndexes: undefined });
            const actual = wrapper
                .instance()
                .shouldComponentUpdate({ selectedRowIndexes: undefined });

            expect(actual).toBeTruthy();
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
            const { getTableHeight } = wrapper.instance();

            it('should return a string ending in px', () => {
                expect(getTableHeight({ items }).substr(-2)).toEqual('px');
            });

            it('should return the amount of pixels that exactly fits the amount of rows in the table', () => {
                expect(getTableHeight({ items })).toEqual('130px');
            });

            it('should return a maximum height if more rows than `maxRows` are passed in', () => {
                expect(getTableHeight({ items: new Array(15) })).toEqual('442px');
            });

            it('should return a maximum height if more rows than a custom `maxRows` are passed in', () => {
                expect(getTableHeight({ items, maxRows: 1 })).toEqual('82px');
            });

            it('should return the amount of pixels that fits the amount of rows and based on the custom `rowHeight` passed in', () => {
                expect(getTableHeight({ items, rowHeight: 50 })).toEqual('134px');
            });
        });
    });
});
