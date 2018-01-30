import React, { Component } from 'react';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            keyValuePairs: [],
            dates: [],
        };
    }

    render() {
        return this.props.path;
    }
}

export default Search;
