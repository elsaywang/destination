import * as actionCreators from '../actions';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SearchContainer.module.css';
import SearchFilters from './SearchFilters';
import Table from '../components/Table';

function SearchContainer(props) {
    return (
        <Fragment>
            <h1 className={styles.header}>{props.location.pathname}</h1>
            <SearchFilters onSearch={props.callSearch} path={props.location.pathname} />
            <Table />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    results: state.results,
    savedSearches: state.savedSearches,
});

export default connect(mapStateToProps, actionCreators)(SearchContainer);
