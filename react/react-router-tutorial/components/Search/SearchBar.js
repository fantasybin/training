import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (event) {
        this.props.onUserInput(this.refs.filterTextInput.value, this.refs.inStockOnlyInput.value);
    }
    render () {
        return (
            <form>
            <input type="text" placeholder="Search..." ref="filterTextInput" value={this.props.filterText} onChange={this.handleChange} />
            <p>
              <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange} />
              {' '}
              Only show products in stock
            </p>
            </form>
        )
    }
}

export default SearchBar;