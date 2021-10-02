import React from 'react';

const LoadWithShadow = ({isLoading, loadingClassName}) => {
    return (
        <div>
            {isLoading ? (
                <div className={loadingClassName}>
                    <div className="loader"></div>
                </div>
            ) : null}
        </div>
    );
};
 
export default LoadWithShadow;