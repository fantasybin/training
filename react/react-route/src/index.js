import ReactDOM from 'react-dom'
import React from 'react'
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));

/*import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import Home from './Components/Home';
import BasicRouting from './Components/BasicRouting';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <ul>
        <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/basic-routing" activeClassName="active">BasicRouting</NavLink></li>
      </ul>

      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/basic-routing" component={BasicRouting} />
      </Switch>
    </div>
  </BrowserRouter>
  , document.getElementById('root'))*/

//registerServiceWorker();
