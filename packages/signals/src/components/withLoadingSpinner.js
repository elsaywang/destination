import React from 'react';
import Wait from '@react/react-spectrum/Wait';

function withLoadingSpinner(Component) {
    return function load({ isLoaded, ...props }) {
        return isLoaded ? <Component {...props} /> : <Wait />;
    };
}

export default withLoadingSpinner;
