import React from 'react';
import PropTypes from 'prop-types';
import SavedSearchPopover from './SavedSearchPopover';
import { TagList } from '@react/react-spectrum/TagList';

function SavedSearchTagList({ list, onSavedSearchClick }) {
    const renderTag = search => <SavedSearchPopover key={search.name} search={search} onSavedSearchClick={onSavedSearchClick} />;

    return (
        <TagList data-test="saved-search-tag-list" readOnly>
            {list.map(renderTag)}
        </TagList>
    );
}

SavedSearchTagList.propTypes = {
    list: PropTypes.array.isRequired,
    onSavedSearchClick: PropTypes.func.isRequired,
};

export default SavedSearchTagList;
