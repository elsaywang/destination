import * as searchFormActionCreators from '../actions/searchForm';
import * as savedSearchActionCreators from '../actions/savedSearch';
import { selectSignals } from '../actions/selectSignals';
import { populateSearchFields, clearSearchFields } from '../actions/savedSearchFields';
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
import SaveSearchExecution from '../components/SaveSearchExecution';
import styles from './SearchContainer.css';

class SearchContainer extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
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
            filter: {
                label: '',
                dataSourceId: 0,
                reportSuiteId: 0,
            },
            viewRecordsFor: 7,
            minEventFires: 1000,
            // TODO: counts and signalType should be extracted to redux and come through props
            counts: {
                ALL: 72093,
                ANALYTICS: 34300,
                ALF: 359,
                REALTIME: 27,
                ONBOARDED: 37407,
            },
            signalType: 'ALL',
        };
    }

    componentDidMount() {
        // TODO: API call to getCounts and set state

        // Pre-populate search fields if user clicked view more button in dashboard
        this.setState({ ...this.state, ...this.props.savedSearchFields });
        //if user does not click any view more button in the dashboard, reset the carried over search results from dashboard
        //TODO: Extract all shared search fields state changes to redux
        if (!this.props.savedSearchFields.name) {
            this.onClearAll();
        }
    }

    handleSignalTypeChange = signalType => {
        this.setState({ signalType });
        // TODO: API call to update items in table results
    };

    onAdvancedSearchChange = value => {
        this.setState({
            advanced: value,
            filter: {
                label: '',
                dataSourceId: 0,
                reportSuiteId: 0,
            },
        });
    };

    onFilterChange = value => {
        this.setState({
            // TODO: figure out how to populate dataSourceId && reportSuiteId for AAM-35130
            filter: {
                label: value,
                dataSourceId: 0,
                reportSuiteId: 0,
            },
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
        this.props.populateSearchFields(savedSearch);
    };

    onSearch = () => {
        this.props.callSearch(this.state);
    };

    handleSaveThisSearchConfirm = search => {
        const { thisSearch, savedSearch, saveSearch } = this.props;
        const maxId = savedSearch[savedSearch.length - 1].id;
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 7);
        // TODO: move this.state to redux to clean this up and figure out where some of these params come from
        const thisSearchWithKeyValuePairs = {
            ...thisSearch,
            id: maxId + 1,
            endDate,
            keyValuePairs: this.state.keyValuePairs,
            signalStatus: this.state.signalStatus,
            source: {
                dataType: 'Real-Time',
                sourceType: 'REALTIME',
                ...this.state.filter,
            },
            viewRecordsFor: this.state.viewRecordsFor,
            minEventFires: this.state.minEventFires,
        };
        const newSavedSearch = [...savedSearch, thisSearchWithKeyValuePairs];

        saveSearch(newSavedSearch);
    };

    deleteSearch = search => {
        const { savedSearch, saveSearch } = this.props;
        const index = savedSearch.findIndex(ss => ss.id === Number(search.id));
        const newSavedSearch = [...savedSearch.slice(0, index), ...savedSearch.slice(index + 1)];

        saveSearch(newSavedSearch);
    };

    onClearAll = () => {
        this.props.clearSearch();
        this.props.clearSearchFields();
        this.setState({
            name: '',
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
            filter: {
                label: '',
                dataSourceId: 0,
                reportSuiteId: 0,
            },
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

                <GridRow valign="bottom">
                    <GridColumn size={12}>
                        <div className={styles.saveSearch}>
                            <SavedSearch
                                getSavedSearch={this.props.getSavedSearch}
                                deleteSearch={this.deleteSearch}
                                list={this.props.savedSearch}
                                onSavedSearchClick={this.onSavedSearchClick}
                                currentSearch={this.state.name}
                            />
                            {Object.keys(this.props.results.list).length > 0 && (
                                <div className={styles.saveSearchExecution}>
                                    <SaveSearchExecution
                                        confirmSaveThisSearch={this.handleSaveThisSearchConfirm}
                                        cancelSaveSearch={this.props.cancelSaveSearch}
                                        updateSaveSearchName={this.props.updateSaveSearchName}
                                        trackSearchResultInDashboard={
                                            this.props.trackSearchResultInDashboard
                                        }
                                        selectDefaultSorting={this.props.selectDefaultSorting}
                                        changeSortingOrder={this.props.changeSortingOrder}
                                    />
                                </div>
                            )}
                        </div>
                    </GridColumn>
                </GridRow>

                {Object.keys(this.props.results.list).length > 0 && (
                    <div style={{ display: 'flex', marginTop: 20 }}>
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

const mapStateToProps = ({ results, savedSearch, savedSearchFields }) => ({
    results,
    savedSearchFields,
    savedSearch: savedSearch.list,
    thisSearch: savedSearch.saveSearch,
});
const actionCreators = {
    ...searchFormActionCreators,
    ...savedSearchActionCreators,
    selectSignals,
    populateSearchFields,
    clearSearchFields,
};

export default connect(mapStateToProps, actionCreators)(SearchContainer);
