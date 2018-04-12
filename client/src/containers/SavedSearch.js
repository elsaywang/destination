import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from '@react/react-spectrum/Heading';
import SavedSearchTagList from '../components/SavedSearchTagList';
import withLoadingSpinner from '../components/withLoadingSpinner';

class SavedSearch extends Component {
    componentDidMount() {
        this.props.getSavedSearch();
    }

    render() {
        const WrappedSavedSearchTagList = withLoadingSpinner(SavedSearchTagList);

        return (
            <div data-test="saved-search">
                <Heading size={6}>Saved Search</Heading>
                <WrappedSavedSearchTagList
                    isLoaded={Boolean(this.props.list.length)}
                    list={this.props.list}
                />
            </div>
        );
    }
}

SavedSearch.propTypes = {
    list: PropTypes.array.isRequired,
    getSavedSearch: PropTypes.func.isRequired,
};

export default SavedSearch;
