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
        const id = event.target.closest('.key-search').children[0].getAttribute('data-id');

        keyValuePairs.find(kvp => kvp.id === Number(id)).key = value;
        this.setState({ keyValuePairs });
    };

    onValueChange = (value, event) => {
        let keyValuePairs = [...this.state.keyValuePairs];
        const id = event.target.closest('.value-search').children[0].getAttribute('data-id');

        keyValuePairs.find(kvp => kvp.id === Number(id)).value = value;
        this.setState({ keyValuePairs });
    };

    onOperatorChange = (id, value) => {
        let keyValuePairs = [...this.state.keyValuePairs];

        keyValuePairs.find(kvp => kvp.id === Number(id)).operator = value;
        this.setState({ keyValuePairs });
    };

    onAddClick = () => {
        const maxId = this.state.keyValuePairs[this.state.keyValuePairs.length - 1].id;
        const newKeyValuePair = {
            id: maxId + 1,
            key: '',
            operator: '=',
            value: '',
        };

        this.setState(prevState => ({
            keyValuePairs: [...prevState.keyValuePairs, newKeyValuePair],
        }));
    };

    onRemoveClick = event => {
        const id = event.target.closest('button').getAttribute('data-id');
        const index = this.state.keyValuePairs.findIndex(kvp => kvp.id === Number(id));
        const keyValuePairs = [
            ...this.state.keyValuePairs.slice(0, index),
            ...this.state.keyValuePairs.slice(index + 1),
        ];

        this.setState({ keyValuePairs });
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
        this.setState({
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
        });
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
