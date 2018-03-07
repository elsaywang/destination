import React from 'react';
import styles from './Label.css';

function Label(props) {
    return (
        <span className={styles['inline-block']}>
            <label htmlFor={props.labelFor} className={styles.label}>
                {props.value}
            </label>
            {props.children}
        </span>
    );
}

export default Label;
