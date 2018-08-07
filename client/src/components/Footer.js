import React from 'react';
import { getFooterCopyRightMessage, languageOption } from '../constants/footerOptions';
import { footerUrls } from '../utils/urls';
import styles from './Footer.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                {footerUrls.map(({ item, url }) => (
                    <a
                        key={item}
                        target="_blank"
                        rel="noopener"
                        className={styles.footerLinks}
                        href={url}>
                        {item}
                    </a>
                ))}
                <label htmlFor={styles.footerLanguage}>{languageOption.label}</label>
                <a href="#" rel="noopener" className={styles.footerLanguage}>
                    {languageOption.option}
                </a>
            </div>
            <div className={styles.footerCopyRight}>{getFooterCopyRightMessage()}</div>
        </footer>
    );
}

export default Footer;
