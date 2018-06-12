import React from 'react';
import PropTypes from 'prop-types';
import SavedSearchPopover from './SavedSearchPopover';
import { TagList } from '@react/react-spectrum/TagList';
import styles from './SavedSearchTagList.css';

function SavedSearchTagList({ list, onSavedSearchClick, deleteSearch, currentSearch }) {
    const renderTag = search => (
        <SavedSearchPopover
            key={search.name}
            search={search}
            onSavedSearchClick={onSavedSearchClick}
            isCurrentSearch={search.name === currentSearch}
            deleteSearch={deleteSearch}
        />
    );

    return list.length ? (
        <TagList data-test="saved-search-tag-list" readOnly>
            {list.map(renderTag)}
        </TagList>
    ) : (
        <span className={styles.noSavedSearches}>No Saved Searches</span>
    );
}

SavedSearchTagList.propTypes = {
    list: PropTypes.array.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
    currentSearch: PropTypes.string.isRequired,
    deleteSearch: PropTypes.func.isRequired,
};

export default SavedSearchTagList;
