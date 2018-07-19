import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from '@react/react-spectrum/Heading';
import SavedSearchTagList from '../components/SavedSearchTagList';
import withLoadingSpinner from '../components/withLoadingSpinner';
import InlineErrorMessage from '../components/common/InlineErrorMessage';

class SavedSearch extends Component {
    componentDidMount() {
        this.props.getSavedSearch();
    }

    render() {
        const WrappedSavedSearchTagList = withLoadingSpinner(SavedSearchTagList);
        const { hasError, errorMessage } = this.props.error;

        return (
            <div data-test="saved-search">
                <Heading size={6}>Saved Search</Heading>
                {!hasError && (
                    <WrappedSavedSearchTagList
                        data-test="wrapped-saved-search-tag-list"
                        isLoaded={this.props.isLoaded}
                        list={this.props.list}
                        onSavedSearchClick={this.props.onSavedSearchClick}
                        currentSearch={this.props.currentSearch}
                        deleteSearch={this.props.deleteSearch}
                        disabled={this.props.disabled}
                    />
                )}
                <InlineErrorMessage isInvalid={hasError} errorMessage={errorMessage} />
            </div>
        );
    }
}

SavedSearch.propTypes = {
    isLoaded: PropTypes.bool,
    list: PropTypes.array.isRequired,
    getSavedSearch: PropTypes.func.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
    currentSearch: PropTypes.string.isRequired,
    deleteSearch: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default SavedSearch;
