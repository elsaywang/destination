import React, { Component, Fragment } from 'react';
import throttle from 'lodash.throttle';
import { connect } from 'react-redux';
import { callSearch, updateSortOptions } from '../actions/searchForm';
import {
    getSavedSearch,
    loadMoreSavedSearch,
    resetVisibleSavedSearch,
} from '../actions/savedSearch';
import { getHasMoreSavedSearches, getVisibleSavedSearchList } from '../reducers/savedSearch';
import { isNearBottom } from '../utils/isNearBottom';
import { populateSearchFields } from '../actions/savedSearchFields';
import { fetchUserRoles } from '../actions/permissions';
import { dashboardThrottleMs } from '../constants/lazyLoadConstants';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import Well from '@react/react-spectrum/Well';
import styles from './DashboardContainer.css';
import SavedSearchTable from '../components/SavedSearchTable';
import InlineErrorMessage from '../components/common/InlineErrorMessage';

class DashboardContainer extends Component {
    componentDidMount() {
        this.props.getSavedSearch();

        if (!Object.keys(this.props.permissions).length) {
            this.props.fetchUserRoles();
        }
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        this.props.resetVisibleSavedSearch();
        window.removeEventListener('scroll', this.onScroll);
    }

    componentDidUpdate() {
        this.loadMoreThrottled();
    }

    onScroll = () => {
        this.loadMoreThrottled();
    };

    loadMore = () => {
        const { hasMoreSavedSearches, loadMoreSavedSearch } = this.props;

        if (isNearBottom() && hasMoreSavedSearches) {
            loadMoreSavedSearch();
        }
    };

    loadMoreThrottled = throttle(this.loadMore, dashboardThrottleMs);

    handleViewAllForSavedSearch = search => {
        const { populateSearchFields, callSearch, updateSortOptions } = this.props;
        const { sortBy, descending } = search;
        const sortOptions = { sortBy, descending };

        updateSortOptions(sortOptions);
        callSearch({
            search,
            sortOptions,
        });
        populateSearchFields(search);
    };

    render() {
        return (
            <Fragment>
                <div>
                    <InlineErrorMessage
                        isInvalid={this.props.error.hasError}
                        errorMessage={this.props.error.errorMessage}
                    />
                </div>
                {this.props.visibleSavedSearchList.map(
                    search =>
                        Object.keys(search).length && (
                            <Well
                                data-test="saved-search-dashboard"
                                className={styles.dashboardTable}
                                key={search.name}>
                                <GridRow>
                                    <GridColumn size={9}>
                                        <div className={styles.tableHeader}>
                                            <Heading size={3}>{search.name}</Heading>
                                            <span className={styles.signalTypeNameHeader}>
                                                {search.signalType}
                                            </span>
                                        </div>
                                    </GridColumn>
                                    <GridColumn size={3} className={styles.gridColumnRightAlign}>
                                        <Button
                                            label="View All"
                                            variant="primary"
                                            element="a"
                                            href="#/search"
                                            className={styles.viewAllButton}
                                            onClick={() => this.handleViewAllForSavedSearch(search)}
                                        />
                                    </GridColumn>
                                </GridRow>
                                <SavedSearchTable
                                    savedSearch={search}
                                    isAdvancedSearchEnabled={false}
                                    allowsSelection={false}
                                    canCreateTraits={this.props.permissions.canCreateTraits}
                                />
                            </Well>
                        ),
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = ({ savedSearch, errors, permissions }) => ({
    error: errors.savedSearch,
    permissions,
    visibleSavedSearchList: getVisibleSavedSearchList(savedSearch),
    hasMoreSavedSearches: getHasMoreSavedSearches(savedSearch),
});
const actionCreators = {
    callSearch,
    updateSortOptions,
    getSavedSearch,
    loadMoreSavedSearch,
    resetVisibleSavedSearch,
    populateSearchFields,
    fetchUserRoles,
};

export default connect(
    mapStateToProps,
    actionCreators,
)(DashboardContainer);
