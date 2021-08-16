import React, { Component } from 'react';
import AddToLibraryForm from './AddToLibraryForm';

export class ModalFallBack extends Component {

    handleClose = event => {
        // console.log(event.target);
        if(event.target.id === 'modal-fallback') {
            this.props.vanishModal()
        }
    };

    render() {
        return (
            this.props.isVisible ? (
                <div 
                className='modal-popup-background' 
                id='modal-fallback'
                onClick={this.handleClose}>
                    <AddToLibraryForm
                    vanishModal={this.props.vanishModal}
                    handleSaveToLibrary={this.props.handleSaveToLibrary} />
                </div>
            ) : (
                null
            )
        );
    }
}

export default ModalFallBack;
