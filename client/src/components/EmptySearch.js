import React from 'react';
import PropTypes from 'prop-types';
import EmptyPlaceholder from './common/EmptyPlaceholder';
import styles from './EmptySearch.css';
import Explore from '../images/explore.svg';
import NoResult from '../images/noResult.svg';
import { getEmptyOptions } from '../constants/emptyOptions';
import { getStaticUrl } from '../lib/getStaticUrl';

function EmptySearch({ variant, className }) {
    const getMessageStyle = () => {
        switch (variant) {
            case 'explore':
                return styles.exploreMessage;
            case 'noResult':
                return styles.noResultMessage;
            case 'errorFetching':
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
            case 'errorFetching':
                return styles.noResultImage;
            default:
                return '';
        }
    };
    const getImageSrc = () => {
        switch (variant) {
            case 'explore':
                return `${getStaticUrl()}${Explore}`;
            case 'noResult':
                return `${getStaticUrl()}${NoResult}`;
            case 'errorFetching':
                return `${getStaticUrl()}${NoResult}`;
            default:
                return '';
        }
    };

    return (
        <EmptyPlaceholder
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
        </EmptyPlaceholder>
    );
}

EmptySearch.propTypes = {
    variant: PropTypes.oneOf(['explore', 'noResult']).isRequired,
};

export default EmptySearch;
