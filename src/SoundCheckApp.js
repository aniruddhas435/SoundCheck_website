import React, { Component } from 'react';
import CodeEditor from './components/codeEditor';
import ResultWindow from './components/resultWindow';
import './components/styles/editorStyle.css';
import './components/styles/playerStyles.css';
import './components/styles/scaledSyntaxStyle.css';
import './components/styles/modalStyle.css';
import ModalFallBack from './components/ModalFallBack';

export class SoundCheckApp extends Component {
    state = {
        inputCode: '',
        isHandlerDragging: false,
        editorWidth: '100px',
        result: {
            'output': '',
            'scaledSyntax': '',
            'error': false,
            'soundBytes': [],
            'scaled-syntax': ''
        },
        isLoadingResult: false,
        showModal: false,
        isPostingToLibrary: false,
        popupContent: ''
    };

    // handleDragg = event => {
    //     if(!this.state.isHandlerDragging) {
    //         return false;
    //     }

    //     let containerOffsetLeft = event.target.offsetLeft;
    //     let pointerRelativeXpos = event.clientX - containerOffsetLeft;

        
    // };

    captureSsCharWidth = width => {
        console.log(width);
        this.setState({
            ssCharWidth: width
        });
    };

    handleSave = (inputCode, fileName) => {
        console.log('ssdfs');
        console.log(inputCode);
        const file = new Blob([inputCode], {type: 'text/plain'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.target = '_blank';
        if(fileName.split('.').pop() !== 'raag') {
            alert('filename has to be with .raag extention');
            return;
        }
        link.download = fileName;
        link.click();
    };

    handleRun = inputCode => {
        console.log('turning \'loading\' on...');
        this.setState({
            isLoadingResult: true
        });
        postFetch(
            'https://soundcheck-getsequence.herokuapp.com/controller/getSequence', 
            inputCode
        ).then(data => {
            return data.json();
        }).then(data => {
            console.log(data); 
            this.setState({
                isLoadingResult: false
            });

            const scaledSyntax = data['scaledSyntax'];

            const output = data['output'].split('\n').map(element => {
                return <div>{element}</div>;
            });

            console.log(typeof data['volume'], typeof data['duration']);

            this.setState({
                result: {
                    'scaled-syntax': scaledSyntax,
                    'output': output,
                    'error': data['error'],
                    'notes': data['notes'],
                    'duration': data['duration'],
                    'volume': data['volume'],
                    'frequencies': data['frequencies']
                }
            });
        }).catch(error => {
            this.setState({
                isLoadingResult: false
            });
            this.setState({
                result: {
                    'scaledSyntax': "",
                    'output': "",
                    'error': true
                }
            });
        });
    };

    showSaveToLibraryForm = (inputCode, fileName) => {
        this.setState({
            showModal: true,
            inputCode: inputCode,
            popupContent: 'form-popup'
        });
    };

    showSearchWindow = () => {
        console.log('from showSearchWindow()');
        this.setState({
            showModal: true,
            popupContent: 'search-window-popup'
        });
    };

    handleSaveToLibrary = (fileName, raagName) => {
        this.setState({ isPostingToLibrary: true })
        postFetch(
            'https://soundcheck-getsequence.herokuapp.com/controller/postSyntax',
            JSON.stringify({
                'syntax': {
                    'raagName': raagName,
                    'fileName': fileName,
                    'authorName': 'aniruddha.sarkar'
                },
                'fileContent': this.state.inputCode
            })
        ).then(res => {
            if(res.status === 201) {
                this.setState({
                    showModal: false,
                    inputCode: '',
                    isPostingToLibrary: false
                });
            }
        }).catch(error => {
            console.log(error);
        });
    };

    handleCloseModal = event => {
        this.setState({
            showModal: false,
            inputCode: ''
        });
    };

    render() {
        return (
            <div className='editor-console-container' onMouseMove={this.handleDragg}>
                <ModalFallBack 
                isVisible={this.state.showModal}
                handleSaveToLibrary={this.handleSaveToLibrary}
                isPosting={this.state.isPostingToLibrary}
                content={this.state.popupContent}
                vanishModal={this.handleCloseModal} />

                <CodeEditor 
                    key="code-editor"
                    onRun={this.handleRun}
                    onSave={this.handleSave}
                    onSaveToLibrary={this.showSaveToLibraryForm}
                    onSearchLibrary={this.showSearchWindow}
                    className="box"
                />

                <div className="handler" 
                    key="handler"
                    onMouseDown={() => this.setState({isHandlerDragging: true})}
                    onMouseUp={() => this.setState({isHandlerDragging: false})}
                />

                <ResultWindow 
                    key="result-window" 
                    className="box" 
                    result={this.state.result}
                    isLoading={this.state.isLoadingResult}
                    captureWidth={this.captureSsCharWidth}
                />
            </div>
        );
    }
};

async function postFetch(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    });

    return response;
}

export default SoundCheckApp;
