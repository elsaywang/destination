import * as actionCreators from '../actions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import SearchFilters from './SearchFilters';
import SignalSourceFilter from '../components/SignalSourceFilter';
import Table from '../components/Table';
import styles from './SearchContainer.css';
import ButtonGroup from '@react/react-spectrum/ButtonGroup';
import Button from '@react/react-spectrum/Button';

const items = [
    {
        keyValuePair: 'eVar1=acb382hfj',
        signalType: 'Actionable Log Files',
        signalSource: '—',
        totalCounts: '4,194,138',
        percentageChange: '+ 24.41%',
        includedInTraits: '2 Traits',
    },
    {
        keyValuePair: 'eVar4=CRM12345',
        signalType: 'Onboarded Records',
        signalSource: 'Data Source ABC DEF GHI JKL MNO',
        totalCounts: '1,139,451',
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
            filter: 'all',
            signalType: 'all', // test
        };
    }

    componentDidMount() {
        // TODO: API call to getCounts and set state
    }

    handleSignalSourceChange = value => {
        this.setState({
            filter: value,
        });
        // TODO: API call to update items in table results
    };

    setSignalType = signalType => {
        this.setState({
            signalType: signalType,
        });
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
                        <SignalSourceFilter
                            handleSignalSourceChange={this.handleSignalSourceChange}
                            counts={this.state.counts}
                            filter={this.state.filter}
                        />
                    </div>
                    <div className={styles.tableContainer}>
                        <Heading size={3}>Search Results for</Heading>
                        <Table items={items} signalType={this.state.signalType} />
                    </div>
                </div>
                <ButtonGroup
                    label="Signal Type filters"
                    onChange={this.setSignalType}
                    value={this.state.signalType}>
                    <Button value="all" label="All" />
                    <Button value="analytics" label="Adobe Analytics" />
                    <Button value="alf" label="Actionable Log Files" />
                    <Button value="general" label="General Online Data" />
                    <Button value="onboarded" label="Onboarded Records" />
                </ButtonGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    results: state.results,
    savedSearches: state.savedSearches,
});

export default connect(mapStateToProps, actionCreators)(SearchContainer);
