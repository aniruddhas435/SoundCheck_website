import React from 'react';
import LoadWithShadow from './LoadWithShadow';

const ResultErrorConsole = ({selected, isLoading, result}) => {
    return (
        <div className="result-error-console" key="result-error" style={errorStyle}>
            <LoadWithShadow
            isLoading={isLoading}
            />
            {selected === 'output' ? (
                result['output']
            ) : result['scaledSyntax']}
        </div>
    );
}

const errorStyle = {
    color: 'red'
};
 
export default ResultErrorConsole;