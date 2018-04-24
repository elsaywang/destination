import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@react/react-spectrum/TagList';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import Label from './common/Label';
import { formatSignal } from '../utils/stringifySignals';
import { getSignalStatusLabel } from '../constants/signalStatusOptions';
import { getSignalTypeLabel } from '../constants/signalTypeOptions';
import styles from './SavedSearchPopover.css';

function SavedSearchPopover({ search, onSavedSearchClick }) {
    const boundClick = onSavedSearchClick.bind(this, search);
    // TODO: use i18n FormattedDate for start/end dates
    const startDate = new Date(search.startDate);
    const endDate = new Date(search.endDate);

    return (
        <Fragment>
            <OverlayTrigger trigger="hover" data-test="saved-search-overlay-trigger">
                <Tag
                    data-test="saved-search-tag"
                    style={{ cursor: 'pointer' }}
                    key={search.name}
                    value={search.name}
                    onClick={boundClick}
                />
                <Popover title={search.name} data-test="saved-search-popover">
                    <FieldLabel style={{ textTransform: 'uppercase' }} label="Name">
                        <div className={styles.block}>{search.name}</div>
                    </FieldLabel>

                    <FieldLabel style={{ textTransform: 'uppercase' }} label="Search Query">
                        <div className={styles.block}>{formatSignal(search)}</div>
                    </FieldLabel>

                    <Label
                        style={{ textTransform: 'uppercase', marginTop: 0 }}
                        value="Filters"
                        className={styles.block}>
                        <div>
                            <span className={styles['text-label']}>Signal Status: </span>
                            <span style={{ verticalAlign: 'bottom' }}>
                                {getSignalStatusLabel(search.signalStatus)}
                            </span>
                        </div>

                        <div>
                            <span className={styles['text-label']}>Data Type: </span>
                            <span style={{ verticalAlign: 'bottom' }}>
                                {search.source.dataType}
                            </span>
                        </div>

                        <div>
                            <span className={styles['text-label']}>Signal Source: </span>
                            <span style={{ verticalAlign: 'bottom' }}>
                                {getSignalTypeLabel(search.source.sourceType)}
                            </span>
                        </div>

                        <div>
                            <span className={styles['text-label']}>View Records For: </span>
                            <span style={{ verticalAlign: 'bottom' }}>
                                {startDate.toDateString()} - {endDate.toDateString()}
                            </span>
                        </div>
                    </Label>

                    <FieldLabel style={{ textTransform: 'uppercase' }} label="Sorting">
                        <div className={styles.block}>{search.sorting}</div>
                    </FieldLabel>
                </Popover>
            </OverlayTrigger>
        </Fragment>
    );
}

SavedSearchPopover.propTypes = {
    search: PropTypes.object.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
};

export default SavedSearchPopover;
