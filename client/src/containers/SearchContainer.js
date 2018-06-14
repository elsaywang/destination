import * as searchFormActionCreators from '../actions/searchForm';
import * as savedSearchActionCreators from '../actions/savedSearch';
import { selectSignals } from '../actions/selectSignals';
import { populateSearchFields, clearSearchFields } from '../actions/savedSearchFields';
import { getReportSuites } from '../actions/reportSuites';
import { fetchUserRoles } from '../actions/permissions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import OverlayTooltip from '../components/common/OverlayTooltip';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import MultiSignalsTraitsCreationContainer from './MultiSignalsTraitsCreationContainer';
import TraitsCreationWarning from './TraitsCreationWarning';
import SignalTypeFilter from '../components/SignalTypeFilter';
import SignalsTable from '../components/SignalsTable';
import Search from '../components/Search';
import SavedSearch from './SavedSearch';
import SaveSearchExecution from '../components/SaveSearchExecution';
import { isSavedSearchLimitReached, getNormalizedSavedSearchList } from '../reducers/savedSearch';
import { getDefaultCustomStartDate, getDefaultCustomEndDate } from '../utils/dateRange';
import { getTooltipMessage } from '../constants/tooltipMessageOptions';
import { defaultEventFiresMinimum, defaultEventFiresStep } from '../constants/limitConstants';
import EmptySearch from '../components/EmptySearch';
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
            source: {
                name: '',
                dataSourceIds: [],
                reportSuiteIds: [],
                sourceType: 'ALL',
            },
            viewRecordsFor: '7D',
            customStartDate: getDefaultCustomStartDate(),
            customEndDate: getDefaultCustomEndDate(),
            minEventFires: 1000,
            searched: false,
        };
    }

    componentDidMount() {
        // Pre-populate search fields if user clicked view more button in dashboard
        this.setState({ ...this.state, ...this.props.savedSearchFields });
        //if user does not click any view more button in the dashboard, reset the carried over search results from dashboard
        //TODO: Extract all shared search fields state changes to redux
        if (!this.props.savedSearchFields.name) {
            this.onClearAll();
        } else {
            this.setState({ searched: true });
        }

        if (!Object.keys(this.props.permissions).length) {
            this.props.fetchUserRoles();
        }
        this.props.getSavedSearchLimit();
    }

    handleSignalTypeChange = sourceType => {
        this.setState({
            source: {
                name: '',
                dataSourceIds: [],
                reportSuiteIds: [],
                sourceType,
            },
        });

        this.props.callSearch(this.state);
    };

    onAdvancedSearchChange = value => {
        if (value && !this.props.reportSuites.length) {
            this.props.getReportSuites();
        }

        this.props.toggleAdvancedSearch(value);

        this.setState({
            advanced: value,
            source: {
                name: '',
                dataSourceIds: [],
                reportSuiteIds: [],
                sourceType: value ? 'ANALYTICS' : null,
            },
        });
    };

    onReportSuiteChange = value => {
        this.setState({
            source: {
                ...this.state.source,
                name: value,
            },
        });
    };

    onReportSuiteSelect = value => {
        const matchingReportSuite = this.props.reportSuites.find(
            reportSuite => reportSuite.name === value,
        );

        this.setState({
            source: {
                ...this.state.source,
                name: value,
                dataSourceIds: [],
                reportSuiteIds: [matchingReportSuite.suite],
            },
        });
    };

    onKeyChange = (id, value) => {
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
        this.setState({
            viewRecordsFor: value,
        });
    };

    onCustomStartDateChange = value => {
        this.setState({
            customStartDate: value,
        });
    };

    onCustomEndDateChange = value => {
        this.setState({
            customEndDate: value,
        });
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
            searched: true,
        });
        this.props.callSearch(savedSearch);
        this.props.populateSearchFields(savedSearch);
    };

    onSearch = () => {
        this.setState({ searched: true });
        this.props.callSearch(this.state);
    };

    handleLoadMore = () => {
        const { page } = this.props.results;

        this.props.loadMore(this.state, {
            page: page + 1,
        });
    };

    handleSortSearch = (sortColumn, sortDir) => {
        this.props.sortSearch(this.state, sortColumn, sortDir);
    };

    handleSaveThisSearchConfirm = search => {
        const { thisSearch, savedSearch, saveSearch } = this.props;
        const maxId = savedSearch.length ? savedSearch[savedSearch.length - 1].id : -1;
        const thisSearchWithKeyValuePairs = {
            ...this.state,
            ...thisSearch,
            id: maxId + 1,
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
            searched: false,
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
            source: {
                name: '',
                dataSourceIds: [],
                reportSuiteIds: [],
                sourceType: 'ALL',
            },
            viewRecordsFor: '7D',
            customStartDate: getDefaultCustomStartDate(),
            customEndDate: getDefaultCustomEndDate(),
            minEventFires: 1000,
        });
    };

    isCustomDateRangeEnabled = () => this.state.viewRecordsFor === 'custom';

    saveThisSearchMessage = () =>
        getTooltipMessage(this.props.isSavedSearchLimitReached, this.props.savedSearchLimit);

    render() {
        return (
            <Fragment>
                <GridRow>
                    <GridColumn size={12}>
                        <Search
                            {...this.state}
                            reportSuites={this.props.reportSuites}
                            onAdvancedSearchChange={this.onAdvancedSearchChange}
                            onReportSuiteChange={this.onReportSuiteChange}
                            onReportSuiteSelect={value => this.onReportSuiteSelect(value)}
                            onKeyChange={this.onKeyChange}
                            onValueChange={this.onValueChange}
                            onOperatorChange={this.onOperatorChange}
                            onAddClick={this.onAddClick}
                            onRemoveClick={this.onRemoveClick}
                            onSignalStatusChange={this.onSignalStatusChange}
                            onViewRecordsChange={this.onViewRecordsChange}
                            onCustomStartDateChange={this.onCustomStartDateChange}
                            onCustomEndDateChange={this.onCustomEndDateChange}
                            onMinEventFiresChange={this.onMinEventFiresChange}
                            onSearch={this.onSearch}
                            onClearAll={this.onClearAll}
                            isCustomDateRangeEnabled={this.isCustomDateRangeEnabled()}
                            errors={this.props.errors}
                            eventFiresMinimum={defaultEventFiresMinimum}
                            eventFiresStep={defaultEventFiresStep}
                        />
                    </GridColumn>
                </GridRow>

                <GridRow valign="bottom">
                    <GridColumn size={12}>
                        <div className={styles.saveSearch}>
                            <SavedSearch
                                isLoaded={this.props.isSavedSearchLoaded}
                                getSavedSearch={this.props.getSavedSearch}
                                deleteSearch={this.deleteSearch}
                                list={this.props.finalizedSavedSearchList}
                                onSavedSearchClick={this.onSavedSearchClick}
                                currentSearch={this.state.name}
                                error={this.props.errors.savedSearch}
                            />
                            {Object.keys(this.props.results.list).length > 0 && (
                                <Fragment>
                                    <div className={styles.saveSearchExecution}>
                                        <SaveSearchExecution
                                            disabled={this.props.isSavedSearchLimitReached}
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
                                    <OverlayTooltip
                                        className={styles.saveSearchExecutionTooltip}
                                        message={this.saveThisSearchMessage()}
                                    />
                                </Fragment>
                            )}
                        </div>
                    </GridColumn>
                </GridRow>

                {Object.keys(this.props.results.list).length ? (
                    <div style={{ display: 'flex', marginTop: 20 }}>
                        {!this.state.advanced && (
                            <div className={styles.filterListContainer}>
                                <SignalTypeFilter
                                    onSignalTypeChange={this.handleSignalTypeChange}
                                    signalType={this.state.source.sourceType}
                                />
                            </div>
                        )}
                        <div className={styles.tableContainer}>
                            <GridRow valign="middle">
                                <GridColumn size={4}>
                                    <Heading size={3}>Search Results for</Heading>
                                </GridColumn>
                                <GridColumn size={8}>
                                    <GridRow>
                                        <GridColumn size={10}>
                                            <MultiSignalsTraitsCreationContainer
                                                canCreateTraits={
                                                    this.props.permissions.canCreateTraits
                                                }
                                            />
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
                                signalType={this.state.source.sourceType}
                                totalKeyValuePairs={this.state.keyValuePairs.length}
                                isAdvancedSearchEnabled={this.state.advanced}
                                onSortSearch={this.handleSortSearch}
                                onSignalRecordsSelection={this.props.selectSignals}
                                onLoadMore={this.handleLoadMore}
                                canCreateTraits={this.props.permissions.canCreateTraits}
                                allowsSelection={this.props.permissions.canCreateTraits}
                            />
                        </div>
                    </div>
                ) : (
                    <GridRow>
                        <GridColumn size={12}>
                            <EmptySearch
                                className={styles.empty}
                                variant={this.state.searched ? 'noResult' : 'explore'}
                            />
                        </GridColumn>
                    </GridRow>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = ({
    results,
    savedSearch,
    savedSearchFields,
    reportSuites,
    errors,
    permissions,
}) => ({
    results,
    savedSearchFields,
    savedSearch: savedSearch.list,
    savedSearchLimit: savedSearch.limit,
    thisSearch: savedSearch.saveSearch,
    isSavedSearchLimitReached: isSavedSearchLimitReached(savedSearch),
    isSavedSearchLoaded: savedSearch.isLoaded,
    finalizedSavedSearchList: getNormalizedSavedSearchList(savedSearch),
    reportSuites,
    errors,
    permissions,
});
const actionCreators = {
    ...searchFormActionCreators,
    ...savedSearchActionCreators,
    selectSignals,
    populateSearchFields,
    clearSearchFields,
    getReportSuites,
    fetchUserRoles,
};

export default connect(mapStateToProps, actionCreators)(SearchContainer);
