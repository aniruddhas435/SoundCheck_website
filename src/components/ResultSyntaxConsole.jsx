import React from 'react';
import LoadWithShadow from './LoadWithShadow';

const ResultSyntaxConsole = ({isLoading, result}) => {
    return (
        <div className="result styled-scrollbar" key="result-syntax">
            <LoadWithShadow
            isLoading={isLoading}
            />
            {result['scaledSyntax']}
        </div>
    );
};
 
export default ResultSyntaxConsole;