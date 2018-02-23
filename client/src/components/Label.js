import React from 'react';
import styles from './Label.css';

function Label(props) {
    return (
        <span className={styles['inline-block']}>
            <label className={styles.label}>{props.value}</label>
            {props.children}
        </span>
    );
}

export default Label;
