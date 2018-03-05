import React from 'react';
import Select from '@react/react-spectrum/Select';
import Switch from '@react/react-spectrum/Switch';

function AdvancedSearch({ enabled, onAdvancedSearchChange, onFilterChange }) {
    const filterOptions = [];

    return (
        <div>
            <Switch
                onChange={onAdvancedSearchChange}
                checked={enabled}
                aria-label="Advanced Search"
                label="Advanced search for Adobe Analytics. Search by key/value names and results in:"
            />
            <Select
                placeholder="Filter by report suite"
                onChange={onFilterChange}
                options={filterOptions}
                disabled={!enabled}
            />
        </div>
    );
}

export default AdvancedSearch;
