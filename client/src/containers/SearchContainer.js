import debounce from 'debounce';
import * as searchFormActionCreators from '../actions/searchForm';
import * as savedSearchActionCreators from '../actions/savedSearch';
import { selectSignals } from '../actions/selectSignals';
import { populateSearchFields, clearSearchFields } from '../actions/savedSearchFields';
import { getReportSuites } from '../actions/reportSuites';
import { fetchUserRoles } from '../actions/permissions';
import { fetchLimits } from '../actions/limits';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Heading from '@react/react-spectrum/Heading';
import Wait from '@react/react-spectrum/Wait';
import OverlayTooltip from '../components/common/OverlayTooltip';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import MultiSignalsTraitsCreationContainer from './MultiSignalsTraitsCreationContainer';
import TraitsCreationWarning from './TraitsCreationWarning';
import SignalTypeFilter from '../components/SignalTypeFilter';
import SignalsTable from '../components/SignalsTable';
import Search from '../components/Search';
import SavedSearch from './SavedSearch';
import SaveSearchExecution from '../components/SaveSearchExecution';
import { isEndOfResults, isResultsLoaded, getSortOptions } from '../reducers/results';
import { isSavedSearchLimitReached, getNormalizedSavedSearchList } from '../reducers/savedSearch';
import { getSelectedRowIndexes, isMaxSignalSelectionsReached } from '../reducers/selectedSignals';
import { getMaxSignalRetentionDays } from '../reducers/traitBackfill';
import { getDefaultCustomStartDate, getDefaultCustomEndDate } from '../utils/dateRange';
import { normalizeSortOptions } from '../utils/normalizeSortOptions';
import { getSearchResultsMessageBySignalTypeLabel } from '../utils/signalType';
import { formatSignal } from '../utils/stringifySignals';
import { getTooltipMessage } from '../constants/tooltipMessageOptions';
import { searchResultsThrottleMs } from '../constants/lazyLoadConstants';
import { defaultEventFiresMinimum, defaultEventFiresStep } from '../constants/limitConstants';
import EmptySearch from '../components/EmptySearch';
import styles from './SearchContainer.css';

class SearchContainer extends Component {
    state = this.initialState();

    initialState() {
        return {
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
            filterNewSignals: false,
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
        this.props.fetchLimits();
    }

    handleSignalTypeChange = sourceType => {
        this.setState(
            {
                source: {
                    name: '',
                    dataSourceIds: [],
                    reportSuiteIds: [],
                    sourceType,
                },
                filterNewSignals: false,
                presetId: null,
            },
            () => this.props.callSearch({ search: this.state }),
        );
    };

    onAdvancedSearchChange = value => {
        if (value && !this.props.reportSuites.length) {
            this.props.getReportSuites();
        }

        this.props.toggleAdvancedSearch(value);
        this.props.clearSearch();

        this.setState({
            searched: false,
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
            searched: false,
            source: {
                ...this.state.source,
                name: value,
            },
        });
    };

    onReportSuiteSelect = value => {
        const matchingReportSuite = this.props.reportSuites.find(
            reportSuite => reportSuite.suite.toLowerCase() === value.toLowerCase(),
        );

        this.setState({
            searched: false,
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
        this.setState({
            searched: false,
            keyValuePairs,
        });
    };

    onValueChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).value = value;
        this.setState({
            searched: false,
            keyValuePairs,
        });
    };

    onOperatorChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).operator = value;
        this.setState({
            searched: false,
            keyValuePairs,
        });
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

    handleSavedSearchClick = savedSearch => {
        this.setState({
            ...this.state,
            presetId: null,
            ...savedSearch,
            searched: true,
        });

        const { sortBy, descending } = savedSearch;
        const sortOptions = { sortBy, descending };

        this.props.updateSortOptions(sortOptions);
        this.props.callSearch({
            search: savedSearch,
            sortOptions,
        });
        this.props.populateSearchFields(savedSearch);
    };

    onSearch = () => {
        this.setState(
            {
                searched: true,
                filterNewSignals: false,
                presetId: null,
            },
            () => this.props.callSearch({ search: this.state }),
        );
    };

    handleLoadMore = (throttleMs = searchResultsThrottleMs) => {
        if (this.props.isEndOfResults) {
            return;
        }

        const { page, isThrottled: wasThrottled } = this.props.results;
        const { sortOptions } = this.props;

        // Triggers another render.
        this.props.throttleLoadMore(true);

        if (wasThrottled) {
            return;
        }

        this.props.loadMore({
            search: this.state,
            pagination: {
                page: page + 1,
            },
            sortOptions,
        });

        debounce(() => {
            this.props.throttleLoadMore(false);
        }, throttleMs)();
    };

    handleSortSearch = ({ sortBy, sortDir }) => {
        const sortOptions = normalizeSortOptions({ sortBy, sortDir });

        this.props.updateSortOptions(sortOptions);
        this.props.callSearch({
            search: this.state,
            sortOptions,
        });
    };

    handleSaveThisSearchConfirm = search => {
        const { thisSearch, savedSearch, saveSearch } = this.props;
        const currentSearchName = { name: thisSearch.name || formatSignal(this.state) };
        const maxId = savedSearch.length ? savedSearch[savedSearch.length - 1].id : -1;
        const thisSearchWithKeyValuePairs = {
            ...this.state,
            filterNewSignals: false,
            ...thisSearch,
            ...normalizeSortOptions(thisSearch),
            ...currentSearchName,
            presetId: null,
            id: maxId + 1,
        };
        const newSavedSearch = [...savedSearch, thisSearchWithKeyValuePairs];

        this.setState(currentSearchName, () => saveSearch(newSavedSearch));
    };

    deleteSearch = search => {
        const { savedSearch, saveSearch } = this.props;
        const index = savedSearch.findIndex(ss => ss.id === Number(search.id));
        const newSavedSearch = [...savedSearch.slice(0, index), ...savedSearch.slice(index + 1)];

        saveSearch(newSavedSearch);
        this.setState(this.initialState());
    };

    onClearAll = () => {
        this.props.clearSearch();
        this.props.clearSearchFields();
        this.setState(this.initialState());
    };

    isCustomDateRangeEnabled = () => this.state.viewRecordsFor === 'custom';

    saveThisSearchMessage = () =>
        getTooltipMessage(this.props.isSavedSearchLimitReached, this.props.savedSearchLimit);

    getSearchResultsMessage = () =>
        getSearchResultsMessageBySignalTypeLabel(this.state.name, this.state.source.sourceType);

    renderEmptyState = () => {
        if (!this.state.searched) {
            return <EmptySearch className={styles.empty} variant={'explore'} />;
        }

        if (this.props.errors.searchForm.hasError) {
            return <EmptySearch className={styles.empty} variant={'errorFetching'} />;
        }

        if (this.props.isResultsLoaded && this.state.searched) {
            return <EmptySearch className={styles.empty} variant={'noResult'} />;
        }

        return <Wait size="L" centered />;
    };

    shouldShowResults = () => this.props.results.list.length && this.props.isResultsLoaded;

    isSearchDisabled = () => !this.props.isResultsLoaded && this.state.searched;

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
                            maxSignalRetentionDays={this.props.maxSignalRetentionDays}
                            disabled={this.isSearchDisabled()}
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
                                onSavedSearchClick={this.handleSavedSearchClick}
                                currentSearch={this.state.name}
                                error={this.props.errors.savedSearch}
                                disabled={this.isSearchDisabled()}
                            />
                            {this.props.results.list.length > 0 && (
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
                                            error={this.props.errors.saveSearch}
                                        />
                                    </div>
                                    {!this.props.errors.saveSearch.hasError && (
                                        <OverlayTooltip
                                            className={styles.saveSearchExecutionTooltip}
                                            message={this.saveThisSearchMessage()}
                                        />
                                    )}
                                </Fragment>
                            )}
                        </div>
                    </GridColumn>
                </GridRow>

                {this.shouldShowResults() ? (
                    <div style={{ display: 'flex', marginTop: 20 }} data-test="search-results">
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
                                <GridColumn size={7}>
                                    <Heading size={3}>
                                        Search Results {this.getSearchResultsMessage()}
                                    </Heading>
                                </GridColumn>
                                <GridColumn size={5}>
                                    <MultiSignalsTraitsCreationContainer
                                        canCreateTraits={this.props.permissions.canCreateTraits}
                                    />
                                </GridColumn>
                            </GridRow>
                            <GridRow>
                                <GridColumn size={9} offsetSize={3}>
                                    <TraitsCreationWarning />
                                </GridColumn>
                            </GridRow>
                            <SignalsTable
                                results={this.props.results.list}
                                selectedRowIndexes={this.props.selectedRowIndexes}
                                signalType={this.state.source.sourceType}
                                isAdvancedSearchEnabled={this.state.advanced}
                                isMaxSignalSelectionsReached={
                                    this.props.isMaxSignalSelectionsReached
                                }
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
                        <GridColumn size={12}>{this.renderEmptyState()}</GridColumn>
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
    selectedSignals,
    reportSuites,
    errors,
    permissions,
    traitBackfill,
}) => ({
    results,
    sortOptions: getSortOptions(results),
    isResultsLoaded: isResultsLoaded(results),
    isEndOfResults: isEndOfResults(results),
    savedSearchFields,
    savedSearch: savedSearch.list,
    savedSearchLimit: savedSearch.limit,
    thisSearch: savedSearch.saveSearch,
    isSavedSearchLimitReached: isSavedSearchLimitReached(savedSearch),
    isSavedSearchLoaded: savedSearch.isLoaded,
    finalizedSavedSearchList: getNormalizedSavedSearchList(savedSearch),
    maxSignalRetentionDays: getMaxSignalRetentionDays(traitBackfill),
    selectedRowIndexes: getSelectedRowIndexes(selectedSignals),
    isMaxSignalSelectionsReached: isMaxSignalSelectionsReached(selectedSignals),
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
    fetchLimits,
};

export default connect(
    mapStateToProps,
    actionCreators,
)(SearchContainer);
