import React from 'react';
import Select from '@react/react-spectrum/Select';
import Switch from '@react/react-spectrum/Switch';

function AdvancedSearch(props) {
    const filterOptions = [];

    return (
        <div>
            <Switch
                onChange={props.onAdvancedSearchChange}
                aria-label="Advanced Search"
                label="Advanced search for Adobe Analaytics. Search by key/value names and results in:"
            />
            <Select
                placeholder="Filter by report suite"
                onChange={props.onFilterChange}
                options={filterOptions}
                disabled
            />
        </div>
    );
}

export default AdvancedSearch;
