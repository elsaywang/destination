import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './SearchContainer.module.css';
import SearchFilters from './SearchFilters';
import Table from '../components/Table';
import { callSearch } from '../actions';

const items = [
    {
        keyValuePair: 'eVar1=acb382hfj',
        signalType: 'Actionable Log Files',
        signalSource: '—',
        totalCounts: '4,194,138',
        percentageChange: '+ 24.41%',
        includedInTraits: '2 Traits',
    },
    {
        keyValuePair: 'eVar4=CRM12345',
        signalType: 'Onboarded Records',
        signalSource: 'Data Source ABC DEF GHI JKL MNO',
        totalCounts: '1,139,451',
        percentageChange: '- 7.82%',
        includedInTraits: '3 Traits',
    },
];

function SearchContainer(props) {
    return (
        <Fragment>
            <h1 className={styles.header}>{props.location.pathname}</h1>
            <SearchFilters onSearch={props.callSearch} path={props.location.pathname} />
            <Table items={items} data={props.results} />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    test: state.test,
});

export default connect(mapStateToProps, { callSearch })(SearchContainer);
