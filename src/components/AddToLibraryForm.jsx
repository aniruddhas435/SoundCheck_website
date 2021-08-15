import React, { Component } from 'react'

export class AddToLibraryForm extends Component {
    state = {
        fileName: '',
        raagName: ''
    };

    render() {
        return (
            <div className='modal-addfile-form' id='add-form'>
                <div>
                    <input 
                    type="text" 
                    value={this.state.fileName}
                    className='input-field'
                    placeholder="Enter your File Name..."
                    onChange={e => this.setState({ fileName: e.target.value })} />
                </div>

                <div>
                    <input 
                    type="text" 
                    value={this.state.raagName}
                    className='input-field'
                    placeholder="Enter your Raag Name..."
                    onChange={e => this.setState({ raagName: e.target.value })} />
                </div>

                <div className='form-buttons-section'>
                    <button 
                    className='form-button'>
                        Add
                    </button>

                    <button 
                    className='form-button' 
                    onClick={this.props.vanishModal}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }
};

export default AddToLibraryForm;
