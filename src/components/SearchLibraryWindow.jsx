import React, { Component } from 'react';

export class SearchLibraryWindow extends Component {
    state = {
        fileName: '',
        raagName: '',
        authorName: '',
        pageNo: 1,
        pages: 1,
        isLoading: false,
        listOfFiles: [
            // {
            //     "raagName": "Malkauns",
            //     "fileName": "malkauns.raag",
            //     "authorName": "aniruddha.sarkar"
            // },
            // {
            //     "raagName": "Miyan Ki Malhar",
            //     "fileName": "mkm.raag",
            //     "authorName": "aniruddha.sarkar"
            // },
            // {
            //     "raagName": "Miyan Ki Malhar",
            //     "fileName": "mkm3.raag",
            //     "authorName": "aniruddha.sarkar"
            // },
            // {
            //     "raagName": "Miyan Ki Malhar",
            //     "fileName": "mkm2.raag",
            //     "authorName": "aniruddha.sarkar"
            // },
            // {
            //     "raagName": "Miyan Ki Malhar",
            //     "fileName": "mkm2.raag",
            //     "authorName": "aniruddha.sarkar"
            // },
            // {
            //     "raagName": "Miyan Ki Malhar",
            //     "fileName": "mkm1.raag",
            //     "authorName": "aniruddha.sarkar"
            // },
            // {
            //     "raagName": "Test",
            //     "fileName": "ab.raag",
            //     "authorName": "aniruddha.sarkar"
            // }
        ]
    };

    goFirstPage = () => {
        
    };

    goPreviousPage = () => {

    };

    goNextPage = () => {

    };

    goLastPage = () => {

    };

    getRecordsForQuery = () => {
        const body = {
            fileName: this.state.fileName,
            raagName: this.state.raagName,
            authorName: this.state.authorName,
            pageNo: 0,
            pageSize: 7
        };

        postFetch(
            "https://soundcheck-getsequence.herokuapp.com/controller/getSyntaxListForQuery",
            JSON.stringify(body)
        ).then(res => res.json())
        .then(data => {
            // console.log(data['pages']);
            console.log(data['page']);
            this.setState({
                listOfFiles: data['page'],
                pages: data['pages']
            });
        }).then(err => console.log(err));
    };

    getSyntax = (fileName, raagName, authorName) => {
        this.props.loadSyntax(fileName, raagName, authorName);
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

                    <button 
                    className='form-button search-button'
                    onClick={() => this.getRecordsForQuery()}>
                        Search
                    </button>
                </div>

                <div>
                    <table className='file-list'>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Raag Name</th>
                                <th>Author Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listOfFiles.map(record => (
                                <tr 
                                className='hover-shadow'
                                onClick={
                                    () => {
                                        return this.getSyntax(
                                            record.fileName,
                                            record.raagName,
                                            record.authorName
                                        );
                                    }
                                }>
                                    <td>{record.fileName}</td>
                                    <td>{record.raagName}</td>
                                    <td>{record.authorName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="page-status">
                        <div className="page-status-comp">
                            <span className="material-icons"
                            onClick={() => this.goFirstPage()}>
                                first_page
                            </span>
                        </div>
                        <div className="page-status-comp">
                            <span 
                            className="material-icons"
                            onClick={() => {this.goPreviousPage()}}
                            >
                                arrow_left
                            </span>
                        </div>

                        <div className="page-status-comp">
                            <input 
                            className="page-no" 
                            type="text" 
                            value={this.state.pageNo}
                            onChange={event => this.setState({pageNo: event.target.value})}/>
                        </div>

                        <div className="page-status-comp">/</div>
                        <div className="page-status-comp">{this.state.pages}</div>

                        <div className="page-status-comp">
                            <span 
                            className="material-icons"
                            onClick={() => this.goNextPage()}>
                                arrow_right
                            </span>
                        </div>
                        <div className="page-status-comp">
                            <span 
                            className="material-icons"
                            onClick={() => this.goLastPage()}>
                                last_page
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

async function postFetch(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    });

    return response;
}

export default SearchLibraryWindow;
