 import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Home from './baseComponents/Home';
import About from './baseComponents/About';
import Topics from './baseComponents/Topics';
import Header from './baseComponents/Header';
import Topic from './baseComponents/Topic';

const BasicExample = () => (
  <Router>
    <div>
      <hr/>
      <Switch>
      
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" exact={true} component={Topics}/>      
      </Switch>
    </div>
  </Router>
)


export default BasicExample