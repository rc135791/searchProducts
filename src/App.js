import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import { search } from "./utils";
import Products from "./Products";


class App extends Component {
  state = {
    products: null,
    loading: false,
    value: "",
    brands: null,
    proSize: null,
    proColor: null
  };

  search = async val => {
	this.setState({ loading: true });
    const results = await search(
       `${process.env.REACT_APP_OPENSHIFT_API_URL}api/v1/products/getProDetails?srch=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    const products = results;
    const brands = [...new Set(results.map(item => item.BRAND))]; 
	const proSize = [...new Set(results.map(item => item.SKU_ATTRIBUTE_VALUE1))];
	const proColor = [...new Set(results.map(item => item.SKU_ATTRIBUTE_VALUE2))];
    this.setState({ products, brands, proSize, proColor, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  componentDidMount= async e => {
	this.search('');
	this.setState({ value: '' });
  };
  get renderProducts() {
    //let products = <h1>Search products</h1>;
	let products;  
    if (this.state.products) {
    	this.state.products.forEach(function(item){
  		  var listPrice = parseFloat(item.LIST_PRICE);
  		  var disc = parseFloat(item.DISCOUNT);
  		  if(disc > 0){
  			 item.finalPrice = listPrice.toFixed(2);
  			 item.totalAfterDiscount = (listPrice + disc).toFixed(2);
  			 item.discClass = "rd_totalPrice";
  			 return item;
  		  }else{
  			 item.finalPrice = listPrice.toFixed(2); 
  			 item.totalAfterDiscount = 0; 
  			 item.discClass = "";
  			 return item;
  		  }
  		});
    	products = <Products prolist={this.state.products} brandList={this.state.brands} proSize={this.state.proSize} proColor={this.state.proColor} />;
    }
    return products;
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <img src="/assets/images/logo/container-riders-logo.png" />
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
