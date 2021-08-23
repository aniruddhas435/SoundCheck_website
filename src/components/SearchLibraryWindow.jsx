import React, { Component } from 'react';

export class SearchLibraryWindow extends Component {
    state = {
        fileName: '',
        raagName: '',
        authorName: '',
        listOfFiles: []
    };

    render() {
        return (
            <div className='modal-search-window-form' id='search-window'>
                <div id='search-form'>
                    <input 
                    type='text' 
                    className='search-field' 
                    placeholder='🔎 File Name'
                    value={this.state.fileName}
                    onChange={event => this.setState({fileName: event.target.value})} />

                    <input 
                    type="text" 
                    className="search-field"
                    placeholder='🔎 Raag Name'
                    value={this.state.raagName}
                    onChange={event => this.setState({raagName: event.target.value})} />

                    <input 
                    type="text" 
                    className="search-field"
                    placeholder='🔎 Author Name' 
                    value={this.state.authorName}
                    onChange={event => this.setState({authorName: event.target.value})} />

                    <button className='form-button search-button'>Search</button>
                </div>

                <div>
                    <table className='fileList'>
                        <thead>
                            <th>File Name</th>
                            <th>Raag Name</th>
                            <th>Author Name</th>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SearchLibraryWindow;
