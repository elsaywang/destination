import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Search from '@react/react-spectrum/Search';
import { fetchDestinations, applySearch } from '../../redux/actions/destinations';
import styles from '../../components/Layout';

class SearchWrapper extends Component {
    fetchDestinationsDebounced = _.debounce(this.props.fetchDestinations, 500);

    render() {
        const { destinations, applySearch } = this.props;
        return (
            <Search
                className={styles.search}
                id={`destinations-search`}
                placeholder="Search"
                onChange={query => {
                    applySearch(query);
                    this.fetchDestinationsDebounced();
                }}
                value={destinations.searchFormText}
            />
        );
    }
}

SearchWrapper.propTypes = {
    fetchDestinations: PropTypes.func,
};

export default connect(
    destinations => destinations,
    { fetchDestinations, applySearch },
)(SearchWrapper);
