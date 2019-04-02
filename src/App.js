import React, { Component, Fragment } from 'react';
import './App.css';
import TweetBox from './TweetBox';
import Feed from './Feed';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: [],
      error: null,
      isLoaded: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // You will want to do some fetching!
  }

  handleSubmit(newText) {
    // this.setState({isLoaded: false});

    // Static UI :(
    let newTweet = {
      id: this.state.tweets.length + 1,
      user_name: 'Usuario1',
      avatar: '...',
      created_at: '11-03-2019',
      description: newText
    };

    //let tweets = this.state.tweets.slice();

    //this.setState({ tweets: tweets.concat(newTweet) });

    let headers = {};
    headers['Content-Type'] = 'application/json';

    const options = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(newTweet)
    };
    
    fetch("https://still-garden-88285.herokuapp.com/draft_tweets", options)
      .then(res => res.json())
      .then (
        (result) => {
          let newTweets = this.state.tweets.slice();

          this.setState({
              isLoaded: true,
              tweets: newTweets.concat(result.tweet)
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


  }

  render() {
    const { error, isLoaded, tweets } = this.state;
    let content;

    if (error) {
      content = <div>Error: {error.message}</div>;
    } else {
      return (
        content = (
          <Fragment>
            <TweetBox
              onSubmitNewTweet={this.handleSubmit}
            />
            <Feed 
              tweets={tweets}
              isLoaded={isLoaded}
            />
          </Fragment>
        )
      );
    }

    return (
      <div className="App">
        { content }
      </div>
    )
  }
}

export default App;
