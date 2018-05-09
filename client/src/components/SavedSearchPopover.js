import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Tag } from '@react/react-spectrum/TagList';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import { formatSignal } from '../utils/stringifySignals';
import { getDateRangeLabel } from '../constants/dateRangeOptions';
import { getSignalStatusLabel } from '../constants/signalStatusOptions';
import { getSignalTypeLabel } from '../constants/signalTypeOptions';
import { getSignalCategory } from '../constants/signalCategoryOptions';
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

        return `${intl.formatDate(search.customStartDate, formatDateOptions)} to ${intl.formatDate(
            search.customEndDate,
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

    render() {
        const { search, deleteSearch, isCurrentSearch } = this.props;
        const boundDeleteClick = deleteSearch.bind(this, search);

        return (
            <span className={styles.tagBlock}>
                <OverlayTrigger trigger="hover" data-test="saved-search-overlay-trigger">
                    <Tag
                        data-test="saved-search-tag"
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
                        <div>{search.name}</div>

                        <Heading size="5" className={styles.heading}>
                            Search Query
                        </Heading>
                        <div>{formatSignal(search)}</div>

                        <Heading size="5" className={styles.heading}>
                            Filters
                        </Heading>

                        <div>
                            <FieldLabel position="left" label="Signal Status">
                                <span style={{ verticalAlign: 'bottom' }}>
                                    {getSignalStatusLabel(search.signalStatus)}
                                </span>
                            </FieldLabel>

                            <FieldLabel position="left" label="Signal Category">
                                <span style={{ verticalAlign: 'bottom' }}>
                                    {getSignalCategory(search.source.sourceType)}
                                </span>
                            </FieldLabel>

                            <FieldLabel position="left" label="Signal Type">
                                <span style={{ verticalAlign: 'bottom' }}>
                                    {getSignalTypeLabel(search.source.sourceType)}
                                </span>
                            </FieldLabel>

                            <FieldLabel position="left" label="View Records For">
                                <span style={{ verticalAlign: 'bottom' }}>
                                    {this.getViewRecordsForLabel()}
                                </span>
                            </FieldLabel>
                        </div>

                        <Heading size="5" className={styles.heading}>
                            Sorting
                        </Heading>
                        <div>{search.sortBy}</div>
                    </Popover>
                </OverlayTrigger>
                {isCurrentSearch && (
                    <Button
                        data-test="saved-search-delete-button"
                        className={styles.button}
                        label={null}
                        onClick={boundDeleteClick}
                        variant="action"
                        icon={<DeleteOutline size="XS" />}
                    />
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
