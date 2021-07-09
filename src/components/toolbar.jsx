import React, { useRef } from 'react';
import ToolbarButton from './ToolbarButton';

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
            <ToolbarButton 
            className={'editor-header-button m-2'}
            onClick={onReset}
            title={'Reset'}
            iconName={'replay'}/>

            <ToolbarButton 
            className={'editor-header-button m-2'}
            onClick={onSave}
            title={'Save'}
            iconName={'download'}/>

            <input 
            type="file" 
            id="fileUpload"
            ref={fileUpload}
            onChange={onFileInput}
            accept='.raag'
            hidden/>

            <ToolbarButton 
            className={'editor-header-button m-2'}
            onClick={uploadClicked}
            title={'Upload'}
            iconName={'upload'}/>

            <input 
            type="text" 
            value={fileName} 
            id="toolbar-filename"
            onChange={onChange}
            spellCheck="false"
            placeholder="filename.."/>

            <ToolbarButton 
            className={'editor-header-button m-2'}
            onClick={onSaveToLibrary}
            title={'Save to Library'}
            iconName={'library_add'}/>

            <ToolbarButton 
            className={'editor-header-button m-2'}
            onClick={onSelectFromLibrary}
            title={'Select from Library'}
            iconName={'library_books'}/>

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