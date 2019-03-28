import React, { Component } from 'react';
import Axios from 'axios';
import SearchBar from './Search';

class NewsFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            searchValue: '',
            subheading: 'Latest news articles from India'
        }
    }

    componentDidMount() {
        Axios.get('top-headlines?country=in&apiKey=ca6a627a17d54a65ab22d68e8230b775').then(response => {
            const responseData = response.data.articles;
            this.setState({ articles: responseData });
        })
    }

    cardClick(url) {
        if (url) {
            window.open(url, '_blank')
        }
    }

    inputChangeHandler(e) {
        this.setState({ searchValue: e.target.value })
    }

    buttonClick() {
        if (this.state.searchValue) {
            Axios.get(`everything?q=${this.state.searchValue}&sortBy=popularity&apiKey=ca6a627a17d54a65ab22d68e8230b775`).then(response => {
                const responseData = response.data.articles;
                this.setState({ articles: responseData, subheading: `News articles for ${this.state.searchValue}` });
            })
        }
        else {
            Axios.get('top-headlines?country=in&apiKey=ca6a627a17d54a65ab22d68e8230b775').then(response => {
                const responseData = response.data.articles;
                this.setState({ articles: responseData, subheading: 'Latest news articles from India' });
            })
        }
    }

    handleKeyPress(e) {
        if ((e.key === 'Enter') && (this.state.searchValue)) {
            Axios.get(`everything?q=${this.state.searchValue}&sortBy=popularity&apiKey=ca6a627a17d54a65ab22d68e8230b775`).then(response => {
                const responseData = response.data.articles;
                this.setState({ articles: responseData, subheading: `News articles for ${this.state.searchValue}` });
            })
        }
        else {
            Axios.get('top-headlines?country=in&apiKey=ca6a627a17d54a65ab22d68e8230b775').then(response => {
                const responseData = response.data.articles;
                this.setState({ articles: responseData, subheading: 'Latest news articles from India' });
            })
        }
    }

    render() {
        return (
            <div>
                <SearchBar inputChangeHandler={this.inputChangeHandler.bind(this)} buttonClick={this.buttonClick.bind(this)} handleKeyPress={this.handleKeyPress.bind(this)} />
                <div className="container">
                    <div className="row">
                        <div className="col-12 subheading">
                            <p className="fw-700">{this.state.subheading}</p>
                        </div>
                        {
                            this.state.articles && this.state.articles.length ?
                                this.state.articles.map((article, index) => {
                                    return <div key={index} className="col-12 col-md-6 col-lg-4">
                                        <div className="card-container" onClick={() => this.cardClick(article.url)}>
                                            <div className="img-container">
                                                <img src={article.urlToImage} alt={article.title} />
                                            </div>
                                            <div className="news-title pd-rl-10">
                                                <h2 className="fw-700">{article.title}</h2>
                                            </div>
                                            <div className="news-content pd-rl-10">
                                                <p>{article.description}</p>
                                            </div>
                                            <div className="news-footer pd-rl-10">
                                                <div className="posted-date">
                                                    {
                                                        article.publishedAt ?
                                                            <div>
                                                                <p>Published on : {article.publishedAt.split('T')[0]}</p>
                                                            </div> : ''
                                                    }
                                                    {
                                                        article.author ?
                                                            <div>
                                                                <p>Published By : {article.author}</p>
                                                            </div> : ''
                                                    }
                                                </div>
                                                {
                                                    article.source.name ?
                                                        <div className="source">
                                                            <p>Source : {article.source.name}</p>
                                                        </div> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsFeed