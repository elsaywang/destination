import React, { Fragment } from 'react';
import requiredIf from 'react-required-if';
import PropTypes from 'prop-types';
import DeleteAction from './DeleteAction';
import Activation from './Activation';
import EditAction from './EditAction';
import MetricsView from './MetricsView';
import styles from './action.css';

const Actions = ({ isForDestination, disabled, ...actionsProps }) => {
    const { destination, showMetrics } = isForDestination && actionsProps;
    const { authentication } = !isForDestination && actionsProps;

    return (
        <div className={styles.actions}>
            {isForDestination ? (
                <Fragment>
                    <EditAction destination={destination} disabled={disabled} />
                    <DeleteAction destination={destination} isForDestination={isForDestination} />
                    {showMetrics && <MetricsView destination={destination} disabled={disabled} />}
                </Fragment>
            ) : (
                <Fragment>
                    <Activation authentication={authentication} disabled={disabled} />
                    <DeleteAction
                        authentication={authentication}
                        isForDestination={isForDestination}
                    />
                </Fragment>
            )}
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
            adAccountId: PropTypes.string,
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
