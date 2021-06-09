import React from 'react';

const LoadingWithShadow = ({isLoading}) => {
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
 
export default LoadingWithShadow;