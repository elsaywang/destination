import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { callSearch } from '../actions/searchForm';
import {
    getSavedSearch,
    loadMoreSavedSearch,
    resetVisibleSavedSearch,
} from '../actions/savedSearch';
import {
    getTrackedInDashboardSavedSearchList,
    getVisibleSavedSearchList,
} from '../reducers/savedSearch';
import { handleLazyLoad } from '../utils/lazyLoad';
import { populateSearchFields } from '../actions/savedSearchFields';
import { fetchUserRoles } from '../actions/permissions';
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

    componentWillReceiveProps(nextProps) {
        const {
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreSavedSearch,
        } = nextProps;
        handleLazyLoad(
            this.isBottomPassed(),
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreSavedSearch,
        );
    }

    handleViewAllForSavedSearch = search => {
        const { populateSearchFields, callSearch } = this.props;

        populateSearchFields(search);
        callSearch(search);
    };

    isBottomPassed = () =>
        Boolean(
            window.innerHeight + Math.ceil(window.pageYOffset + 1) >= document.body.offsetHeight,
        );

    onScroll = e => {
        const {
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreSavedSearch,
        } = this.props;
        handleLazyLoad(
            this.isBottomPassed(),
            visibleSavedSearchList,
            trackedInDashboardSavedSearchList,
            loadMoreSavedSearch,
        );
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
                                <GridRow valign="middle">
                                    <GridColumn size={5}>
                                        <div className={styles.tableHeader}>
                                            <Heading size={3}>{search.name}</Heading>
                                            <span className={styles.signalTypeNameHeader}>
                                                {search.signalType}
                                            </span>
                                        </div>
                                    </GridColumn>
                                    <GridColumn size={7}>
                                        <GridRow>
                                            <GridColumn size={2} offsetSize={10}>
                                                <Button
                                                    label="View All"
                                                    variant="primary"
                                                    element="a"
                                                    href="#/search"
                                                    onClick={() =>
                                                        this.handleViewAllForSavedSearch(search)
                                                    }
                                                />
                                            </GridColumn>
                                        </GridRow>
                                    </GridColumn>
                                </GridRow>
                                <SavedSearchTable
                                    savedSearch={search}
                                    getResultsBySavedSearch={this.props.callSearch}
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
    trackedInDashboardSavedSearchList: getTrackedInDashboardSavedSearchList(savedSearch),
    error: errors.savedSearch,
    permissions,
    visibleSavedSearchList: getVisibleSavedSearchList(savedSearch),
});
const actionCreators = {
    callSearch,
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
