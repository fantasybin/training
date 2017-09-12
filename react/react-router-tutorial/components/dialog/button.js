import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    onClick: function () {},
    className: 'btn',
    url: null,
};

const propTypes = {
    children: PropTypes.node.isRequired,
};

class Component extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        return this.props.onClick();
    }

    render() {
        let className = this.props.className;

        return (
            <button onClick={this.handleClick} className={className}>
                {this.props.children}
            </button>
        );
    }

}

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

export default Component;
