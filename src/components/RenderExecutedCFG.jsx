import {React} from 'react';
import RenderSyntaxComponent from './RenderSyntaxComponent';

const RenderExecutedCFG = ({scaledSyntax}) => {
    if(scaledSyntax === '' || scaledSyntax === null) {
        return (
            <div></div>
        );
    } else {
        return (
            <div>
                <RenderSyntaxComponent 
                    content={scaledSyntax[0]}
                    header='Declarations'
                    leftSpaces={0}
                />

                <RenderSyntaxComponent 
                    content={scaledSyntax[1]}
                    header='Syntax'
                    leftSpaces={0}
                />
            </div>
        );
    }
};
 
export default RenderExecutedCFG;