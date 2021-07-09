import React from 'react';

const ToolbarButton = ({className, onClick, title, iconName}) => {
    return (  
        <button 
        className={className}
        onClick={onClick}
        title={title}
        >
            <span className="material-icons">{iconName}</span>
        </button>
    );
}
 
export default ToolbarButton;