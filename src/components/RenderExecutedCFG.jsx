import React from 'react';

const RenderExecutedCFG = () => {
    const style = {
        display: 'flex'
    };

    return (
        <div>
            <div style={style}>
                <span className="material-design">arrow_drop_down</span>
                Declarations
            </div>
            <div style={style}>
                <span className="material-design">arrow_drop_down</span>
                Syntax
            </div>
        </div>
    );
}
 
export default RenderExecutedCFG;