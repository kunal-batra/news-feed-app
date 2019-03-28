import React, { Component } from 'react';
import NewsFeed from './components/newsArticle';
import './css/style.css';
import Header from './components/header';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<NewsFeed />
			</div>
		);
	}
}

export default App;
