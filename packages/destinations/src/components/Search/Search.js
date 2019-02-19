import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import Search from '@react/react-spectrum/Search';
import { fetchDestinations } from '../../redux/actions/destinations';
import { updateUrl } from '../../utils/updateUrl';
import styles from '../../components/Layout';

class SearchWrapper extends Component {
    state = { searchText: this.props.destinations.searchFormText };

    handleChange = query => {
        updateUrl(this.props.history, { search: query });
        this.props.fetchDestinations();
    };

    handleChangeDebounced = _.debounce(this.handleChange, 500);

    componentWillReceiveProps({ destinations: { searchFormText } }) {
        this.setState({ searchText: searchFormText });
    }

    render() {
        return (
            <Search
                className={styles.search}
                id={`destinations-search`}
                placeholder="Search"
                onChange={query => {
                    this.setState({ searchText: query }, () => this.handleChangeDebounced(query));
                }}
                value={this.state.searchText}
            />
        );
    }
}

SearchWrapper.propTypes = {
    fetchDestinations: PropTypes.func,
};

export default withRouter(
    connect(
        destinations => destinations,
        { fetchDestinations },
    )(SearchWrapper),
);
