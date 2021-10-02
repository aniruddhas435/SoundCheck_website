import React from 'react';
import AudioPlayer from './AudioPlayer';
import LoadWithShadow from './LoadWithShadow';

const ResultPlayerConsole = ({result, isLoading, loadingClassName, setIsPlayerOn}) => {
    return (
        <div 
        className="result-player-console" 
        key="result-player-console">
            <LoadWithShadow
            isLoading={isLoading}
            loadingClassName={loadingClassName}
            />

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
    );
}
 
export default ResultPlayerConsole;