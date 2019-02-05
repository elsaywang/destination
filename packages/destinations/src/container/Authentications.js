import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../components/Table';
import styles from './Authentications.css';
import { columnsForAuthentications } from '../constants/columns';

class Authentications extends Component {
    renderCell = (column, data) => {
        const { destinationType } = data;
        const { key } = column;
        switch (key) {
            case 'action':
                return this.renderActionCell(data);
            case 'notifying':
                return <span>{data[key]}</span>;
            default:
                return <span>{data[key]}</span>;
        }
    };

    renderActionCell = data => {
        const { deleteDestination } = this.props;
        const currentRecordCategory = getCategoryByDestinationType(data.destinationType);

        const includeMetrics = this.isIntegratedPlatform(currentRecordCategory);

        return <Actions destination={data} handleDeleteDestination={deleteDestination} />;
    };
}

Authentications.propTypes = {
    fetchCredentials: PropTypes.func,
    authentications: PropTypes.shape({
        byIds: PropTypes.shape({
            id: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                enabled: PropTypes.bool,
                createdBy: PropTypes.string,
            }),
        }),
        idsToDisplay: PropTypes.arrayOf(PropTypes.number),
        sortColumn: PropTypes.object,
        sortDirection: PropTypes.oneOf([-1, 1]),
    }),
};
