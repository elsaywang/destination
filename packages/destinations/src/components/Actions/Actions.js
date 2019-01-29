import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';
import MetricsView from './MetricsView';

const Actions = ({ disabled, destination, showMetrics, handleDeleteDestination }) => (
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

Actions.defaultProps = {
    disabled: false,
};

Actions.propTypes = {
    destination: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    showMetrics: PropTypes.bool,
    handleDeleteDestination: PropTypes.func,
};
export default Actions;