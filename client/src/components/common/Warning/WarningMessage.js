import React from 'react';
import PropTypes from 'prop-types';

const WarningMessage = ({ content }) => <span>{content}</span>;

WarningMessage.propTypes = {
    content: PropTypes.string,
};
export default WarningMessage;
