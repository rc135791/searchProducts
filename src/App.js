import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import { search } from "./utils";
import Products from "./Products";


class App extends Component {
  state = {
    products: null,
    loading: false,
    value: ""
  };

  search = async val => {
	this.setState({ loading: true });
    const results = await search(
       `${process.env.REACT_APP_OPENSHIFT_API_URL}api/v1/products/getProDetails?srch=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    const products = results;
    this.setState({ products, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderProducts() {
    let products = <h1>Search products</h1>;
    if (this.state.products) {
    	products = <Products list={this.state.products} />;
    }
    return products;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <img src="/assets/images/logo/riders-shop-cart.png" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input value={this.state.value} onChange={e => this.onChangeHandler(e)} placeholder="Enter text to search" className="form-control"/>
            {this.renderProducts}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
