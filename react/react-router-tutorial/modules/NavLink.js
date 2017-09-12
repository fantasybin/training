import React from 'react';
import { Link } from 'react-router';

export default class NavLink extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div style={{width:'50px', height:'50px',background:'#f5f5f0'}}><Link {...this.props} activeClassName="active"/></div>
        );
    }
} 