import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from './components/About';
import FAQ from './components/FAQ';
import Post from './components/Post';
import PostFeed from './components/PostFeed';
import Rules from './components/Rules';
import Topnav from './components/Topnav';
import UserPosts from './components/UserPosts';

function App() {
  return (
    <div className='App'>
      <Router>
        <Topnav />
        <Switch>
          <Route exact path='/p/:id' component={Post} />
          <Route exact path='/' component={PostFeed} />
          <Route exact path='/u/:address' component={UserPosts} />
          <Route exact path='/about' component={About} />
          <Route exact path='/rules' component={Rules} />
          <Route exact path='/faq' component={FAQ} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
