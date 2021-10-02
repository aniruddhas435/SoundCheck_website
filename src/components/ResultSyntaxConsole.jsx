import { React, useRef} from 'react';
import LoadWithShadow from './LoadWithShadow';
import RenderExecutedCFG from './RenderExecutedCFG';

const ResultSyntaxConsole = ({isLoading, loadingClassName, result, captureWidth}) => {
    const ssTextRef = useRef();

    const handleTextLoaded = (event) => {
        const charWidth = event.target.clientWidth / event.target.value.length;
        console.log(charWidth);
        captureWidth(charWidth);
    };

    return (
        <div className="result styled-scrollbar" key="result-syntax">
            <LoadWithShadow
            isLoading={isLoading}
            loadingClassName={loadingClassName}
            />
            <div 
            ref={ssTextRef} 
            style={{width: 'fit-content'}}
            onLoad={event => handleTextLoaded(event)}
            >
                <RenderExecutedCFG scaledSyntax={result['scaled-syntax']} />
            </div>
        </div>
    );
};

export default ResultSyntaxConsole;
