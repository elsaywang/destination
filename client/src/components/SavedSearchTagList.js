import React from 'react';
import PropTypes from 'prop-types';
import SavedSearchPopover from './SavedSearchPopover';
import { TagList } from '@react/react-spectrum/TagList';

function SavedSearchTagList({ list, onSavedSearchClick, deleteSearch, currentSearch, disabled }) {
    const renderTag = search => (
        <SavedSearchPopover
            key={search.name}
            search={search}
            onSavedSearchClick={onSavedSearchClick}
            isCurrentSearch={search.name === currentSearch}
            deleteSearch={deleteSearch}
            disabled={disabled}
        />
    );

    return (
        <TagList data-test="saved-search-tag-list" readOnly disabled={disabled}>
            {list.map(renderTag)}
        </TagList>
    );
}

SavedSearchTagList.propTypes = {
    list: PropTypes.array.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
    currentSearch: PropTypes.string.isRequired,
    deleteSearch: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default SavedSearchTagList;
