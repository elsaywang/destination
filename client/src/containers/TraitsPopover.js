import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import Link from '@react/react-spectrum/Link';
import Button from '@react/react-spectrum/Button';
import ChevronDown from '@react/react-spectrum/Icon/ChevronDown';
import Wait from '@react/react-spectrum/Wait';
import { fetchTrait } from '../utils/fetchTrait';

class TraitsPopover extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            loading: true,
            traits: [],
            error: '',
        };
        this.onPopoverClick = this.onPopoverClick.bind(this);
    }

    setStateAsync(state) {
        return new Promise(resolve => {
            this.setState(state, resolve);
        });
    }

    async onPopoverClick() {
        try {
            const responses = await Promise.all(this.props.sids.map(sid => fetchTrait(sid)));
            const traits = await Promise.all(
                responses.map(response => response.json().catch(e => e)),
            );

            await this.setStateAsync({
                loading: false,
                traits,
            });
        } catch (error) {
            await this.setStateAsync({
                loading: false,
                error,
            });
        }
    }

    renderContent = () => {
        return this.props.sids.map(sid => {
            const matchingTrait = this.state.traits.find(trait => trait.sid === sid);
            const label =
                matchingTrait && matchingTrait.name ? `${matchingTrait.name} - ${sid}` : sid;
            const traitUrl = `/portal/Traits/Traits.ddx#view/${sid}`;

            return (
                <Link key={sid} href={traitUrl}>
                    <div>{label}</div>
                </Link>
            );
        });
    };

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
                    <Popover title={'Included in ' + label} data-test="overlay-trigger-popover">
                        {this.state.loading || !this.state.traits.length ? (
                            <Wait />
                        ) : (
                            this.renderContent()
                        )}
                    </Popover>
                </OverlayTrigger>
            </Fragment>
        );
    }
}

TraitsPopover.propTypes = {
    sids: PropTypes.array.isRequired,
};

export default TraitsPopover;
