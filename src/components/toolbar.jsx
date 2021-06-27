import React, { useRef } from 'react';

const ToolBar = ({ onReset, onRun, onSave, onFileUpload, 
                   fileName, onChange, onSaveToLibrary,
                   onSelectFromLibrary }) => {
                       
    const fileUpload = useRef();

    const onFileInput = () => {
        const inputFile = fileUpload.current.files[0];
        onFileUpload(inputFile);
    };

    const uploadClicked = () => {
        fileUpload.current.click();
    };

    const runButtonStyle = {
        margin: '.5rem .5rem .5rem auto',
        order: 0
    };

    return (
        <div className="toolbar">
            <button 
            className='editor-header-button m-2'
            onClick={onReset}
            title="Reset">
                <span className="material-icons">replay</span> 
            </button>

            <button 
            className='editor-header-button m-2'
            onClick={onSave}
            title="Save">
                <span className="material-icons">download</span> 
            </button>

            <input 
            type="file" 
            id="fileUpload"
            ref={fileUpload}
            onChange={onFileInput}
            accept='.raag'
            hidden/>

            <button 
            className='editor-header-button m-2'
            onClick={uploadClicked}
            title="Upload">
                <span className="material-icons">upload</span>
            </button>

            <input 
            type="text" 
            value={fileName} 
            id="toolbar-filename"
            onChange={onChange}
            spellCheck="false"
            placeholder="filename.."/>

            <button 
            className='editor-header-button m-2'
            onClick={onSaveToLibrary}
            title="Save to Library">
                <span className="material-icons">library_add</span>
            </button>

            <button 
            className='editor-header-button m-2'
            onClick={onSelectFromLibrary}
            title="Select from Library">
                <span className="material-icons">library_books</span>
            </button>

            <button 
            className='editor-header-button float-right'
            onClick={onRun}
            style={runButtonStyle}
            title="Run">
                <span className="material-icons">fast_forward</span>
            </button>
        </div>
    );
};
 
export default ToolBar;