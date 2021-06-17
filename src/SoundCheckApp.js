import React, { Component, createRef } from 'react';
import CodeEditor from './components/codeEditor';
import ResultWindow from './components/resultWindow';
import './components/styles/editorStyle.css';
import './components/styles/playerStyles.css';

export class SoundCheckApp extends Component {
    state = {
        inputCode: '',
        isHandlerDragging: false,
        editorWidth: '100px',
        result: {
            'output': 'This is the result tab',
            'scaledSyntax': 'This is the scaled syntax tab',
            'error': false,
            'soundBytes': []
        },
        isLoadingResult: false,
        ssCharWidth: 6.608695652173913
    };

    constructor() {
        super();
        this.ssTextRef = createRef();
    }

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
        postSyntax(
            'https://soundcheck-getsequence.herokuapp.com/controller/getSequence', 
            { 'inputCode': inputCode }
        ).then(data => {
            return data.json();
        }).then(data => {
            console.log(data); 
            this.setState({
                isLoadingResult: false
            });

            const scaledSyntax = data['scaled-syntax'].split('\n').map((line, index) => {
                let lineStyle = {};
                let count = 0;

                if(line === '') {
                    lineStyle = {padding: '5px, 0'};
                    return <div key={index} style={lineStyle}>{line}</div>;
                } else {
                    if(line.charAt(0) === '\t') {
                        for(let i = 0; i < line.length && line.charAt(i) === '\t'; i++) {
                            count += 4;
                        }
                    }

                    if(line.includes('->')) {
                        const indexOfArrow = line.indexOf('->');
                        const fragments = line.split('|');

                        return fragments.map((fragment, idx) => {
                            if(idx === 0) {
                                return (<div key={idx} style={
                                    { paddingLeft: '' + count * this.state.ssCharWidth + 'px' }
                                }>{fragment}</div>);
                            } else {
                                const leftSpaces = indexOfArrow + count;
                                return (<div key={idx} style={
                                    { paddingLeft: '' + leftSpaces * this.state.ssCharWidth + 'px' }
                                }>{'|' + fragment}</div>);
                            }
                        });
                    } else {
                        lineStyle = {
                            paddingLeft: '' + count * this.state.ssCharWidth + 'px',
                        };

                        return <div key={index} style={lineStyle}>{line}</div>;
                    }
                }
            });

            const ss = data['scaledSyntax'];

            const output = data['output'].split('\n').map(element => {
                return <div>{element}</div>;
            });

            console.log(typeof data['volume'], typeof data['duration']);

            this.setState({
                result: {
                    'scaledSyntax': scaledSyntax,
                    'scaled-syntax': ss,
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

    render() {
        return (
            <div className='editor-console-container' onMouseMove={this.handleDragg}>
                <CodeEditor 
                    key="code-editor"
                    onRun={this.handleRun}
                    onSave={this.handleSave}
                    className="box"
                />

                <div className="handler" 
                    key="handler"
                    onMouseDown={() => this.setState({isHandlerDragging: true})}
                    onMouseUp= {() => this.setState({isHandlerDragging: false})}
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

async function postSyntax(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8',
        },
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
        body: data['inputCode']
    });

    return response;
}

export default SoundCheckApp;
