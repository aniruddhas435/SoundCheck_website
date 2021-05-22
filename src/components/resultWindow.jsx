import React, { useState, useRef } from 'react';
import AudioPlayer from './AudioPlayer';

const ResultWindow = ({result, isLoading}) => {
    const [selected, setSelected] = useState('scaledSyntax');
    const [isPlayerOn, setIsPlayerOn] = useState(false);

    const scaledSyntaxRef = useRef();
    const outputRef = useRef();

    const activeStyle = {
        backgroundColor: 'rgb(32, 31, 31)',
        color: 'aliceblue'
    };

    const errorStyle = {
        color: 'red'
    };

    const handleTabSelect = event => {
        if(isPlayerOn) return;

        console.log(event.target.id);
        
        if(event.target.id === 'scaled-syntax' && selected !== 'scaledSyntax') {
            setSelected('scaledSyntax');
            scaledSyntaxRef.current.style =  `
                background-color: rgb(32, 31, 31);
                color: aliceblue;
            `;
            outputRef.current.style = ``;
        } else if(event.target.id === 'output' && selected !== 'output') {
            setSelected('output');
            outputRef.current.style = `
                background-color: rgb(32, 31, 31);
                color: aliceblue;
            `;
            scaledSyntaxRef.current.style = ``;
        }
    };

    return (
        <div className="result-window" role="tablist">
            <ul className="nav result-nav">
                <li className="nav-item" key="scaled-syntax">
                    <a id="scaled-syntax" 
                    ref={scaledSyntaxRef}
                    href="#scaled-syntax" 
                    className="nav-link-custom nav-link active" 
                    style={activeStyle}
                    onClick={handleTabSelect}>
                        Scaled Syntax
                    </a>
                </li>
                <li className="nav-item" key="output">
                    <a id="output" 
                    ref={outputRef}
                    href="#output" 
                    className="nav-link-custom nav-link" 
                    onClick={handleTabSelect}>
                        Output
                    </a>
                </li>
            </ul>

            {!isLoading ? (
                result['error'] === false ? (
                    selected === 'output' ? (
                        <div 
                        className="result-player-console" 
                        key="result-player-console">
                            <AudioPlayer 
                            key="audio-player"
                            notes={result['notes']}
                            duration={result['duration']}
                            volume={result['volume']}
                            frequencies={result['frequencies']}
                            setIsPlayerOn={setIsPlayerOn} 
                            isLoading={isLoading}
                            />

                            <div className="result-console styled-scrollbar" key="result-output">
                                <div key="output-content">{result['output']}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="result styled-scrollbar" key="result-syntax">
                            {result['scaledSyntax']}
                        </div>
                    )
                ) : (
                    <div className="result-error-console" key="result-error" style={errorStyle}>
                        {selected === 'output' ? (result['output']) : result['scaledSyntax']}
                    </div>
                )
            ) : (
                <div className="loading">
                    <div className="loader"></div>
                </div>
            )}       
            
        </div>
    );
}
 
export default ResultWindow;