import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';

class PercentageChange extends Component {
    render() {
        return (
            <FormattedNumber
                value={this.props.percentageChange}
                style="percent"
                minimumFractionDigits={2}
            />
        );
    }
}

export default PercentageChange;
