import React from 'react';
import PropTypes from 'prop-types';
import { TagList, Tag } from '@react/react-spectrum/TagList';

function SavedSearchTagList(props) {
    const renderTag = search => <Tag key={search.id} value={search.name} />;

    return (
        <TagList data-test="saved-search-tag-list" readOnly>
            {props.list.map(renderTag)}
        </TagList>
    );
}

SavedSearchTagList.propTypes = {
    list: PropTypes.array.isRequired,
};

export default SavedSearchTagList;
