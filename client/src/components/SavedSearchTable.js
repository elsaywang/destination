import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignalsTable from './SignalsTable';
import withLoadingSpinner from './withLoadingSpinner';
import { fetchSignals } from '../utils/fetchSignals';

class SavedSearchTable extends Component {
    state = {
        tableResults: {},
        error: '',
    };

    async componentDidMount() {
        const { savedSearch, getResultsBySavedSearch } = this.props;
        const results = await fetchSignals({ search: savedSearch });
        const list = await results.json();

        this.setState({ tableResults: list });
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

        return (
            <WrappedSignalsTable
                isLoaded={hasSearchResults}
                results={tableResults}
                totalKeyValuePairs={totalKeyValuePairs}
                canCreateTraits={canCreateTraits}
                isAdvancedSearchEnabled={isAdvancedSearchEnabled}
                allowsSelection={allowsSelection}
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
