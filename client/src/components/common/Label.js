import React from 'react';
import classNames from 'classnames';
import styles from './Label.css';

function Label(props) {
    return (
        <span className={classNames(styles['inline-block'], props.className)} style={props.style}>
            <label htmlFor={props.labelFor} className={styles.label}>
                {props.value}
            </label>
            {props.children}
        </span>
    );
}

export default Label;
