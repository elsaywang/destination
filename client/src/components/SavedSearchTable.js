import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignalsTable from './SignalsTable';
import EmptySearch from './EmptySearch';
import withLoadingSpinner from './withLoadingSpinner';
import { fetchSignals } from '../utils/fetchSignals';
import styles from './SavedSearchTable.css';

class SavedSearchTable extends Component {
    state = {
        tableResults: {},
        error: false,
    };

    async componentDidMount() {
        const { savedSearch } = this.props;

        try {
            const response = await fetchSignals({ search: savedSearch });

            if (response.ok) {
                const list = await response.json();

                this.setState({
                    tableResults: list,
                    error: false,
                });
            }
        } catch (error) {
            this.setState({
                tableResults: {},
                error: true,
            });
        }
    }

    render() {
        const { tableResults } = this.state;
        const {
            isAdvancedSearchEnabled,
            allowsSelection,
            canCreateTraits,
            savedSearch,
        } = this.props;
        const hasSearchResults = Boolean(Object.keys(tableResults).length);
        const WrappedSignalsTable = withLoadingSpinner(SignalsTable);
        const totalKeyValuePairs = savedSearch.keyValuePairs.length;

        return hasSearchResults && !this.state.error ? (
            <WrappedSignalsTable
                isLoaded={hasSearchResults}
                results={tableResults}
                totalKeyValuePairs={totalKeyValuePairs}
                canCreateTraits={canCreateTraits}
                isAdvancedSearchEnabled={isAdvancedSearchEnabled}
                allowsSelection={allowsSelection}
            />
        ) : (
            <EmptySearch
                className={styles.noResults}
                variant={this.state.error ? 'errorFetching' : 'noResult'}
            />
        );
    }
}

SavedSearchTable.propTypes = {
    savedSearch: PropTypes.object,
    getResultsBySavedSearch: PropTypes.func,
    isAdvancedSearchEnabled: PropTypes.bool,
    allowsSelection: PropTypes.bool,
    canCreateTraits: PropTypes.bool,
};

export default SavedSearchTable;
