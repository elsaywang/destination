import * as actionCreators from '../actions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import SearchFilters from './SearchFilters';
import SignalTypeFilter from '../components/SignalTypeFilter';
import SignalsTable from '../components/SignalsTable';
import styles from './SearchContainer.css';

const items = [
    {
        keyValuePair: 'eVar1=acb382hfj',
        keyName: 'Page Title',
        valueName: 'Good dogs',
        signalType: 'Actionable Log Files',
        signalSource: '—',
        totalCounts: '4,194,138',
        totalEventFires: '4,194,138',
        percentageChange: '+ 24.41%',
        includedInTraits: '2 Traits',
    },
    {
        keyValuePair: 'eVar4=CRM12345',
        keyName: 'Product SKU',
        valueName: 'pup',
        signalType: 'Onboarded Records',
        signalSource: 'Data Source ABC DEF GHI JKL MNO',
        totalCounts: '1,139,451',
        totalEventFires: '1,139,451',
        percentageChange: '- 7.82%',
        includedInTraits: '3 Traits',
    },
];

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
                        <SignalsTable items={items} signalType={this.state.signalType} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    results: state.results,
    savedSearches: state.savedSearches,
});

export default connect(mapStateToProps, actionCreators)(SearchContainer);
