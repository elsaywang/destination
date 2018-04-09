import * as searchFormActionCreators from '../actions/searchForm';
import { selectSignals } from '../actions/selectSignals';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import SearchFilters from './SearchFilters';
import MultiSignalsTraitsCreationContainer from './MultiSignalsTraitsCreationContainer';
import TraitsCreationWarning from './TraitsCreationWarning';
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
                        <SearchFilters
                            onSearch={this.props.callSearch}
                            onClearAll={this.props.clearSearch}
                        />
                    </GridColumn>
                </GridRow>

                {Object.keys(this.props.results.list).length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <div className={styles.filterListContainer}>
                            <SignalTypeFilter
                                counts={this.state.counts}
                                onSignalTypeChange={this.handleSignalTypeChange}
                                signalType={this.state.signalType}
                            />
                        </div>
                        <div className={styles.tableContainer}>
                            <GridRow valign="middle">
                                <GridColumn size={4}>
                                    <Heading size={3}>Search Results for</Heading>
                                </GridColumn>
                                <GridColumn size={8}>
                                    <GridRow>
                                        <GridColumn size={10}>
                                            <MultiSignalsTraitsCreationContainer />
                                        </GridColumn>
                                        <GridColumn size={2}>
                                            <Button label="Export.csv" variant="primary" />
                                        </GridColumn>
                                    </GridRow>
                                </GridColumn>
                            </GridRow>
                            <GridRow>
                                <GridColumn size={9} offsetSize={3}>
                                    <TraitsCreationWarning />
                                </GridColumn>
                            </GridRow>
                            <SignalsTable
                                results={this.props.results}
                                signalType={this.state.signalType}
                                isAdvancedSearchEnabled={false} // TODO: hook this up
                                sortSearch={this.props.sortSearch}
                                onSignalRecordsSelection={this.props.selectSignals}
                            />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = ({ results, savedSearches }) => ({
    results,
    savedSearches,
});
const actionCreators = { ...searchFormActionCreators, selectSignals };
export default connect(mapStateToProps, actionCreators)(SearchContainer);
