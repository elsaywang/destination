import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormItem } from '@react/react-spectrum/Form';
import { getFooterCopyRightMessage, languageOption } from '../constants/footerOptions';
import { footerUrls } from '../utils/urls';
import styles from './Footer.css';
import classNames from 'classnames';

function Footer(props) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                {footerUrls.map(({ item, url }) => (
                    <a
                        key={item}
                        target="_blank"
                        className={classNames(styles.footerLinks, styles.footerLinkItem)}
                        href={url}>
                        {item}
                    </a>
                ))}
                <label htmlFor={styles.footerLanguage} className={styles.footerLabel}>
                    {languageOption.label}
                </label>
                <a href="#" className={styles.footerLanguage}>
                    {languageOption.option}
                </a>
            </div>
            <div className={styles.footerCopyRight}>{getFooterCopyRightMessage()}</div>
        </footer>
    );
}

export default Footer;
