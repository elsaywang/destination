import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';
import MetricsView from './MetricsView';

const Action = ({ disabled, destination, showMetrics, handleDeleteDestination }) => (
    <Fragment>
        <EditAction destination={destination} disabled={disabled} />
        <DeleteAction
            destination={destination}
            disabled={disabled}
            deleteDestination={handleDeleteDestination}
        />
        {showMetrics && <MetricsView destination={destination} disabled={disabled} />}
    </Fragment>
);

Action.defaultProps = {
    disabled: false,
};

Action.protoTypes = {
    destination: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    showMetrics: PropTypes.bool,
    handleDeleteDestination: PropTypes.func,
};
export default Action;
