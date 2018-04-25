import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { callSearch } from '../actions/searchForm';
import { getSavedSearch } from '../actions/savedSearch';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import styles from './DashboardContainer.css';
import SavedSearchTable from '../components/SavedSearchTable';

class SearchContainer extends Component {
    componentDidMount() {
        this.props.getSavedSearch();
    }

    render() {
        return (
            <Fragment>
                {this.props.savedSearch.map(search => {
                    return (
                        Object.keys(search).length && (
                            <div className={styles.dashboardContainer} key={search.name}>
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
                                                <Button label="View More" variant="primary" />
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
                            </div>
                        )
                    );
                })}
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
};

export default connect(mapStateToProps, actionCreators)(SearchContainer);
