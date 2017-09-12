import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

class FilterableProductTable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput (filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }

    render () {
        return (
        <div>
            <SearchBar filterText={this.state.filterText} 
            inStockOnly={this.state.inStockOnly}
            onUserInput={this.handleUserInput} />
            <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
        </div>
        )
    }
}

export default FilterableProductTable;