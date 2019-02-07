import React, { Fragment } from 'react';
import requiredIf from 'react-required-if';
import PropTypes from 'prop-types';
import DeleteAction from './DeleteAction';
import Activation from './Activation';
import EditAction from './EditAction';
import MetricsView from './MetricsView';
import styles from './action.css';

const Actions = ({ destination, authentication, showMetrics, ...moreProps }) => {
    const { disabled, isForDestination } = moreProps;

    const renderActionsForDestinations = (
        <Fragment>
            <EditAction destination={destination} disabled={disabled} />
            <DeleteAction destination={destination} {...moreProps} />
            {showMetrics && <MetricsView destination={destination} disabled={disabled} />}
        </Fragment>
    );

    const renderActionsForAuthentications = (
        <Fragment>
            <Activation authentication={authentication} disabled={disabled} />
            <DeleteAction authentication={authentication} {...moreProps} />
        </Fragment>
    );

    return (
        <div className={styles.actions}>
            {isForDestination ? renderActionsForDestinations : renderActionsForAuthentications}
        </div>
    );
};

Actions.defaultProps = {
    disabled: false,
    isForDestination: true,
};

Actions.propTypes = {
    destination: requiredIf(
        PropTypes.shape({
            destinationId: PropTypes.number,
            name: PropTypes.string,
            destinationType: PropTypes.oneOf(['PEOPLE_BASED', 'S2S', 'PUSH', 'ADS', 'ANALYTICS']),
        }),
        ({ isForDestination }) => isForDestination,
    ),
    authentication: requiredIf(
        PropTypes.shape({
            adAccountId: PropTypes.number,
            accountName: PropTypes.string,
        }),
        ({ isForDestination }) => !isForDestination,
    ),
    isForDestination: PropTypes.bool,
    disabled: PropTypes.bool,
    showMetrics: requiredIf(PropTypes.bool, ({ isForDestination }) => isForDestination),
    handleDeleteAction: PropTypes.func,
};
export default Actions;
