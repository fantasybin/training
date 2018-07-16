import React, { Component } from 'react';


class Hello extends Component {
    
    constructor () {
        super();
        this.state = {
            opacity: 1.0
        }
    }
    componentDidMount  () {
      this.timer = setInterval(function () {
        var opacity = this.state.opacity;
        opacity -= .05;
        if (opacity < 0.1) {
          //clearInterval(this.timer);
          opacity = 1.0;
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    }

    render  () {
      return (
        <div style={{opacity: this.state.opacity}}>
          Hello {this.props.name}
        </div>
      );
    }
};

export default Hello