import React from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import NavLink from './NavLink';
import Home from './Home';
import { IndexLink } from 'react-router';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

/*    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><IndexLink to="/" onlyActiveOnIndex={true}>Home</IndexLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                <div>{this.props.children || <Home/>}</div>
            </div>
        );
    }
*/
    render() {
        return (
                <div>
                    <h1>React Router Tutorial</h1>
                    <ul role="nav">
                        <li><IndexLink to="/" onlyActiveOnIndex={true}>Home</IndexLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/repos">Repos</NavLink></li>
                    </ul>
                    <ReactCSSTransitionGroup
                        transitionName="transitionWrapper"
                        component="div"
                        className="transitionWrapper"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                    <div key={this.props.location.pathname}
                         style={{position:"absolute", width: "100%"}}>
                        {
                            this.props.children
                        }
                    </div>
                    </ReactCSSTransitionGroup>
                </div>
        );
    }
}

export default App