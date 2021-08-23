import React, { useState } from 'react';
import ToolBar from './toolbar';
import CustomMonacoEditor from './CustomMonacoEditor';

const CodeEditor = ({ onSave, onRun, onSaveToLibrary, onSearchLibrary }) => {
    const options = {
        selectOnLineNumbers: true
    };

    const [inputCode, setInputCode] = useState('');
    const [fileName, setFileName] = useState('your.raag');

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

    const handleDragOver = event => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = event => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;
        
        if(files.length > 1) {
            alert('More than one file cannot be uploaded !');
            return;
        }

        const type = files[0].name.split('.').pop();
        console.log(type);

        if(type !== "raag") {
            alert('The file does not have .raag extension');
            return;
        }
        handleUpload(files[0]);
    };

    const handleSave = event => {
        if(inputCode.length === 0) {
            alert('Editor is empty');
        } else {
            console.log(inputCode);
            onSave(inputCode, fileName);
        }
    };

    const handleUpload = inputFile => {
        const reader = new FileReader();
        setFileName(inputFile.name);
        reader.addEventListener('load', event => {
            setInputCode(event.target.result);
        });
        reader.readAsText(inputFile);
    };

    const handleFileNameChange = event => {
        setFileName(event.target.value);
    }

    const handleSaveToLibrary = () => {
        if(inputCode.length === 0) {
            alert('Editor is empty');
        } else {
            console.log(inputCode);
            onSaveToLibrary(inputCode, fileName);
        }
    }

    return (
        <div className='code-editor-container'>
            <ToolBar
            onReset={handleReset}
            onSave={handleSave}
            onRun={handleRun}
            onFileUpload={handleUpload}
            fileName={fileName}
            onChange={handleFileNameChange}
            onSaveToLibrary={handleSaveToLibrary}
            onSelectFromLibrary={onSearchLibrary}
            />

            <div 
            className="code-input"
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
                <CustomMonacoEditor 
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