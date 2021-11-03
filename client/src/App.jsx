import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import About from './components/About';
import FAQ from './components/FAQ';
import NotFound from './components/NotFound';
import Post from './components/Post';
import PostFeed from './components/PostFeed';
import Processing from './components/Processing';
import Pending from './components/Pending';
import Signin from './components/Signin';
import SigningIn from './components/SigningIn';
import Topnav from './components/Topnav';
import UserPosts from './components/UserPosts';

import coilPaymentPointer from './config/coil-monetization';

function App() {
  return (
    <div className='app'>
      <Helmet>
        <meta name='monetization' content={coilPaymentPointer} />
      </Helmet>
      <Router>
        <Topnav />
        <div className='scroll-wrapper'>
          <div className='scroll-container'>
            <Switch>
              <Route exact path='/p/:hash' component={Post} />
              <Route exact path='/' component={PostFeed} />
              <Route exact path='/processing' component={Processing} />
              <Route exact path='/pending' component={Pending} />
              <Route exact path='/u/:account' component={UserPosts} />
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/signing-in' component={SigningIn} />
              <Route exact path='/about' component={About} />
              <Route exact path='/faq' component={FAQ} />
              <Route exact path='/404' component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
