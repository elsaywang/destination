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
import Heading from '@react/react-spectrum/Heading';

function SavedSearchPopover({ search, onSavedSearchClick, isCurrentSearch }) {
    const boundClick = onSavedSearchClick.bind(this, search);
    // TODO: use i18n FormattedDate for start/end dates
    const startDate = new Date(search.startDate);
    const endDate = new Date(search.endDate);

    return (
        <Fragment>
            <OverlayTrigger trigger="hover" data-test="saved-search-overlay-trigger">
                <Tag
                    data-test="saved-search-tag"
                    id={isCurrentSearch ? 'currentTag' : null}
                    style={{ cursor: 'pointer' }}
                    key={search.name}
                    value={search.name}
                    onClick={boundClick}
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
                        <FieldLabel position="left" label="Signal Status:">
                            <span style={{ verticalAlign: 'bottom' }}>
                                {getSignalStatusLabel(search.signalStatus)}
                            </span>
                        </FieldLabel>

                        <FieldLabel position="left" label="Data Type:">
                            <span style={{ verticalAlign: 'bottom' }}>
                                {search.source.dataType}
                            </span>
                        </FieldLabel>

                        <FieldLabel position="left" label="Signal Source:">
                            <span style={{ verticalAlign: 'bottom' }}>
                                {getSignalTypeLabel(search.source.sourceType)}
                            </span>
                        </FieldLabel>

                        <FieldLabel position="left" label="View Records For:">
                            <span style={{ verticalAlign: 'bottom' }}>
                                {startDate.toDateString()} - {endDate.toDateString()}
                            </span>
                        </FieldLabel>
                    </div>

                    <Heading size="5" className={styles.heading}>
                        Sory By
                    </Heading>
                    <div>{search.sorting}</div>
                </Popover>
            </OverlayTrigger>
        </Fragment>
    );
}

SavedSearchPopover.propTypes = {
    search: PropTypes.object.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
    isCurrentSearch: PropTypes.bool.isRequired,
};

export default SavedSearchPopover;
