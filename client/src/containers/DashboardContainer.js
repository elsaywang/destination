import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { callSearch } from '../actions/searchForm';
import { getSavedSearch } from '../actions/savedSearch';
import { populateSearchFields } from '../actions/savedSearchFields';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import Well from '@react/react-spectrum/Well';
import styles from './DashboardContainer.css';
import SavedSearchTable from '../components/SavedSearchTable';

class DashboardContainer extends Component {
    componentDidMount() {
        this.props.getSavedSearch();
    }

    handleViewMoreForSavedSearch = search => {
        const { populateSearchFields, callSearch } = this.props;
        populateSearchFields(search);
        callSearch(search);
    };

    render() {
        return (
            <Fragment>
                {this.props.savedSearch.map(
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
                                                    label="View More"
                                                    variant="primary"
                                                    element="a"
                                                    href="#/search"
                                                    onClick={() =>
                                                        this.handleViewMoreForSavedSearch(search)
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
                                />
                            </Well>
                        ),
                )})
            </Fragment>
        );
    }
}

const mapStateToProps = ({ savedSearch }) => ({
    savedSearch,
});
const actionCreators = {
    callSearch,
    getSavedSearch,
    populateSearchFields,
};

export default connect(mapStateToProps, actionCreators)(DashboardContainer);
