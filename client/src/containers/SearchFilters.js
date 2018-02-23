import React, { Component } from 'react';
import Search from '../components/Search';
const initialSearchState = {
    keyValuePairs: [
        {
            id: 0,
            key: '',
            operator: '=',
            value: '',
        },
    ],
    status: 'all',
    advanced: false,
    viewRecordsFor: 7,
    minCount: 1000,
};

class SearchFilters extends Component {
    constructor() {
        super();

        this.state = initialSearchState;
    }

    onAdvancedSearchChange = value => {
        this.setState({
            advanced: value,
        });
    };

    onKeyChange = (value, event) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs[event.target.id].key = value;
        this.setState({ keyValuePairs });
    };

    onValueChange = (value, event) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs[event.target.id].value = value;
        this.setState({ keyValuePairs });
    };

    onOperatorChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs[id].operator = value;
        this.setState({ keyValuePairs });
    };

    onAddClick = () => {
        const nextId = this.state.keyValuePairs.length;
        const newKeyValuePair = {
            id: nextId,
            key: '',
            operator: '=',
            value: '',
        };

        this.setState(prevState => ({
            keyValuePairs: [...prevState.keyValuePairs, newKeyValuePair],
        }));
    };

    onStatusChange = value => {
        this.setState({
            status: value,
        });
    };

    onViewRecordsChange = value => {
        if (value === 'custom') {
            // AAM-34805
            // invoke custom date picker
            // set state to custom date range
        } else {
            this.setState({
                viewRecordsFor: value,
            });
        }
    };

    onMinCountChange = value => {
        this.setState({
            minCount: value,
        });
    };

    onSearch = () => {
        this.props.onSearch(this.state);
    };

    onClearAll = () => {
        this.setState(initialSearchState);
    };

    render() {
        return (
            <Search
                {...this.state}
                onAdvancedSearchChange={this.onAdvancedSearchChange}
                onKeyChange={this.onKeyChange}
                onValueChange={this.onValueChange}
                onOperatorChange={this.onOperatorChange}
                onAddClick={this.onAddClick}
                onStatusChange={this.onStatusChange}
                onViewRecordsChange={this.onViewRecordsChange}
                onMinCountChange={this.onMinCountChange}
                onSearch={this.onSearch}
                onClearAll={this.onClearAll}
            />
        );
    }
}

export default SearchFilters;
