import React, { Component, lazy, Suspense } from 'react';

const AddToLibraryForm = lazy(() => import('./AddToLibraryForm'));
const SearchLibraryWindow = lazy(() => import('./SearchLibraryWindow'));

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
                    <Suspense fallback={<div></div>}>
                        {this.props.content === 'form-popup' ? (
                            <AddToLibraryForm
                            vanishModal={this.props.vanishModal}
                            isPosting={this.props.isPosting}
                            handleSaveToLibrary={this.props.handleSaveToLibrary}
                            fileName={this.props.fileName} />                           
                        ) : (
                            <SearchLibraryWindow
                            loadSyntax={this.props.loadSyntax} />
                        )}
                    </Suspense>
                </div>
            ) : (
                null
            )
        );
    }
}

export default ModalFallBack;
