import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SearchContainer.module.css';
import Search from '../components/Search';
import Table from '../components/Table';
import { callSearch } from '../actions';

class SearchContainer extends Component {
    componentDidMount() {
        if (this.props.location.pathname === '/aa') {
            // call API for report suites
        }
        // based off location, make API Call
        callSearch(this.props.location.pathname);
        // TODO: make saved searches api call
    }

    render() {
        return (
            <Fragment>
                <h1 className={styles.header}>{this.props.location.pathname}</h1>
                <Search path={this.props.location.pathname} />
                <Table data={this.props.search} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        search: state.search,
    };
};

export default connect(mapStateToProps)(SearchContainer);
