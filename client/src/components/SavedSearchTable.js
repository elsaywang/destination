import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignalsTable from './SignalsTable';
import withLoadingSpinner from './withLoadingSpinner';

class SavedSearchTable extends Component {
    state = {
        tableResults: {},
        error: '',
    };

    setStateAsync(state, ms) {
        return new Promise(
            resolve => (this.timerHandle = setTimeout(() => resolve(this.setState(state)), ms)),
        );
    }

    async componentDidMount() {
        try {
            const { savedSearch, getResultsBySavedSearch } = this.props;
            const results = await getResultsBySavedSearch(savedSearch);
            await this.setStateAsync({ tableResults: results.value }, 1000);
        } catch (error) {
            await this.setStateAsync(
                {
                    error,
                },
                1000,
            );
        }
    }

    componentWillUnmount() {
        // Need to cancle asynchronous task in the componentWillUnmount method when user exits the current view before data is loaded
        // Or else it will be warning: Can't call setState (or forceUpdate) on an unmounted component.
        clearTimeout(this.timerHandle);
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
