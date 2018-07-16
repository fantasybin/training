import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Content from './Content'

export default class BasicRouting extends Component {
  render() {
    return (
      <div>
      <h1>BasicRouting</h1>
      <p>With the help of "Match" Component we can specify the Component we want to render for a particular pattern of the App location/window.pathname.</p>
      <p>Select a level from Left Navigation to view the content, also notice the change in URL.</p>
      <div className="leftNavi">
      	<ul>
      		<li><Link to={this.props.match.url +"/prod"} className="active">Level 1</Link></li>
      		<li><Link to={this.props.match.url + "/level2"} className="active">Level 2</Link></li>
      		<li><Link to={this.props.match.url + "/level3"} className="active">Level 3</Link></li>
      	</ul>
      </div>
      
      	  <Route path={`${this.props.match.url}/prod`} exact={true} component={Content}/>
          
          
       
      </div>
    )
  }
}