import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

// This component is a function that gets compiled to regular javascript. Is not actual html. Returns JSX
// When you create a component you are creating a class of a component. This is a singular instance of that component
// You can have multiple instances of App component.
// Can think of it as a factory which means it is not a class or constructor that returns a presumably new object
// When you write JSX, and a component name is in there, it's a class, but when used in JSX it turns it into an instance
// <App /> instantiates is opening and closing tag
// A functional component is a component that is a function
// A class component is a component that needs to be aware of itself. It recognizes when something happens to it
// Handling events in REact has two steps, event handler, pass event handler to element that we want to have
// Downwards data flow. Means parent should be responsible for passing down data

const API_KEY = 'AIzaSyBY6r55Tn3r5PPVITf7NqQRX7lcpE8u17o';


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });

        });
    }
    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'))