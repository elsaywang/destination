import React from 'react';
import ComboBox from '@react/react-spectrum/ComboBox';
import Switch from '@react/react-spectrum/Switch';

function AdvancedSearch({ enabled, filter, onAdvancedSearchChange, onFilterChange }) {
    const filterOptions = ['test', 'test2', 'test3'];

    return (
        <div data-test="advanced-search">
            <Switch
                onChange={onAdvancedSearchChange}
                checked={enabled}
                data-test="advanced-search-toggle"
                aria-label="Advanced Search"
                label="Advanced search for Adobe Analytics. Search by key/value names and results in:"
            />
            <ComboBox
                value={filter}
                data-test="advanced-search-filter"
                placeholder="Filter by report suite"
                onChange={onFilterChange}
                options={filterOptions}
                disabled={!enabled}
                quiet
            />
        </div>
    );
}

export default AdvancedSearch;
