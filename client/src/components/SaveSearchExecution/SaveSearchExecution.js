import React, { Component } from 'react';
import Button from '@react/react-spectrum/Button';
import PropTypes from 'prop-types';
import Add from '@react/react-spectrum/Icon/Add';
import styles from './SaveSearchExecution.css';
// TODO: BRING BACK OverlayTrigger once PopOver is fixed
// import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
// import Popover from '@react/react-spectrum/Popover';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import SaveSearchExecutionContent from './SaveSearchExecutionContent';
import { saveSearch } from './saveSearchExecutionMessages';

class SaveSearchExecution extends Component {
    render() {
        const {
            disabled,
            confirmSaveThisSearch,
            updateSaveSearchName,
            cancelSaveSearch,
            trackSearchResultInDashboard,
            selectDefaultSorting,
            changeSortingOrder,
        } = this.props;
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
            <ModalTrigger>
                <Button
                    data-test="save-this-search-button"
                    label={saveSearch}
                    variant="action"
                    quiet
                    icon={<Add />}
                    disabled={disabled}
                />
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
        );
    }
}

SaveSearchExecution.propTypes = {
    disabled: PropTypes.bool,
    confirmSaveThisSearch: PropTypes.func,
    cancelSaveSearch: PropTypes.func,
    updateSaveSearchName: PropTypes.func,
    trackSearchResultInDashboard: PropTypes.func,
    selectDefaultSorting: PropTypes.func,
    changeSortingOrder: PropTypes.func,
};

export default SaveSearchExecution;
