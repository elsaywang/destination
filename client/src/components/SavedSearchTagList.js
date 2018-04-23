import React from 'react';
import PropTypes from 'prop-types';
import { TagList, Tag } from '@react/react-spectrum/TagList';

function SavedSearchTagList({ list, onSavedSearchClick }) {
    const renderTag = search => (
        <Tag
            data-test="saved-search-tag"
            style={{ cursor: 'pointer' }}
            key={search.name}
            value={search.name}
            onClick={onSavedSearchClick.bind(this, search)}
        />
    );

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
