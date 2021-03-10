import React, { Component } from 'react';
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
        }
    };

    handleDragg = event => {
        if(!this.state.isHandlerDragging) {
            return false;
        }

        let containerOffsetLeft = event.target.offsetLeft;
        let pointerRelativeXpos = event.clientX - containerOffsetLeft;

        
    };

    handleSave = event => {

    };

    handleRun = inputCode => {
        postSyntax(
            'http://localhost:8084//controller/getSequence/', 
            { 'inputCode': inputCode }
        ).then(data => {
            return data.json();
        }).then(data => {
            // console.log(data);

            const scaledSyntax = data['scaled-syntax'].split('\n').map((element, index) => {
                let lineStyle = {};
                if(element === '') {
                    lineStyle = {padding: '5px 0'};
                } else if(element.charAt(0) === '\t') {
                    let count = 4;
                    for(let i = 1; i < element.length && element.charAt(i) === '\t'; i++) {
                        count += 4;
                    }
                    lineStyle = {paddingLeft: '' + count * 5.6 + 'px'};
                }

                return <div key={index} style={lineStyle}>{element}</div>;
            });

            const output = data['output'].split('\n').map(element => {
                return <div>{element}</div>;
            });

            console.log(typeof data['volume'], typeof data['duration']);

            this.setState({
                result: {
                    'scaledSyntax': scaledSyntax,
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

                <ResultWindow key="result-window" className="box" result={this.state.result} />
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
