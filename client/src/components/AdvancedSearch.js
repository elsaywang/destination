import React from 'react';
import ComboBox from '@react/react-spectrum/ComboBox';
import Switch from '@react/react-spectrum/Switch';

const AdvancedSearch = ({
    enabled,
    sourceName,
    onAdvancedSearchChange,
    onFilterChange,
    onFilterSelect,
    reportSuites,
}) => {
    const options = reportSuites.map(rs => rs.name);

    return (
        <div data-test="advanced-search">
            <Switch
                className="advanced-search-toggle"
                onChange={onAdvancedSearchChange}
                checked={enabled}
                data-test="advanced-search-toggle"
                aria-label="Advanced Search"
                label="Advanced search for Adobe Analytics. Search by key/value names and results in:"
            />
            <ComboBox
                value={enabled ? sourceName : ''}
                data-test="advanced-search-filter"
                placeholder="Filter by report suite"
                onChange={onFilterChange}
                onSelect={value => onFilterSelect(value)}
                options={options}
                disabled={!enabled}
                quiet
            />
        </div>
    );
};

export default AdvancedSearch;
