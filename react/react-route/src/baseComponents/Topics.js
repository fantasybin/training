 import React, { Component } from 'react'
 import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link
} from 'react-router-dom'
import Topic from './Topic';

class Topics extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {
    alert('componentDidMount');
    console.info(this.props.history.goBack);
    //this.props.history.goBack()
  }
  handleClick () {
    alert('handleClick');
    console.info(document.querySelector('.list-container'));
    //document.querySelector('.list-container').style.display="none";
    console.info(this.props.history.goBack);
  }
  render() {
    let match = this.props.match;
    return (
      <div>
      <h2>Topics</h2>
      <ul className="list-container">
        <li>
          <Link to={`${match.url}/rendering`} onClick={this.handleClick.bind(this)}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>
      <div className="detail-container">
      <Route path="/topics/components" component={Topic}/>
      <Route path="/topics/props-v-state" component={Topic}/>
      <Route path="/topics/rendering" component={Topic}/>
      </div>
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
    )  
  }
  
}
export default withRouter(Topics);