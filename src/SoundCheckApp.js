import React, { Component, createRef } from 'react';
import CodeEditor from './components/codeEditor';
import ResultWindow from './components/resultWindow';
import './components/styles/editorStyle.css';
import './components/styles/playerStyles.css';
import './components/styles/scaledSyntaxStyle.css';

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
            'scaled-syntax': []
            // 'scaled-syntax': [
            //     {
            //         "beatsPerCycle": 16,
            //         "numCycles": 10,
            //         "low": "ma_",
            //         "high": "ma*",
            //         "outFileName": "final",
            //         "start": "Start",
            //         "baseFrequency": 360,
            //         "msec": 140,
            //         "volume": 0.2,
            //         "playFileName": "",
            //         "wavFileName": ""
            //     },
            //     {
            //         "ascent": [
            //             "Sa",
            //             "ga",
            //             "ma",
            //             "dha",
            //             "ni"
            //         ],
            //         "descent": [
            //             "Sa",
            //             "ni",
            //             "dha",
            //             "ma",
            //             "ga"
            //         ],
            //         "derivations": {
            //             "gaFirst*": {
            //                 "distribution": {
            //                     "paltaUp(ga*)-maFirst*": 1,
            //                     "paltaDown(ga*)-niFirst": 0.5,
            //                     "paltaDown(ga*)-SaFirst*": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(ga*)-maFirst*",
            //                     "paltaDown(ga*)-niFirst",
            //                     "paltaDown(ga*)-SaFirst*"
            //                 ]
            //             },
            //             "maFirst*": {
            //                 "distribution": {
            //                     "paltaDown(ma*)-gaFirst*": 1,
            //                     "paltaUp(ma*)-SaFirst*": 0.5
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaDown(ma*)-gaFirst*",
            //                     "paltaUp(ma*)-SaFirst*"
            //                 ]
            //             },
            //             "niFirst": {
            //                 "distribution": {
            //                     "paltaUp(ni)-SaFirst*": 1,
            //                     "paltaDown(ni)-dhaFirst": 1,
            //                     "paltaDown(ni)-maFirst": 0.5,
            //                     "paltaUp(ni)-gaFirst*": 0.5
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(ni)-SaFirst*",
            //                     "paltaDown(ni)-dhaFirst",
            //                     "paltaDown(ni)-maFirst",
            //                     "paltaUp(ni)-gaFirst*"
            //                 ]
            //             },
            //             "Start": {
            //                 "distribution": {
            //                     "SaFirst": 1,
            //                     "gaFirst": 1,
            //                     "SaFirst*": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "SaFirst",
            //                     "gaFirst",
            //                     "SaFirst*"
            //                 ]
            //             },
            //             "SaFirst": {
            //                 "distribution": {
            //                     "paltaUp(Sa)-gaFirst": 1,
            //                     "paltaUp(Sa)-maFirst": 0.5,
            //                     "paltaDown(Sa)-dhaFirst_": 0.5,
            //                     "paltaDown(Sa)-niFirst_": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(Sa)-gaFirst",
            //                     "paltaUp(Sa)-maFirst",
            //                     "paltaDown(Sa)-dhaFirst_",
            //                     "paltaDown(Sa)-niFirst_"
            //                 ]
            //             },
            //             "gaFirst": {
            //                 "distribution": {
            //                     "paltaDown(ga)-niFirst_": 0.5,
            //                     "paltaUp(ga)-maFirst": 1,
            //                     "paltaUp(ga)-dhaFirst": 0.5,
            //                     "paltaDown(ga)-SaFirst": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaDown(ga)-niFirst_",
            //                     "paltaUp(ga)-maFirst",
            //                     "paltaUp(ga)-dhaFirst",
            //                     "paltaDown(ga)-SaFirst"
            //                 ]
            //             },
            //             "maFirst": {
            //                 "distribution": {
            //                     "paltaUp(ma)-SaFirst": 0.5,
            //                     "paltaDown(ma)-gaFirst": 1,
            //                     "paltaUp(ma)-dhaFirst": 1,
            //                     "paltaDown(ma)-niFirst": 0.5
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(ma)-SaFirst",
            //                     "paltaDown(ma)-gaFirst",
            //                     "paltaUp(ma)-dhaFirst",
            //                     "paltaDown(ma)-niFirst"
            //                 ]
            //             },
            //             "SaFirst*": {
            //                 "distribution": {
            //                     "paltaUp(Sa*)-gaFirst*": 1,
            //                     "paltaUp(Sa*)-maFirst*": 0.5,
            //                     "paltaDown(Sa*)-niFirst": 1,
            //                     "paltaDown(Sa*)-dhaFirst": 0.5
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(Sa*)-gaFirst*",
            //                     "paltaUp(Sa*)-maFirst*",
            //                     "paltaDown(Sa*)-niFirst",
            //                     "paltaDown(Sa*)-dhaFirst"
            //                 ]
            //             },
            //             "niFirst_": {
            //                 "distribution": {
            //                     "paltaUp(ni_)-gaFirst": 0.5,
            //                     "paltaDown(ni_)-maFirst_": 0.5,
            //                     "paltaDown(ni_)-dhaFirst_": 1,
            //                     "paltaUp(ni_)-SaFirst": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(ni_)-gaFirst",
            //                     "paltaDown(ni_)-maFirst_",
            //                     "paltaDown(ni_)-dhaFirst_",
            //                     "paltaUp(ni_)-SaFirst"
            //                 ]
            //             },
            //             "dhaFirst": {
            //                 "distribution": {
            //                     "paltaUp(dha)-SaFirst*": 0.5,
            //                     "paltaDown(dha)-maFirst": 1,
            //                     "paltaUp(dha)-niFirst": 1,
            //                     "paltaDown(dha)-gaFirst": 0.5
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(dha)-SaFirst*",
            //                     "paltaDown(dha)-maFirst",
            //                     "paltaUp(dha)-niFirst",
            //                     "paltaDown(dha)-gaFirst"
            //                 ]
            //             },
            //             "dhaFirst_": {
            //                 "distribution": {
            //                     "paltaDown(dha_)-maFirst_": 1,
            //                     "paltaUp(dha_)-SaFirst": 0.5,
            //                     "paltaUp(dha_)-niFirst_": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaDown(dha_)-maFirst_",
            //                     "paltaUp(dha_)-SaFirst",
            //                     "paltaUp(dha_)-niFirst_"
            //                 ]
            //             },
            //             "maFirst_": {
            //                 "distribution": {
            //                     "paltaUp(ma_)-dhaFirst_": 1,
            //                     "paltaDown(ma_)-niFirst_": 0.5
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "paltaUp(ma_)-dhaFirst_",
            //                     "paltaDown(ma_)-niFirst_"
            //                 ]
            //             }
            //         },
            //         "schemes": {
            //             "paltaDown": {
            //                 "distribution": {
            //                     "3132": 1,
            //                     "3231": 1,
            //                     "(321,4)": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "(321,4)",
            //                     "3231",
            //                     "3132"
            //                 ]
            //             },
            //             "paltaUp": {
            //                 "distribution": {
            //                     "1232": 1,
            //                     "1423": 1,
            //                     "(123,4)": 1
            //                 },
            //                 "empty": false,
            //                 "values": [
            //                     "1423",
            //                     "1232",
            //                     "(123,4)"
            //                 ]
            //             }
            //         },
            //         "start": "Start"
            //     }
            // ]
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
