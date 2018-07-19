import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import Link from '@react/react-spectrum/Link';
import Button from '@react/react-spectrum/Button';
import ChevronDown from '@react/react-spectrum/Icon/ChevronDown';
import Wait from '@react/react-spectrum/Wait';
import { fetchTrait } from '../utils/fetchTrait';
import { maxVisibleTraits } from '../constants/includedInTraitsConstants';
import styles from './TraitsPopover.css';

class TraitsPopover extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            traits: [],
            hasError: false,
        };
        this.onPopoverClick = this.onPopoverClick.bind(this);
    }

    static defaultProps = {
        maxVisibleTraits,
    };

    setStateAsync(state) {
        return new Promise(resolve => {
            this.setState(state, resolve);
        });
    }

    async onPopoverClick() {
        const responses = await Promise.all(
            this.props.sids.slice(0, this.props.maxVisibleTraits).map(sid => fetchTrait(sid)),
        );
        const successfulResponses = responses.filter(({ ok }) => ok === true);
        const traits = await Promise.all(successfulResponses.map(response => response.json()));

        await this.setStateAsync({
            traits,
            loading: false,
            hasError: traits.length === 0,
        });
    }

    renderAndMore = () => {
        const extraTraits = this.props.sids.length - this.state.traits.length;

        return extraTraits ? (
            <div className={styles.andMore}>
                And {this.props.sids.length - this.state.traits.length} more.
            </div>
        ) : null;
    };

    renderTraitLinks = () => {
        return this.state.traits.map(({ sid, name }) => {
            const label = `${name} - ${sid}`;
            const traitUrl = `/portal/Traits/Traits.ddx#view/${sid}`;

            return (
                <Link key={sid} href={traitUrl} className={styles.traitLink}>
                    <span className={styles.traitName}>{name}</span>
                    <span className={styles.traitSid}>({sid})</span>
                </Link>
            );
        });
    };

    renderContent = () =>
        this.state.hasError ? (
            <Fragment>
                <div>Sorry, these traits are unavailable.</div>
                <div>You may not have permissions to view them.</div>
            </Fragment>
        ) : (
            <Fragment>
                {this.renderTraitLinks()}
                {this.renderAndMore()}
            </Fragment>
        );

    render() {
        const { sids } = this.props;
        const singular = 'Trait';
        const plural = 'Traits';
        const number = sids.length;
        const label = number + ' ' + (number === 1 ? singular : plural);

        return (
            <Fragment>
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    onShow={this.onPopoverClick}
                    data-test="overlay-trigger">
                    <Button
                        quiet
                        variant="action"
                        icon={<ChevronDown />}
                        data-test="overlay-trigger-button">
                        {label}
                    </Button>
                    <Popover
                        title={'Included in ' + label}
                        className={styles.traitPopover}
                        data-test="overlay-trigger-popover">
                        {this.state.loading ? <Wait /> : this.renderContent()}
                    </Popover>
                </OverlayTrigger>
            </Fragment>
        );
    }
}

TraitsPopover.propTypes = {
    sids: PropTypes.array.isRequired,
    maxVisibleTraits: PropTypes.number,
};

export default TraitsPopover;
