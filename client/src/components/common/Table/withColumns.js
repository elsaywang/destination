/**
 * Quasi-HOC that wraps the above `DataSource` class (which extends the
 * react-spectrum `TableViewDataSource` class) to return dynamic columns.
 */
function withColumns(DataSource, columns) {
    return class extends DataSource {
        // Override for `TableViewDataSource`
        getColumns() {
            return columns;
        }
    };
}

export default withColumns;
