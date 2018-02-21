import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SearchContainer.module.css';
import Search from '../components/Search';
import Table from '../components/Table';
import { callSearch } from '../actions';

class SearchContainer extends Component {
    render() {
        return (
            <Fragment>
                <h1 className={styles.header}>{this.props.location.pathname}</h1>
                <Search onSearch={callSearch} path={this.props.location.pathname} />
                <Table data={this.props.results} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.results,
    };
};

export default connect(mapStateToProps)(SearchContainer);
