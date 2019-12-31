import React, { Component } from "react";
//import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import { search } from "./utils";
import Products from "./Products";
import HeaderMenus from "./HeaderMenus";

import _ from 'lodash';

class App extends Component {
  constructor() {
    super();	
    this.state = {
      products: [],
      loading: false,
      value: "",
      brands: [],
      proSize: [],
      proColor: [],
      brandsArr: [],
      sizeArr: [],
      colorArr: [],
      hideSearch: "col-md-3 rd_search_section",
	  proFull: "col-md-9",
	  proSingle: "rd_single_product",
	  activePage: 1
    };
    this.handleProductsData = this.handleProductsData.bind(this);
    this.handleBrandsData = this.handleBrandsData.bind(this);
    this.handleSizeData = this.handleSizeData.bind(this);
    this.handleColorData = this.handleColorData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  handleProductsData(results) {
    this.setState({ products: results});
  }
  handleBrandsData(brandsList) {
	this.setState({ brandsArr: brandsList});
  }
  handleSizeData(sizesList) {
	this.setState({ sizeArr: sizesList});
  }
  handleColorData(colorsList) {
	this.setState({ colorArr: colorsList});
  }
  handlePageChange(pageNumber) {
	console.log(`active page is ${pageNumber}`);
	this.setState({activePage: pageNumber});
  }
  search = async val => {
	this.setState({ loading: true });
    const results = await search(
       `${process.env.REACT_APP_OPENSHIFT_API_URL}api/v1/products/getProDetails?srch=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    let products;
    console.log("********1**************");
    
    if(_.size(results) > 0 ){
    	window.sessionStorage.setItem("userSearchResults", JSON.stringify(results));
    	products = results;
    }else if(_.size(products) === 0 && _.size(JSON.parse(window.sessionStorage.getItem("userSearchResults"))) > 0){
    	products = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
    	console.log("******3******");
    }else{
    	products = [];
    	console.log("******4******");
    }
    console.log(_.size(products));
    console.log(_.size(JSON.parse(window.sessionStorage.getItem("userSearchResults"))));
    console.log("********2**************");
    
    //window.sessionStorage.setItem("userSearchedBrands", []);
    const brands = [...new Set(products.map(item => item.BRAND))]; 
	const proSize = [...new Set(products.map(item => item.SKU_ATTRIBUTE_VALUE1))];
	const proColor = [...new Set(products.map(item => item.SKU_ATTRIBUTE_VALUE2))];
	let hideSearch = "col-md-3 rd_search_section"; 
	let proFull = "col-md-9";
	let proSingle = "rd_single_product";
    this.setState({ products, brands, proSize, proColor, hideSearch, proFull, proSingle, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  componentDidMount= async e => {
	let current_path = window.location.href;
	let check_search = _.split(current_path, '/');
	let stored_results, products, hideSearch, proFull, proSingle, matchStr;
	matchStr = _.replace(check_search[4], /_/g, " ");
	if(_.size(check_search) > 4 ) {
		if(check_search[3] === 'brand'){
			stored_results = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
			products =  _.filter(stored_results, (item) => _.lowerCase(item.BRAND) === matchStr);
			hideSearch = "rd_search_none"; 
			proFull = "col-md-12";
			proSingle = "rd_multi_product";
		    this.setState({ products, hideSearch, proFull, proSingle, loading: false });
		}else if(check_search[3] === 'color'){
			stored_results = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
			products =  _.filter(stored_results, (item) => _.lowerCase(item.SKU_ATTRIBUTE_VALUE2) === matchStr);
			hideSearch = "rd_search_none"; 
			proFull = "col-md-12";
			proSingle = "rd_multi_product";
		    this.setState({ products, hideSearch, proFull, proSingle, loading: false });
		}
	}else{
		this.search('');
		this.setState({ value: '' });
	}
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
    	products = <Products onProductsDataChange={(results) => this.handleProductsData(results)} prolist={this.state.products} 
    	            onBrandsDataChange={this.handleBrandsData} brandsArr={this.state.brandsArr} brandList={this.state.brands}
    	            onSizeDataChange={this.handleSizeData} sizeArr={this.state.sizeArr} proSize={this.state.proSize} 
    	            onColorDataChange={this.handleColorData} colorArr={this.state.colorArr} proColor={this.state.proColor}
    	            hideSearch={this.state.hideSearch} proFull={this.state.proFull} proSingle={this.state.proSingle} 
    	            handlePageChange={this.handlePageChange} activePage={this.state.activePage} />;
    }
    return products;
  }
  get renderHeaderMenus() {
	  let headerMenus;
	  headerMenus = <HeaderMenus srcValues={this.state.value} changeHandler={this.onChangeHandler} />;
	  return headerMenus;
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            {this.renderHeaderMenus}
          </div>
          <div className="col-md-12 text-center rd_logo">
            RIDERS CART
          </div>
        </div>
        <div className="row">
          <div className="col-md-11 rd_search_none">
            <input value={this.state.value} onChange={e => this.onChangeHandler(e)} placeholder="Enter text to search" className="form-control"/>
          </div>
          <div className="col-md-1 rd_search_none">  <img src="/assets/images/mic/icon.png" alt="mic" className="rd_mic_icon" /></div>
          <div className="col-md-12">
            {this.renderProducts}
          </div>  
          <div className="col-md-12">
            <p className="rd_footer">&copy; Container Riders 2019</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
