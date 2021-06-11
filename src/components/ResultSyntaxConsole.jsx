import React from 'react';
import LoadWithShadow from './LoadWithShadow';

const ResultSyntaxConsole = ({isLoading, result, ssTextRef}) => {
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