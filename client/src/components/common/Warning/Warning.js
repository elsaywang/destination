import React from 'react';
import styles from './Warning.css';
import Alert from '@react/react-spectrum/Icon/Alert';

const Warning = props => {
    return (
        <div className={styles.warning}>
            <Alert size="S" variant="warning" />
            {props.children}
        </div>
    );
};

export default Warning;
