import * as searchFormActionCreators from '../actions/searchForm';
import { selectSignals } from '../actions/selectSignals';
import { getSavedSearch } from '../actions/savedSearch';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import MultiSignalsTraitsCreationContainer from './MultiSignalsTraitsCreationContainer';
import TraitsCreationWarning from './TraitsCreationWarning';
import SignalTypeFilter from '../components/SignalTypeFilter';
import SignalsTable from '../components/SignalsTable';
import Search from '../components/Search';
import SavedSearch from './SavedSearch';
import styles from './SearchContainer.css';

class SearchContainer extends Component {
    constructor() {
        super();

        this.state = {
            keyValuePairs: [
                {
                    id: 0,
                    key: '',
                    operator: '==',
                    value: '',
                },
            ],
            signalStatus: 'ALL',
            advanced: false,
            filter: '',
            viewRecordsFor: 7,
            minEventFires: 1000,
            // TODO: counts and signalType should be extracted to redux and come through props
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

    onAdvancedSearchChange = value => {
        this.setState({
            advanced: value,
            filter: '',
        });
    };

    onFilterChange = value => {
        this.setState({
            filter: value,
        });
    };

    onKeySelect = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).key = value;
        this.setState({ keyValuePairs });
    };

    onValueChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).value = value;
        this.setState({ keyValuePairs });
    };

    onOperatorChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).operator = value;
        this.setState({ keyValuePairs });
    };

    onAddClick = () => {
        const maxId = this.state.keyValuePairs[this.state.keyValuePairs.length - 1].id;
        const newKeyValuePair = {
            id: maxId + 1,
            key: '',
            operator: '==',
            value: '',
        };

        this.setState(prevState => ({
            keyValuePairs: [...prevState.keyValuePairs, newKeyValuePair],
        }));
    };

    onRemoveClick = id => {
        const { keyValuePairs } = this.state;
        const index = keyValuePairs.findIndex(kvp => kvp.id === Number(id));
        const newKeyValuePairs = [
            ...keyValuePairs.slice(0, index),
            ...keyValuePairs.slice(index + 1),
        ];

        this.setState({ keyValuePairs: newKeyValuePairs });
    };

    onSignalStatusChange = value => {
        this.setState({
            signalStatus: value,
        });
    };

    onViewRecordsChange = value => {
        if (value === 'custom') {
            // AAM-34805
            // invoke custom date picker
            // set state to custom date range
        } else {
            this.setState({
                viewRecordsFor: value,
            });
        }
    };

    onMinEventFiresChange = value => {
        this.setState({
            minEventFires: value,
        });
    };

    onSavedSearchClick = savedSearch => {
        this.setState({
            ...this.state,
            ...savedSearch,
        });
        this.props.callSearch(savedSearch);
    };

    onSearch = () => {
        this.props.callSearch(this.state);
    };

    onClearAll = () => {
        // this.props.onClearAll();
        this.setState({
            keyValuePairs: [
                {
                    id: 0,
                    key: '',
                    operator: '==',
                    value: '',
                },
            ],
            signalStatus: 'ALL',
            advanced: false,
            filter: '',
            viewRecordsFor: 7,
            minEventFires: 1000,
        });
    };

    render() {
        return (
            <Fragment>
                <GridRow>
                    <GridColumn size={12}>
                        <Search
                            {...this.state}
                            onAdvancedSearchChange={this.onAdvancedSearchChange}
                            onFilterChange={this.onFilterChange}
                            onKeySelect={this.onKeySelect}
                            onValueChange={this.onValueChange}
                            onOperatorChange={this.onOperatorChange}
                            onAddClick={this.onAddClick}
                            onRemoveClick={this.onRemoveClick}
                            onSignalStatusChange={this.onSignalStatusChange}
                            onViewRecordsChange={this.onViewRecordsChange}
                            onMinEventFiresChange={this.onMinEventFiresChange}
                            onSearch={this.onSearch}
                            onClearAll={this.onClearAll}
                        />
                    </GridColumn>
                </GridRow>

                <GridRow>
                    <GridColumn size={12}>
                        <SavedSearch
                            getSavedSearch={this.props.getSavedSearch}
                            list={this.props.savedSearch}
                            onSavedSearchClick={this.onSavedSearchClick}
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

const mapStateToProps = ({ results, savedSearch }) => ({
    results,
    savedSearch,
});
const actionCreators = {
    ...searchFormActionCreators,
    selectSignals,
    getSavedSearch,
};

export default connect(mapStateToProps, actionCreators)(SearchContainer);
