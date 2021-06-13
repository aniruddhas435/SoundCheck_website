import React, { Component } from 'react'

class ResultWindowTop extends Component {
    handleTabSelect = event => {
        this.props.onTabSelect(event);
    };

    render() {
        return (
            <div>
                <ul className="nav result-nav">
                    <li className="nav-item" key="output">
                        <a id="output" 
                        ref={this.props.outputRef}
                        href="#output" 
                        className="nav-link-custom nav-link active" 
                        style={activeStyle}
                        onClick={event => this.handleTabSelect(event)}>
                            Output
                        </a>
                    </li>
                    <li className="nav-item" key="scaled-syntax">
                        <a id="scaled-syntax" 
                        ref={this.props.scaledSyntaxRef}
                        href="#scaled-syntax" 
                        className="nav-link-custom nav-link" 
                        onClick={event => this.handleTabSelect(event)}>
                            Scaled Syntax
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

const activeStyle = {
    backgroundColor: 'rgb(32, 31, 31)',
    color: 'aliceblue'
};

export default ResultWindowTop;
