import React, { Component } from 'react';
// import LoadWithShadow from './LoadWithShadow';
import PaginatedList from './PaginatedList';

export class SearchLibraryWindow extends Component {
    state = {
        fileName: '',
        raagName: '',
        authorName: '',
        pageNo: 0,
        pages: 0,
        isLoading: false,
        listOfFiles: []
    };

    goFirstPage = () => {
        if(this.state.pageNo === 1) return;
        if(this.state.pages < 1) return;
        
        this.setState({
            pageNo: 1
        }, () => this.getRecordsForQuery(this.state.pageNo));
    };

    goPreviousPage = () => {
        if(this.state.pageNo === 1) return;

        this.setState({
            pageNo: this.state.pageNo - 1
        }, () => this.getRecordsForQuery(this.state.pageNo));
    };

    goNextPage = () => {
        if(this.state.pageNo === this.state.pages) return;

        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => this.getRecordsForQuery(this.state.pageNo));
    };

    goLastPage = () => {
        if(this.state.pageNo === this.state.pages) return;
        if(this.state.pages < 1) return;

        this.setState({
            pageNo: this.state.pages
        }, () => this.getRecordsForQuery(this.state.pages));
    };

    getRecordsForQuery = pageNo => {
        console.log(this.state.pages);
        if(pageNo < 0 || pageNo > this.state.pages) return;

        const body = {
            fileName: this.state.fileName,
            raagName: this.state.raagName,
            authorName: this.state.authorName,
            pageNo: pageNo - 1,
            pageSize: 7
        };

        this.setState({isLoading: true})

        postFetch(
            "https://soundcheck-getsequence.herokuapp.com/controller/getSyntaxListForQuery",
            JSON.stringify(body)
        ).then(res => res.json())
        .then(data => {
            console.log(data['page']);
            this.setState({
                isLoading: false,
                listOfFiles: data['page'],
                pageNo: pageNo,
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
                    onChange={event => {
                        this.setState({
                            raagName: event.target.value,
                            pages: 1
                        },
                            () => this.getRecordsForQuery(1)
                        );
                    }} 
                    />

                    <input 
                    type="text" 
                    className="search-field"
                    placeholder='🔎 Raag Name'
                    value={this.state.raagName}
                    onChange={event => {
                        this.setState({
                            raagName: event.target.value,
                            pages: 1
                        },
                            () => this.getRecordsForQuery(1)
                        );
                    }} 
                    />

                    <input 
                    type="text" 
                    className="search-field"
                    placeholder='🔎 Author Name' 
                    value={this.state.authorName}
                    onChange={event => {
                        this.setState({
                            raagName: event.target.value,
                            pages: 1
                        },
                            () => this.getRecordsForQuery(1)
                        );
                    }} 
                    />

                    <button 
                    className='form-button search-button'
                    onClick={() => {
                        this.setState({
                            pages: 1
                        },
                        () => this.getRecordsForQuery(1));
                    }}>
                        Search
                    </button>
                </div>

                <PaginatedList
                    isLoading={this.state.isLoading}
                    listOfFiles={this.state.listOfFiles}
                    getSyntax={this.getSyntax}
                    pageNo={this.state.pageNo}
                    pages={this.state.pages}
                    goFirstPage={this.goFirstPage}
                    goLastPage={this.goLastPage}
                    goNextPage={this.goNextPage}
                    goPreviousPage={this.goPreviousPage}
                    getRecordsForQuery={this.getRecordsForQuery}
                />
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
