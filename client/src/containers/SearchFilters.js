import React, { Component } from 'react';
import Search from '../components/Search';
const initialSearchState = {
    keyValuePairs: [
        {
            id: 0,
            key: '',
            operator: '==',
            value: '',
        },
    ],
    status: 'all',
    advanced: false,
    filter: '',
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
            filter: '',
        });
    };

    onFilterChange = value => {
        this.setState({
            filter: value,
        });
    };

    onKeySelect = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).key = value;
        this.setState({ keyValuePairs });
    };

    onValueChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).value = value;
        this.setState({ keyValuePairs });
    };

    onOperatorChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === id).operator = value;
        this.setState({ keyValuePairs });
    };

    onAddClick = () => {
        const maxId = this.state.keyValuePairs[this.state.keyValuePairs.length - 1].id;
        const newKeyValuePair = {
            id: maxId + 1,
            key: '',
            operator: '==',
            value: '',
        };

        this.setState(prevState => ({
            keyValuePairs: [...prevState.keyValuePairs, newKeyValuePair],
        }));
    };

    onRemoveClick = id => {
        const { keyValuePairs } = this.state;
        const index = keyValuePairs.findIndex(kvp => kvp.id === Number(id));
        const newKeyValuePairs = [
            ...keyValuePairs.slice(0, index),
            ...keyValuePairs.slice(index + 1),
        ];

        this.setState({ keyValuePairs: newKeyValuePairs });
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
        this.props.onClearAll();
        this.setState({
            keyValuePairs: [
                {
                    id: 0,
                    key: '',
                    operator: '==',
                    value: '',
                },
            ],
            status: 'all',
            advanced: false,
            filter: '',
            viewRecordsFor: 7,
            minCount: 1000,
        });
    };

    render() {
        return (
            <Search
                {...this.state}
                onAdvancedSearchChange={this.onAdvancedSearchChange}
                onFilterChange={this.onFilterChange}
                onKeySelect={this.onKeySelect}
                onValueChange={this.onValueChange}
                onOperatorChange={this.onOperatorChange}
                onAddClick={this.onAddClick}
                onRemoveClick={this.onRemoveClick}
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
