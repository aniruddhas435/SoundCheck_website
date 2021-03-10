import React from 'react';

const ToolBar = ({ onReset, onRun, onSave }) => {
    return (
        <div className="toolbar button-group">
            <button 
            className='editor-header-button ml-2'
            onClick={onSave}
            title="Save">
                <span className="material-icons">download</span> 
            </button>
            <button 
            className='editor-header-button m-2'
            onClick={onReset}
            title="Reset">
                <span className="material-icons">replay</span> 
            </button>
            <button 
            className='editor-header-button m-2 float-right'
            onClick={onRun}
            title="Run">
                <span className="material-icons">fast_forward</span>
            </button>
        </div>
    );
}
 
export default ToolBar;