import { React, useRef, useEffect } from 'react';
import LoadWithShadow from './LoadWithShadow';

const ResultSyntaxConsole = ({isLoading, result, captureWidth}) => {
    const ssTextRef = useRef();

    useEffect(() => {
        captureWidth(ssTextRef.current.clientWidth / ssTextRef.current.textContent.length);
    });

    return (
        <div className="result styled-scrollbar" key="result-syntax">
            <LoadWithShadow
            isLoading={isLoading}
            />
            <div ref={ssTextRef} style={{width: 'fit-content'}}>{result['scaledSyntax']}</div>
        </div>
    );
};

export default ResultSyntaxConsole;