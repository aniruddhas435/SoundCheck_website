import React, { Component, createRef, lazy, Suspense } from 'react';
import ResultWindowTop from './ResultWindowTop';
import ResultPlayerConsole from './ResultPlayerConsole';
import ResultErrorConsole from './ResultErrorConsole';
import LoadWithShadow from './LoadWithShadow';

const ResultSyntaxConsole = lazy(() => import('./ResultSyntaxConsole'));
// const LoadWithShadow = lazy(() => import('./LoadWithShadow'));

class ResultWindow extends Component {
    state = {
        selected: 'output',
        isPlayerOn: false
    };

    constructor(props) {
        super(props);
        this.scaledSyntaxRef = createRef();
        this.outputRef = createRef();
    }

    handleTabSelect = event => {
        if(this.state.isPlayerOn) return;

        console.log(event.target.id);
        if(event.target.id === 'scaled-syntax' && this.state.selected !== 'scaledSyntax') {
            this.setState({
                selected: 'scaledSyntax'
            });
            this.scaledSyntaxRef.current.style =  `
                background-color: rgb(32, 31, 31);
                color: aliceblue;
            `;
            this.outputRef.current.style = ``;
        } else if(event.target.id === 'output' && this.state.selected !== 'output') {
            this.setState({
                selected: 'output'
            });
            this.outputRef.current.style = `
                background-color: rgb(32, 31, 31);
                color: aliceblue;
            `;
            this.scaledSyntaxRef.current.style = ``;
        }
    };

    render() {
        const { result, isLoading } = this.props;
        // console.log(type(ResultSyntaxConsole));
        return (
            <div className="result-window" role="tablist">
                <ResultWindowTop
                onTabSelect={event => this.handleTabSelect(event)}
                outputRef={this.outputRef}
                scaledSyntaxRef={this.scaledSyntaxRef} 
                />

                {result['error'] === false ? (
                    this.state.selected === 'output' ? (
                        <ResultPlayerConsole
                        result={this.props.result}
                        isLoading={this.props.isLoading}
                        setIsPlayerOn={param => {
                            this.setState({
                                isPlayerOn: param
                            });
                        }} />
                    ) : (
                        <Suspense fallback={<LoadWithShadow isLoading={true} />}>
                            <ResultSyntaxConsole
                            isLoading={isLoading}
                            result={result}
                            captureWidth={this.props.captureWidth} />
                        </Suspense>
                    )
                ) : (
                    <ResultErrorConsole
                    selected={this.state.selected}
                    isLoading={isLoading}
                    result={result} />
                )}       
                
            </div>
        );
    }
}

export default ResultWindow;
