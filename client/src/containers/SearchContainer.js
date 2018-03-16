import * as actionCreators from '../actions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import SearchFilters from './SearchFilters';
import SignalTypeFilter from '../components/SignalTypeFilter';
import SignalsTable from '../components/SignalsTable';
import styles from './SearchContainer.css';

class SearchContainer extends Component {
    constructor() {
        super();

        this.state = {
            counts: {
                all: 72093,
                adobeAnalytics: 34300,
                actionableLogFiles: 359,
                generalOnlineData: 27,
                onboardedRecords: 37407,
            },
            signalType: 'all',
        };
    }

    componentDidMount() {
        // TODO: API call to getCounts and set state
    }

    handleSignalTypeChange = signalType => {
        this.setState({ signalType });
        // TODO: API call to update items in table results
    };

    render() {
        return (
            <Fragment>
                <GridRow>
                    <GridColumn size={12}>
                        <SearchFilters onSearch={this.props.callSearch} />
                    </GridColumn>
                </GridRow>
                <div style={{ display: 'flex' }}>
                    <div className={styles.filterListContainer}>
                        <SignalTypeFilter
                            counts={this.state.counts}
                            onSignalTypeChange={this.handleSignalTypeChange}
                            signalType={this.state.signalType}
                        />
                    </div>
                    <div className={styles.tableContainer}>
                        <Heading size={3}>Search Results for</Heading>
                        <SignalsTable
                            results={this.props.results}
                            signalType={this.state.signalType}
                            isAdvancedSearchEnabled={false} // TODO: hook this up
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ results, savedSearches }) => ({
    results,
    savedSearches,
});

export default connect(mapStateToProps, actionCreators)(SearchContainer);
