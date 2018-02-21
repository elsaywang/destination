import React from 'react';
import Select from '@react/react-spectrum/Select';
import Switch from '@react/react-spectrum/Switch';

function AdvancedSearch({ onAdvancedSearchChange, onFilterChange }) {
    const filterOptions = [];

    return (
        <div>
            <Switch
                onChange={onAdvancedSearchChange}
                aria-label="Advanced Search"
                label="Advanced search for Adobe Analaytics. Search by key/value names and results in:"
            />
            <Select
                placeholder="Filter by report suite"
                onChange={onFilterChange}
                options={filterOptions}
                disabled
            />
        </div>
    );
}

export default AdvancedSearch;
