import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Post from './components/Post';
import PostFeed from './components/PostFeed';
import Topnav from './components/Topnav';

function App() {
  return (
    <div className='App'>
      <Router>
        <Topnav />
        <Switch>
          <Route exact path='/:id' component={Post} />
          <Route exact path='/' component={PostFeed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
