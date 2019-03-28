import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <section className="container search-container">
                <div className="row">
                    <div className="col-12 search-col">
                        <div className="form-group">
                            <input type="text" className="form-control" id="search" placeholder="Search news by keyword" autoComplete="off" onChange={(e) => this.props.inputChangeHandler(e)} onKeyPress={(e) => this.props.handleKeyPress(e)} />
                        </div>
                        <button className="btn btn-primary fw-700" onClick={() => this.props.buttonClick()}>Search</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default SearchBar