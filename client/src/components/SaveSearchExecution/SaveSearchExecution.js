import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Tooltip from '@react/react-spectrum/Tooltip';
// TODO: BRING BACK PopOver once it's fixed
// import Popover from '@react/react-spectrum/Popover';
import Dialog from '@react/react-spectrum/Dialog';
import styles from './SaveSearchExecution.css';
import SaveSearchExecutionContent from './SaveSearchExecutionContent';
import { saveSearch } from './saveSearchExecutionMessages';
import { getMaxSavedSearchTooltipMessage } from '../../constants/tooltipMessageOptions';
import InlineErrorMessage from '../../components/common/InlineErrorMessage';

class SaveSearchExecution extends Component {
    renderButton() {
        const { isSavedSearchLimitReached, savedSearchLimit } = this.props;
        const button = (
            <Button
                data-test="save-this-search-button"
                label={saveSearch}
                variant="action"
                quiet
                icon={<Add />}
                disabled={isSavedSearchLimitReached}
            />
        );

        return isSavedSearchLimitReached ? (
            <div data-test="save-this-search-button-overlay-trigger">
                <OverlayTrigger trigger={['hover', 'focus']} placement="top">
                    {button}
                    <Tooltip data-test="saved-search-limit-message">
                        {getMaxSavedSearchTooltipMessage(savedSearchLimit)}
                    </Tooltip>
                </OverlayTrigger>
            </div>
        ) : (
            button
        );
    }

    render() {
        const {
            confirmSaveThisSearch,
            updateSaveSearchName,
            cancelSaveSearch,
            trackSearchResultInDashboard,
            selectDefaultSorting,
            changeSortingOrder,
            error,
        } = this.props;
        const { hasError, errorMessage } = error;
        return (
            // TODO: switch back to OverlayTrigger once PopOver is fixed
            //     <OverlayTrigger trigger="click" placement="bottom" onHide={cancelSaveSearch}>
            //         <Button label={saveSearch} variant="action" quiet icon={<Add />} />
            //         <Popover className={styles.triggerDialog}>
            //             <SaveSearchExecutionContent
            //                 onSaveSearchNameChange={updateSaveSearchName}
            //                 onTrackResultInDashboardChange={trackSearchResultInDashboard}
            //                 onDefaultSortingChange={selectDefaultSorting}
            //                 onSortingOrderChange={changeSortingOrder}
            //             />
            //         </Popover>
            //     </OverlayTrigger>
            hasError ? (
                <InlineErrorMessage isInvalid={hasError} errorMessage={errorMessage} />
            ) : (
                <ModalTrigger>
                    {this.renderButton()}
                    <Dialog
                        className={styles.triggerDialog}
                        modalcontent
                        confirmLabel="Save"
                        size="S"
                        variant="information"
                        cancelLabel="Cancel"
                        onConfirm={confirmSaveThisSearch}
                        onCancel={cancelSaveSearch}>
                        <SaveSearchExecutionContent
                            onSaveSearchNameChange={updateSaveSearchName}
                            onTrackResultInDashboardChange={trackSearchResultInDashboard}
                            onDefaultSortingChange={selectDefaultSorting}
                            onSortingOrderChange={changeSortingOrder}
                        />
                    </Dialog>
                </ModalTrigger>
            )
        );
    }
}

SaveSearchExecution.propTypes = {
    isSavedSearchLimitReached: PropTypes.bool,
    savedSearchLimit: PropTypes.number,
    confirmSaveThisSearch: PropTypes.func,
    cancelSaveSearch: PropTypes.func,
    updateSaveSearchName: PropTypes.func,
    trackSearchResultInDashboard: PropTypes.func,
    selectDefaultSorting: PropTypes.func,
    changeSortingOrder: PropTypes.func,
    error: PropTypes.object,
};

export default SaveSearchExecution;
