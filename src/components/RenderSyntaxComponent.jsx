import { React, useState } from 'react';

const RenderSyntaxComponent = ({content, header, leftSpaces}) => {
    const type = typeof(content);
    const [isOpen, setIsOpen] = useState(false);

    const blockStyle = {
        display: 'flex',
        paddingLeft: '' + (leftSpaces * 3) + 'em'
    };

    const textStyle = {
        paddingTop: '6.5px'
    };

    if(type === 'string' || type === 'number') {
        const leafStyle = {
            padding: 0
        };

        return (
            <div style={blockStyle}>
                <div style={leafStyle}>{header}: {content}</div>
            </div>
        );
    } else if(header === 'distribution') {
        const contentStyled = Object.entries(content).map(([key, value]) => {
            return (
                <RenderSyntaxComponent
                    content={value}
                    header={key}
                    leftSpaces={leftSpaces}
                />
            );
        });

        return (
            <div>
                {contentStyled}
            </div>
        );
    } else if(header === 'values' || header === 'empty' || content === null) {
        return (<div></div>);
    } else {
        const handleExpand = () => setIsOpen(!isOpen);
        const contentStyled = Object.entries(content).map(([key, value]) => {
            return (
                <RenderSyntaxComponent
                    content={value}
                    header={key}
                    leftSpaces={leftSpaces + 1}
                />
            );
        });

        return (
            <div>
                <div style={blockStyle}>
                    <button onClick={handleExpand} className="left-arrow">
                        <span className="material-icons">
                            {isOpen ? 'arrow_drop_down' : 'arrow_right'}
                        </span>
                    </button>
                    <div style={textStyle}>{header}</div>
                </div>

                {isOpen ? contentStyled : (<div></div>)}
            </div>
        );
    }
};
 
export default RenderSyntaxComponent;