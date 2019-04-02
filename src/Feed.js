import React, { Component } from 'react';
import './App.css';
import Tweet from './Tweet';

function EmptyState(props) {
  return (
    <div className="dummy-tweet row">
      Loading...
    </div>
  )
}

class Feed extends Component {
  render() {
    return(
      <ul className="feed">
        {!this.props.isLoaded && <div className="dummy-tweet row">
          Loading...
        </div>}

        {
          this.props.tweets.map((tweet) => (
            <Tweet 
              key={tweet.id}
              obj={tweet}
            />
          ))
        }
      </ul>
    )
  }
}

export default Feed;