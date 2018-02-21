import React, { Component } from 'react';
const initialSearchState = {
    kvp: [
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

function withSearchFilters(WrappedComponent) {
    return class SearchFilters extends Component {
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
            let kvp = [...this.state.kvp];

            kvp[event.target.id].key = value;
            this.setState({ kvp });
        };

        onValueChange = (value, event) => {
            let kvp = [...this.state.kvp];

            kvp[event.target.id].value = value;
            this.setState({ kvp });
        };

        onOperatorChange = (id, value) => {
            let kvp = [...this.state.kvp];

            kvp[id].operator = value;
            this.setState({ kvp });
        };

        onAddClick = () => {
            const nextId = this.state.kvp.length;
            const newKvp = {
                id: nextId,
                key: '',
                operator: '=',
                value: '',
            };

            this.setState(prevState => ({
                kvp: [...prevState.kvp, newKvp],
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
            this.props.onSearch(this.props);
        };

        onClearAll = () => {
            this.setState(initialSearchState);
        };

        render() {
            return (
                <WrappedComponent
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
    };
}

export default withSearchFilters;
