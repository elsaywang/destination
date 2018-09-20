import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './BetaTag.css';
import { Tag } from '@react/react-spectrum/TagList';

const BetaTag = ({ className }) => (
    <div className={classNames(className)}>
        <Tag value="Beta" disabled id="beta">
            Beta
        </Tag>
    </div>
);

BetaTag.propTypes = {
    className: PropTypes.string,
};
export default BetaTag;
