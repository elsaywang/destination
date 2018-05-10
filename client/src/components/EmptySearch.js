import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Empty from './common/Empty';
import styles from './EmptySearch.css';
import Explore from '../images/explore.svg';
import NoResult from '../images/noResult.svg';
import { getEmptyOptions } from '../constants/emptyOptions';

function EmptySearch({ variant, className }) {
    const getMessageStyle = () => {
        switch (variant) {
            case 'explore':
                return styles.exploreMessage;
            case 'noResult':
                return styles.noResultMessage;
            default:
                return '';
        }
    };
    const getImageClass = () => {
        switch (variant) {
            case 'explore':
                return styles.exploreImage;
            case 'noResult':
                return styles.noResultImage;
            default:
                return '';
        }
    };
    const getImageSrc = () => {
        switch (variant) {
            case 'explore':
                return Explore;
            case 'noResult':
                return NoResult;
            default:
                return '';
        }
    };
    return (
        <Empty
            className={className}
            title={getEmptyOptions(variant).title}
            message={getEmptyOptions(variant).message}
            messageStyle={getMessageStyle()}>
            <img
                src={getImageSrc()}
                data-test={getEmptyOptions(variant).dataTest}
                className={getImageClass()}
                alt={getEmptyOptions(variant).imageAlt}
            />
        </Empty>
    );
}

EmptySearch.propTypes = {
    variant: PropTypes.oneOf(['explore', 'noResult']).isRequired,
    className: PropTypes.string,
};

export default EmptySearch;
