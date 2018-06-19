import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Tag } from '@react/react-spectrum/TagList';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Popover from '@react/react-spectrum/Popover';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import { formatSignal } from '../utils/stringifySignals';
import { getDateRangeLabel } from '../constants/dateRangeOptions';
import { getSignalStatusLabel } from '../constants/signalStatusOptions';
import { getSignalTypeLabel } from '../constants/signalTypeOptions';
import { getSignalCategory } from '../constants/signalCategoryOptions';
import { getSortLabel } from '../constants/sortOptions';
import styles from './SavedSearchPopover.css';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import DeleteOutline from '@react/react-spectrum/Icon/DeleteOutline';

class SavedSearchPopover extends Component {
    onSavedSearchClick = search => {
        this.props.onSavedSearchClick(search);
    };

    getCustomDateRangeLabel() {
        const { search, intl } = this.props;
        const { customStartDate, customEndDate } = search;
        const formatDateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        };

        return `${intl.formatDate(customStartDate, formatDateOptions)} to ${intl.formatDate(
            customEndDate,
            formatDateOptions,
        )}`;
    }

    getViewRecordsForLabel() {
        const { search } = this.props;
        const isCustomDateRangeEnabled = search.viewRecordsFor === 'custom';

        return isCustomDateRangeEnabled
            ? this.getCustomDateRangeLabel()
            : getDateRangeLabel(search.viewRecordsFor);
    }

    getSignalSourceLabel(source) {
        if (source.reportSuiteIds.length) {
            return 'Report Suite';
        }

        if (source.dataSourceIds.length) {
            return 'Onboarded Record';
        }

        return '';
    }

    canDelete() {
        const { isCurrentSearch, search } = this.props;
        const { presetId } = search;
        const isSavedSearchPreset = Boolean(presetId);

        return isCurrentSearch && !isSavedSearchPreset;
    }

    renderSignalSource(source) {
        return source.reportSuiteIds.length || source.dataSourceIds.length ? (
            <FieldLabel position="left" label={this.getSignalSourceLabel(source)}>
                <span
                    style={{ verticalAlign: 'bottom' }}
                    data-test="saved-search-popover-signal-source">
                    {source.name}
                </span>
            </FieldLabel>
        ) : null;
    }

    render() {
        const { search, deleteSearch, isCurrentSearch } = this.props;
        const boundDeleteClick = deleteSearch.bind(this, search);

        return (
            <span className={styles.tagBlock}>
                <OverlayTrigger trigger="hover" data-test="saved-search-overlay-trigger">
                    <Tag
                        data-test="saved-search-tag"
                        data-saved-search-id={search.id}
                        data-saved-search-preset={search.presetId}
                        id={isCurrentSearch ? 'isCurrentSearch' : null}
                        className={styles.tag}
                        key={search.name}
                        value={search.name}
                        onClick={() => this.onSavedSearchClick(search)}
                    />
                    <Popover title={search.name} data-test="saved-search-popover">
                        <Heading size="5" className={styles.heading}>
                            Name
                        </Heading>
                        <div data-test="saved-search-popover-name">{search.name}</div>

                        <Heading size="5" className={styles.heading}>
                            Search Query
                        </Heading>
                        <div data-test="saved-search-popover-search-query">
                            {formatSignal(search)}
                        </div>

                        <Heading size="5" className={styles.heading}>
                            Filters
                        </Heading>

                        <div>
                            <FieldLabel position="left" label="Signal Status">
                                <span
                                    style={{ verticalAlign: 'bottom' }}
                                    data-test="saved-search-popover-signal-status">
                                    {getSignalStatusLabel(search.signalStatus)}
                                </span>
                            </FieldLabel>

                            <FieldLabel position="left" label="Signal Category">
                                <span
                                    style={{ verticalAlign: 'bottom' }}
                                    data-test="saved-search-popover-signal-category">
                                    {getSignalCategory(search.source.sourceType)}
                                </span>
                            </FieldLabel>

                            {search.source.sourceType && (
                                <FieldLabel position="left" label="Signal Type">
                                    <span
                                        style={{ verticalAlign: 'bottom' }}
                                        data-test="saved-search-popover-signal-type">
                                        {getSignalTypeLabel(search.source.sourceType)}
                                    </span>
                                </FieldLabel>
                            )}

                            {search.source.sourceType && this.renderSignalSource(search.source)}

                            {search.filterNewSignals && (
                                <FieldLabel position="left" label="New Signals">
                                    <span
                                        style={{ verticalAlign: 'bottom' }}
                                        data-test="saved-search-popover-filter-new">
                                        Yes
                                    </span>
                                </FieldLabel>
                            )}

                            <FieldLabel position="left" label="View Records For">
                                <span
                                    style={{ verticalAlign: 'bottom' }}
                                    data-test="saved-search-popover-view-records-for">
                                    {this.getViewRecordsForLabel()}
                                </span>
                            </FieldLabel>
                        </div>

                        <Heading size="5" className={styles.heading}>
                            Sorting
                        </Heading>
                        <div data-test="saved-search-popover-sort-by">
                            {getSortLabel(search.sortBy)}
                        </div>
                    </Popover>
                </OverlayTrigger>
                {this.canDelete() && (
                    <ModalTrigger>
                        <Button
                            data-test="saved-search-delete-button"
                            className={styles.button}
                            label={null}
                            variant="action"
                            icon={<DeleteOutline size="XS" />}
                            modaltrigger
                        />
                        <Dialog
                            data-test="saved-search-delete-modal"
                            modalcontent
                            title="Delete Saved Search"
                            confirmLabel="Delete"
                            size="S"
                            cancelLabel="Cancel"
                            onConfirm={boundDeleteClick}
                            variant="destructive">
                            <span>
                                Are you sure you want to delete this saved search: {search.name}?
                            </span>
                        </Dialog>
                    </ModalTrigger>
                )}
            </span>
        );
    }
}

SavedSearchPopover.propTypes = {
    search: PropTypes.object.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
    isCurrentSearch: PropTypes.bool.isRequired,
    deleteSearch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(SavedSearchPopover);
