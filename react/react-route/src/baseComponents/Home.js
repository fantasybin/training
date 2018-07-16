 import React from 'react';
  import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link
} from 'react-router-dom'
 import Header from './Header';
const Home = () => (
  <div>
  <Header />
    <h2>Home</h2>
  </div>
)
export default withRouter(Home)