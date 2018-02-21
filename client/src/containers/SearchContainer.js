import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SearchContainer.module.css';
import Search from '../components/Search';
import Table from '../components/Table';
import { callSearch } from '../actions';

function SearchContainer(props) {
    return (
        <Fragment>
            <h1 className={styles.header}>{props.location.pathname}</h1>
            <Search onSearch={callSearch} path={props.location.pathname} />
            <Table data={props.results} />
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        results: state.results,
    };
};

export default connect(mapStateToProps)(SearchContainer);
