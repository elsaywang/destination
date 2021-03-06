import { TableViewDataSource } from '@react/react-spectrum/TableView';

/**
 * Extends the react-spectrum `TableViewDataSource` and overrides the methods
 * that refer to the table items, which are stored as `this.items`.
 */
class DataSource extends TableViewDataSource {
    constructor({ items, columns, sortSearch, onLoadMore = () => {} }) {
        super();

        this.items = items;
        this.columns = columns;
        this.sortSearch = sortSearch;
        this.onLoadMore = onLoadMore;
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
    getColumns() {
        return this.columns;
    }

    sortItems(key, direction) {
        if (typeof this.sortSearch === 'function') {
            this.sortSearch({
                sortBy: key,
                sortDir: direction,
            });
        } else {
            this.items.sort((a, b) => (a[key] < b[key] ? -direction : direction));
        }
    }

    // Override
    async loadMore() {
        await this.onLoadMore();
    }

    // Override
    sort(column, direction) {
        this.sortItems(column.key, direction);
        this.reloadData();
    }
}

export default DataSource;
