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
import { saveThisSearch } from '../utils/saveSearch';

class SaveSearchExecution extends Component {
    render() {
        const {
            confirmSaveThisSearch,
            updateSaveSearchName,
            cancleSaveSearch,
            trackSearchResultInDashboard,
            selectDefaultSorting,
            changeSortingOrder,
        } = this.props;
        return (
            // TODO: switch back to OverlayTrigger once PopOver is fixed
            // <div className={styles.trigger}>
            //     <OverlayTrigger trigger="click" placement="bottom" onHide={cancleSaveSearch}>
            //         <Button label={saveThisSearch} variant="action" quiet icon={<Add />} />
            //         <Popover className={styles.triggerDialog}>
            //             <SaveSearchExecutionContent
            //                 onSaveSearchNameChange={updateSaveSearchName}
            //                 onTrackResultInDashBoardChange={trackSearchResultInDashboard}
            //                 onDefaultSortingChange={selectDefaultSorting}
            //                 onSortingOrderChange={changeSortingOrder}
            //             />
            //         </Popover>
            //     </OverlayTrigger>
            // </div>
            <div className={styles.trigger}>
                <ModalTrigger>
                    <Button label={saveThisSearch} variant="action" quiet icon={<Add />} />
                    <Dialog
                        className={styles.triggerDialog}
                        modalcontent
                        confirmLabel="Save"
                        size="S"
                        variant="information"
                        cancelLabel="Cancel"
                        onConfirm={confirmSaveThisSearch}
                        onCancel={cancleSaveSearch}>
                        <SaveSearchExecutionContent
                            onSaveSearchNameChange={updateSaveSearchName}
                            onTrackResultInDashBoardChange={trackSearchResultInDashboard}
                            onDefaultSortingChange={selectDefaultSorting}
                            onSortingOrderChange={changeSortingOrder}
                        />
                    </Dialog>
                </ModalTrigger>
            </div>
        );
    }
}

SaveSearchExecution.propTypes = {
    confirmSaveThisSearch: PropTypes.func,
    cancleSaveSearch: PropTypes.func,
    updateSaveSearchName: PropTypes.func,
    trackSearchResultInDashboard: PropTypes.func,
    selectDefaultSorting: PropTypes.func,
    changeSortingOrder: PropTypes.func,
};

export default SaveSearchExecution;
