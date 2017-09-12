import React from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class Repo extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
             <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={5000} transitionLeaveTimeout={3000}>
          <div>
                <h2>{ this.props.params.userName }</h2>
            </div>
        </ReactCSSTransitionGroup>
            
        )
    }
}