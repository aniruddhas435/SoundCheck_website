import React, { Component } from 'react';
import LoadWithShadow from './LoadWithShadow';

export class PaginatedList extends Component {
    render() {
        return (
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
                        <LoadWithShadow 
                        isLoading={this.props.isLoading} 
                        loadingClassName='loading-file-list' />
                        {this.props.listOfFiles.map(record => (
                            <tr 
                            className='hover-shadow'
                            onClick={
                                () => {
                                    return this.props.getSyntax(
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
                        onClick={() => this.props.goFirstPage()}>
                            first_page
                        </span>
                    </div>
                    <div className="page-status-comp">
                        <span 
                        className="material-icons"
                        onClick={() => {this.props.goPreviousPage()}}
                        >
                            arrow_left
                        </span>
                    </div>

                    <div className="page-status-comp">
                        <input 
                        className="page-no" 
                        type="text" 
                        value={this.props.pageNo}
                        onChange={event => this.props.getRecordsForQuery(event.target.value)}/>
                    </div>

                    <div className="page-status-comp">/</div>
                    <div className="page-status-comp">{this.props.pages}</div>

                    <div className="page-status-comp">
                        <span 
                        className="material-icons"
                        onClick={() => this.props.goNextPage()}>
                            arrow_right
                        </span>
                    </div>
                    <div className="page-status-comp">
                        <span 
                        className="material-icons"
                        onClick={() => this.props.goLastPage()}>
                            last_page
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default PaginatedList;
