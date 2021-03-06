import debounce from 'debounce';
import * as searchFormActionCreators from '../actions/searchForm';
import * as savedSearchActionCreators from '../actions/savedSearch';
import { selectSignals } from '../actions/selectSignals';
import { populateSearchFields, clearSearchFields } from '../actions/savedSearchFields';
import { fetchReportSuites } from '../actions/reportSuites';
import { fetchDataSources } from '../actions/dataSources';
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
import SignalSourceFilter from '../components/SignalSourceFilter';
import SignalsTable from '../components/SignalsTable';
import Search from '../components/Search';
import SavedSearch from './SavedSearch';
import SaveSearchExecution from '../components/SaveSearchExecution';
import { isEndOfResults, isResultsLoaded, getSortOptions } from '../reducers/results';
import { isSavedSearchLimitReached, getNormalizedSavedSearchList } from '../reducers/savedSearch';
import { getSelectedRowIndexes, isMaxSignalSelectionsReached } from '../reducers/selectedSignals';
import { getMaxSignalRetentionDays } from '../reducers/traitBackfill';
import { getDataSources } from '../reducers/dataSources';
import {
    getSavedSearchError,
    getSaveSearchError,
    hasSearchFormError,
    hasError,
} from '../reducers/errors';
import { getDefaultCustomStartDate, getDefaultCustomEndDate } from '../utils/dateRange';
import { normalizeSortOptions } from '../utils/normalizeSortOptions';
import { getSearchResultsMessageBySignalTypeLabel } from '../utils/signalType';
import { formatSignal } from '../utils/stringifySignals';
import { getSaveThisSearchMessage } from '../constants/tooltipMessageOptions';
import {
    formatReportSuiteOptionName,
    isValidDataSourceName,
    isValidReportSuite,
    getMatchedReportSuiteBySuite,
    getMatchedReportSuiteByName,
    getMatchedDataSourceByName,
    getSelectedReportSuiteFromSearchResults,
} from '../utils/signalSourceOptions';
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
        this.setState({ ...this.state, ...this.props.savedSearchFields });

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
                searched: true,
            },
            () => {
                this.props.callSearch({ search: this.state });
                if (this.isFilteredByOnboardedRecords() && !this.props.dataSources.length) {
                    this.props.fetchDataSources();
                }
                if (this.isFilteredByAdobeAnalytics() && !this.props.reportSuites.length) {
                    this.props.fetchReportSuites();
                }
            },
        );
    };

    onAdvancedSearchChange = value => {
        if (value && !this.props.reportSuites.length) {
            this.props.fetchReportSuites();
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

    //ReportSuite ComboBox onChange value is the option { label } or user typed value
    onReportSuiteChange = value => {
        const { reportSuites } = this.props;
        const matchingReportSuite = getMatchedReportSuiteByName(reportSuites, value);

        this.setState({
            searched: false,
            source: {
                ...this.state.source,
                name: value,
                reportSuiteIds: matchingReportSuite ? [matchingReportSuite.suite] : [],
            },
        });
    };

    //ReportSuite ComboBox onSelect value is the object { label,value }
    onReportSuiteSelect = ({ value, label }) => {
        const { reportSuites } = this.props;
        const matchingReportSuite = getMatchedReportSuiteBySuite(reportSuites, value);

        this.setState({
            searched: false,
            source: {
                ...this.state.source,
                name: label,
                dataSourceIds: [],
                reportSuiteIds: [matchingReportSuite.suite],
            },
        });
    };

    handleSignalSourceSelect = value => {
        if (this.isFilteredByOnboardedRecords()) {
            const { dataSources } = this.props;

            if (isValidDataSourceName(dataSources, value)) {
                const { dataSourceId } = getMatchedDataSourceByName(dataSources, value);

                this.setState(
                    {
                        searched: true,
                        source: {
                            ...this.state.source,
                            name: value,
                            dataSourceIds: [dataSourceId],
                        },
                    },
                    () => this.props.callSearch({ search: this.state }),
                );
            }
        }

        if (this.isFilteredByAdobeAnalytics()) {
            const { reportSuites } = this.props;

            if (isValidReportSuite(reportSuites, value)) {
                this.setState(
                    {
                        searched: true,
                        source: {
                            ...this.state.source,
                            name: formatReportSuiteOptionName(reportSuites, value),
                            reportSuiteIds: [value],
                        },
                    },
                    () => this.props.callSearch({ search: this.state }),
                );
            }
        }
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

    saveThisSearchMessage = () => getSaveThisSearchMessage(this.props.savedSearchLimit);

    getSearchResultsMessage = () =>
        getSearchResultsMessageBySignalTypeLabel(this.state.name, this.state.source.sourceType);

    renderEmptyState = () => {
        if (!this.state.searched) {
            return <EmptySearch className={styles.empty} variant={'explore'} />;
        }

        if (this.props.hasSearchFormError) {
            return <EmptySearch className={styles.empty} variant={'errorFetching'} />;
        }

        if (this.isSearchedWithNoResult()) {
            return <EmptySearch className={styles.empty} variant={'noResult'} />;
        }

        return <Wait size="L" centered />;
    };

    isSearchedWithNoResult = () =>
        this.props.isResultsLoaded && this.state.searched && !this.props.results.list.length;

    isSearchedWithResults = () =>
        this.props.isResultsLoaded && this.state.searched && this.props.results.list.length;

    isSearchDisabled = () =>
        !this.props.isResultsLoaded && this.state.searched && !this.props.hasError;

    isFilteredByOnboardedRecords = () => this.state.source.sourceType === 'ONBOARDED';

    isFilteredByAdobeAnalytics = () => this.state.source.sourceType === 'ANALYTICS';

    isFilteredBySignalSource = () =>
        this.state.searched &&
        (this.isFilteredByOnboardedRecords() || this.isFilteredByAdobeAnalytics());

    getSignalSources = () => {
        const { dataSources, reportSuites } = this.props;

        if (this.isFilteredByOnboardedRecords()) {
            return dataSources;
        }

        if (this.isFilteredByAdobeAnalytics()) {
            return reportSuites;
        }

        return [];
    };

    getSelectedSignalSource = () => {
        const { reportSuiteIds, name } = this.state.source;

        if (this.isFilteredByOnboardedRecords()) {
            return name;
        }

        if (this.isFilteredByAdobeAnalytics() && !this.state.advanced) {
            return reportSuiteIds[0];
        }

        //If advanced seach is enabled, the only filter should be used is the ReportSuitesComboBox in the search panel,
        //thus this filter above search table should be disabled;
        //Also the selected report suite should be coherent within search table result, not from the this.state.source
        if (this.isFilteredByAdobeAnalytics() && this.state.advanced) {
            return getSelectedReportSuiteFromSearchResults(this.props.results);
        }

        return '';
    };

    render() {
        const renderSignalSourceFilter = (
            <GridColumn size={3}>
                <SignalSourceFilter
                    disabled={this.state.advanced}
                    sourceType={this.state.source.sourceType}
                    signalSources={this.getSignalSources()}
                    onSignalSourceSelect={this.handleSignalSourceSelect}
                    selectedSignalSource={this.getSelectedSignalSource()}
                />
            </GridColumn>
        );

        const renderSignalTypeFilter = (
            <div className={styles.filterListContainer}>
                <SignalTypeFilter
                    onSignalTypeChange={this.handleSignalTypeChange}
                    signalType={this.state.source.sourceType}
                    isSearched={this.state.searched}
                />
            </div>
        );

        const renderSearchResultsHeading = (
            <GridColumn size={7}>
                <Heading size={3}>Search Results {this.getSearchResultsMessage()}</Heading>
            </GridColumn>
        );

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
                                error={this.props.savedSearchError}
                                disabled={this.isSearchDisabled()}
                            />
                            <Fragment>
                                <div className={styles.saveSearchExecution}>
                                    <SaveSearchExecution
                                        isSavedSearchLimitReached={
                                            this.props.isSavedSearchLimitReached
                                        }
                                        savedSearchLimit={this.props.savedSearchLimit}
                                        confirmSaveThisSearch={this.handleSaveThisSearchConfirm}
                                        cancelSaveSearch={this.props.cancelSaveSearch}
                                        updateSaveSearchName={this.props.updateSaveSearchName}
                                        trackSearchResultInDashboard={
                                            this.props.trackSearchResultInDashboard
                                        }
                                        selectDefaultSorting={this.props.selectDefaultSorting}
                                        changeSortingOrder={this.props.changeSortingOrder}
                                        error={this.props.saveSearchError}
                                    />
                                </div>
                                {!this.props.hasSaveSearchError && (
                                    <OverlayTooltip
                                        className={styles.saveSearchExecutionTooltip}
                                        message={this.saveThisSearchMessage()}
                                    />
                                )}
                            </Fragment>
                        </div>
                    </GridColumn>
                </GridRow>
                <div style={{ display: 'flex', marginTop: 20 }} data-test="search-results">
                    {!this.state.advanced && renderSignalTypeFilter}
                    <div className={styles.tableContainer}>
                        {this.state.searched && (
                            <GridRow valign="middle">
                                {renderSearchResultsHeading}
                                <GridColumn size={5}>
                                    <MultiSignalsTraitsCreationContainer
                                        canCreateTraits={this.props.permissions.canCreateTraits}
                                    />
                                </GridColumn>
                            </GridRow>
                        )}
                        {this.isSearchedWithResults() ? (
                            <Fragment>
                                {this.isFilteredBySignalSource() ? (
                                    <GridRow>
                                        {renderSignalSourceFilter}
                                        <GridColumn size={9}>
                                            <TraitsCreationWarning />
                                        </GridColumn>
                                    </GridRow>
                                ) : (
                                    <GridRow>
                                        <GridColumn size={9} offsetSize={3}>
                                            <TraitsCreationWarning />
                                        </GridColumn>
                                    </GridRow>
                                )}
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
                            </Fragment>
                        ) : (
                            <GridRow>
                                {this.isFilteredBySignalSource() && renderSignalSourceFilter}
                                <GridColumn size={12} style={{ position: 'relative' }}>
                                    {this.renderEmptyState()}
                                </GridColumn>
                            </GridRow>
                        )}
                    </div>
                </div>
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
    dataSources,
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
    saveSearchError: getSaveSearchError(errors),
    savedSearchError: getSavedSearchError(errors),
    hasSearchFormError: hasSearchFormError(errors),
    hasError: hasError(errors),
    permissions,
    dataSources: getDataSources(dataSources),
});
const actionCreators = {
    ...searchFormActionCreators,
    ...savedSearchActionCreators,
    selectSignals,
    populateSearchFields,
    clearSearchFields,
    fetchReportSuites,
    fetchUserRoles,
    fetchLimits,
    fetchDataSources,
};

export default connect(
    mapStateToProps,
    actionCreators,
)(SearchContainer);
