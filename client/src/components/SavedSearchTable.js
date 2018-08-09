import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wait from '@react/react-spectrum/Wait';
import SignalsTable from './SignalsTable';
import EmptySearch from './EmptySearch';
import { handleList } from '../reducers/results';
import { fetchSignals } from '../utils/fetchSignals';
import styles from './SavedSearchTable.css';

class SavedSearchTable extends Component {
    state = {
        list: [],
        error: false,
        hasSearched: false,
    };

    async componentDidMount() {
        const { savedSearch } = this.props;
        const response = await fetchSignals({ search: savedSearch });

        if (response.ok) {
            const results = await response.json();

            this.setState({
                list: handleList(results.list),
                error: false,
                hasSearched: true,
            });
        } else {
            this.setState({
                list: [],
                error: true,
                hasSearched: true,
            });
        }
    }

    renderTable() {
        const { list } = this.state;
        const { isAdvancedSearchEnabled, allowsSelection, canCreateTraits } = this.props;
        const hasSearchResults = !this.state.error && list && list.length;
        const withResults = hasSearchResults && !this.state.error;

        if (withResults) {
            return (
                <SignalsTable
                    isLoaded={hasSearchResults}
                    results={list}
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
    isAdvancedSearchEnabled: PropTypes.bool,
    allowsSelection: PropTypes.bool,
    canCreateTraits: PropTypes.bool,
};

export default SavedSearchTable;
