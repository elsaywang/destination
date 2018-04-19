import React from 'react';
import ComboBox from '@react/react-spectrum/ComboBox';
import Switch from '@react/react-spectrum/Switch';

function AdvancedSearch({ enabled, filter, onAdvancedSearchChange, onFilterChange }) {
    // TODO: ComboBox onChange handler does not surface these options as objects,
    // will have to figure it out when implementing AAM-35130
    const filterOptions = [
        {
            label: 'test',
            dataSourceId: 1,
            reportSuiteId: 1,
        },
        {
            label: 'test2',
            dataSourceId: 2,
            reportSuiteId: 2,
        },
        {
            label: 'test3',
            dataSourceId: 3,
            reportSuiteId: 3,
        },
    ];

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
                value={filter.label}
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
