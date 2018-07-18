import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wait from '@react/react-spectrum/Wait';
import SignalsTable from './SignalsTable';
import EmptySearch from './EmptySearch';
import { fetchSignals } from '../utils/fetchSignals';
import styles from './SavedSearchTable.css';

class SavedSearchTable extends Component {
    state = {
        tableResults: {},
        error: false,
        hasSearched: false,
    };

    async componentDidMount() {
        const { savedSearch } = this.props;
        const response = await fetchSignals({ search: savedSearch });

        if (response.ok) {
            const results = await response.json();

            this.setState({
                tableResults: results,
                error: false,
                hasSearched: true,
            });
        } else {
            this.setState({
                tableResults: {},
                error: true,
                hasSearched: true,
            });
        }
    }

    renderTable() {
        const { tableResults } = this.state;
        const {
            isAdvancedSearchEnabled,
            allowsSelection,
            canCreateTraits,
            savedSearch,
        } = this.props;
        const hasSearchResults = !this.state.error && tableResults.list && tableResults.list.length;
        const totalKeyValuePairs = savedSearch.keyValuePairs.length;
        const withResults = hasSearchResults && !this.state.error;

        if (withResults) {
            return (
                <SignalsTable
                    isLoaded={hasSearchResults}
                    results={tableResults.list}
                    totalKeyValuePairs={totalKeyValuePairs}
                    canCreateTraits={canCreateTraits}
                    isAdvancedSearchEnabled={isAdvancedSearchEnabled}
                    allowsSelection={allowsSelection}
                />
            );
        }

        return (
            <EmptySearch
                className={styles.noResults}
                variant={this.state.error ? 'errorFetching' : 'noResult'}
            />
        );
    }

    render() {
        return this.state.hasSearched ? this.renderTable() : <Wait />;
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
