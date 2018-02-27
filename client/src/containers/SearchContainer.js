import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SearchContainer.module.css';
import SearchFilters from './SearchFilters';
import Table from '../components/Table';
import { callSearch } from '../actions';

function SearchContainer(props) {
    return (
        <Fragment>
            <h1 className={styles.header}>{props.location.pathname}</h1>
            <SearchFilters onSearch={props.callSearch} path={props.location.pathname} />
            <Table data={props.results} />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    test: state.test,
});

export default connect(mapStateToProps, { callSearch })(SearchContainer);
