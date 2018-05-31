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
        const { isAdvancedSearchEnabled, allowsSelection } = this.props;
        const hasSearchResults = Boolean(Object.keys(tableResults).length);
        const WrappedSignalsTable = withLoadingSpinner(SignalsTable);

        return (
            <WrappedSignalsTable
                isLoaded={hasSearchResults}
                results={tableResults}
                {...{ isAdvancedSearchEnabled, allowsSelection }}
            />
        );
    }
}

SavedSearchTable.propTypes = {
    savedSearch: PropTypes.object,
    getResultsBySavedSearch: PropTypes.func,
    isAdvancedSearchEnabled: PropTypes.bool,
    allowsSelection: PropTypes.bool,
};

export default SavedSearchTable;
