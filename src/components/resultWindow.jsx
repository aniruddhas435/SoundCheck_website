import React, { Component, createRef } from 'react';
import ResultWindowTop from './ResultWindowTop';
import ResultPlayerConsole from './ResultPlayerConsole';
import ResultSyntaxConsole from './ResultSyntaxConsole';
import ResultErrorConsole from './ResultErrorConsole';

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
    }

    render() {
        const { result, isLoading } = this.props;
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
                        setIsPlayerOn={this.setIsPlayerOn} />
                    ) : (
                        <ResultSyntaxConsole
                        isLoading={isLoading}
                        result={result} />
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
