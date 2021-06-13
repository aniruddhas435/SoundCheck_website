import React from 'react';

const LoadWithShadow = ({isLoading}) => {
    return (
        <div>
            {isLoading ? (
                <div className="loading">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="loading" style={displayNone}>
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
};

const displayNone = {
    display: 'none'
};
 
export default LoadWithShadow;