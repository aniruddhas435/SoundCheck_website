import React, { useState } from 'react';
import ToolBar from './toolbar';
import MonacoEditor from 'react-monaco-editor';

const CodeEditor = ({onSave, onRun}) => {
    const options = {
        selectOnLineNumbers: true
    };

    const [inputCode, setInputCode] = useState('');

    const handleRun = () => {
        if(inputCode.length === 0) {
            alert('Editor is empty');
        } else {
            console.log(inputCode);
            onRun(inputCode);
        }
    };

    const handleReset = event => {
        setInputCode('');
    };

    return (
        <div className='code-editor-container'>
            <ToolBar
            onReset={handleReset}
            onSave={onSave}
            onRun={handleRun}
            />

            <div className="code-input">
                <MonacoEditor 
                    width="100%"
                    height="100%"
                    theme="vs-dark"
                    options={options}
                    onChange={value => setInputCode(value)}
                    value={inputCode}
                />
            </div>
        </div>
    );
}
 
export default CodeEditor;