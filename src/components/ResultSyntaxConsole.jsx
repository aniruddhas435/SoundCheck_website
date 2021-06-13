import { React, useRef} from 'react';
import LoadWithShadow from './LoadWithShadow';

const ResultSyntaxConsole = ({isLoading, result, captureWidth}) => {
    const ssTextRef = useRef();

    const handleTextLoaded = (event) => {
        captureWidth(event.target.clientWidth / event.target.value.length);
    };

    return (
        <div className="result styled-scrollbar" key="result-syntax">
            <LoadWithShadow
            isLoading={isLoading}
            />
            <div 
            ref={ssTextRef} 
            style={{width: 'fit-content'}}
            onLoad={event => handleTextLoaded(event)}
            >
                {result['scaledSyntax']}
            </div>
        </div>
    );
};

export default ResultSyntaxConsole;