import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import About from './components/About';
import FAQ from './components/FAQ';
import NotFound from './components/NotFound';
import Post from './components/Post';
import PostFeed from './components/PostFeed';
import Signin from './components/Signin';
import SigningIn from './components/SigningIn';
import Topnav from './components/Topnav';
import UserPosts from './components/UserPosts';

function App() {
  return (
    <div className='App'>
      <Helmet>
        <meta name='monetization' content='$ilp.uphold.com/FE6nKdXejmre' />
      </Helmet>
      <Router>
        <Topnav />
        <Switch>
          <Route exact path='/p/:id' component={Post} />
          <Route exact path='/' component={PostFeed} />
          <Route exact path='/u/:account' component={UserPosts} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signing-in' component={SigningIn} />
          <Route exact path='/about' component={About} />
          <Route exact path='/faq' component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
