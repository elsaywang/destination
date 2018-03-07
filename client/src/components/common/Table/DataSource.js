import { TableViewDataSource } from '@react/react-spectrum/TableView';

/**
 * Extends the react-spectrum `TableViewDataSource` and overrides the methods
 * that refer to the table items, which are stored as `this.items`.
 */
class DataSource extends TableViewDataSource {
    constructor({ items }) {
        super();

        this.items = items;
    }
    // Override
    getNumberOfRows() {
        return this.items.length;
    }
    // Override
    getCell(column, row) {
        return this.items[row][column.key];
    }
    // Override
    sort(column, direction) {
        this.items.sort((a, b) => (a[column.key] < b[column.key] ? -direction : direction));

        this.reloadData();
    }
}

export default DataSource;
