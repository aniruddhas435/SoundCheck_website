import React from 'react';

const RenderExecutedCFG = ({scaledSyntax}) => {
    return (
        <div>
            {scaledSyntax.stringify()}
        </div>
    );
}
 
export default RenderExecutedCFG;