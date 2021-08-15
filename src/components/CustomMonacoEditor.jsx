import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

export class CustomMonacoEditor extends Component {
    editor = null;

	handleEditorDidMount = editor => this.editor = editor;

	handleResize = () => this.editor.layout();

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	render() {
		return (
			<MonacoEditor
				{ ...this.props }
				editorDidMount={this.handleEditorDidMount}
			/>
		);
	}
}

export default CustomMonacoEditor;
