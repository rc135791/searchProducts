import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { search } from "./utils";
import Products from "./Products";
import HeaderMenus from "./HeaderMenus";
import Slider from "./Slider";
import Brandsfixed from "./Brandsfixed";
//import Shoppingcart from "./Shoppingcart";
import _ from 'lodash';

class App extends Component {
  constructor() {
    super();	
    this.state = {
      products: [],
      allProducts: [],
      loading: false,
      value: "",
      brands: [],
      proSize: [],
      proColor: [],
      brandsArr: [],
      sizeArr: [],
      colorArr: [],
      cartData: [],
      hideSearch: "col-md-3 rd_search_section",
	  proFull: "col-md-9",
	  proSingle: "rd_single_product",
	  activePage: 1,
	  micImg: "rd_mic",
	  micGif: "rd_mic_receiver rd_search_none",
	  nullResults: "rd_search_none"
    };
    this.handleProductsData = this.handleProductsData.bind(this)
    this.handleBrandsData = this.handleBrandsData.bind(this)
    this.handleSizeData = this.handleSizeData.bind(this)
    this.handleColorData = this.handleColorData.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.imgMouseOut = this.imgMouseOut.bind(this)
    this.imgMouseOver = this.imgMouseOver.bind(this)
    this.updateCartData = this.updateCartData.bind(this)
    this.navigatePage = this.navigatePage.bind(this)
    //window.sessionStorage.setItem("cartData", []);
    
  }
  handleProductsData(results) {
    this.setState({ products: results});
  }
  updateCartData(event, item, type, itemId) {
	  let tempCartData = this.state.cartData;
	  if(type == 1){
		tempCartData.push(item);
		this.state.cartData = tempCartData;
	  }else if(type == 2){
		tempCartData = tempCartData.filter(item => item.ITEM_NUMBER != itemId);
		this.state.cartData = tempCartData;
	  }
	  this.setState({ cartData: tempCartData});
	//  window.sessionStorage.setItem("cartData", tempCartData);
  }
  navigatePage(e, pageName, type){
	  console.log(pageName);
	  let products, hideSearch, proFull, proSingle, nullResults, stored_results;
	  let matchStr = _.replace(pageName, /_/g, " ");
	  nullResults = "rd_search_none";
	  if(type === 1){
		  stored_results = this.state.allProducts;
		  products =  _.filter(stored_results, (item) => _.lowerCase(item.BRAND) === matchStr);
		  hideSearch = "rd_search_none"; 
		  proFull = "col-md-12";
		  proSingle = "rd_multi_product";
		 this.setState({ products, hideSearch, proFull, proSingle, nullResults, loading: false, activePage: 1 });
	  }else if(type === 2){
		stored_results = this.state.allProducts;
		products =  _.filter(stored_results, (item) => _.lowerCase(item.SKU_ATTRIBUTE_VALUE2) === matchStr);
		hideSearch = "rd_search_none"; 
		proFull = "col-md-12";
		proSingle = "rd_multi_product";
	    this.setState({ products, hideSearch, proFull, proSingle, nullResults,  loading: false, activePage: 1 });
	  }else if(type === 3){
		 this.search('');
		 this.setState({ value: '' });  
	  }
  }
  imgMouseOut() {
	//console.log("Mouse out!!!");
  }
	  
  imgMouseOver(tts) {
	 //console.log("Mouse over!!!");
	 
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
	this.setState({activePage: pageNumber});
  }
  search = async val => {
	this.setState({ loading: true });
    const results = await search(
       `${process.env.REACT_APP_OPENSHIFT_API_URL}api/v1/products/getProDetails?srch=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    let products, hideSearch, proFull, proSingle, nullResults;
    if(_.size(this.state.allProducts) == 0){
    	this.setState({allProducts: results});
    }
    if(_.size(results) > 0 ){
    	window.sessionStorage.setItem("userSearchResults", JSON.stringify(results));
    	products = results;
    	hideSearch = "col-md-3 rd_search_section"; 
    	proFull = "col-md-9";
    	proSingle = "rd_single_product";
    	nullResults = "rd_search_none";    	
    }else{
    	products = [];
    	hideSearch = "rd_search_none"; 
    	proFull = "rd_search_none";
    	proSingle = "rd_single_product";
    	nullResults = "col-md-12 rd_no_results";
    }
    this.setState({activePage: 1});
// ################################### use below code in localhost to store results in session as sql connection gets logged out    
//    else if(_.size(products) === 0 && _.size(JSON.parse(window.sessionStorage.getItem("userSearchResults"))) > 0){
//    	products = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
//    	console.log("******3insdie******");
//    }
 // ################################### use above code in localhost to store results in session as sql connection gets logged out    
    
    const brands = [...new Set(products.map(item => item.BRAND))]; 
	const proSize = [...new Set(products.map(item => item.SKU_ATTRIBUTE_VALUE1))];
	const proColor = [...new Set(products.map(item => item.SKU_ATTRIBUTE_VALUE2))];
	this.setState({ products, brands, proSize, proColor, hideSearch, proFull, proSingle, nullResults, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };
  
  fetchText = async e => {
	    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	    let finalTranscript = '';
	    let recognition = new window.SpeechRecognition();
	    //recognition.interimResults = true;
	    //recognition.maxAlternatives = 10;
	    recognition.continuous = true;
	    this.setState({activePage:1, micImg: "rd_mic rd_search_none", micGif: "rd_mic_receiver"});
	    recognition.onresult = (event) => {
	    	
	    	let interimTranscript = '';
	      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
	        let transcript = event.results[i][0].transcript;
	        if (event.results[i].isFinal) {
	          finalTranscript += transcript;
	        } else {
	          interimTranscript += transcript;
	        }
	      }
	      recognition.stop();
	      this.setState({activePage: 1, micImg: "rd_mic", micGif: "rd_mic_receiver rd_search_none", value: finalTranscript});
	      this.search(finalTranscript);
	     // this.search("");
	      
	    }
	    setTimeout(
		    function() {
		    	this.setState({activePage: 1, micImg: "rd_mic", micGif: "rd_mic_receiver rd_search_none", value: finalTranscript});
		    }
		    .bind(this),
		    6000
		 );
	    recognition.start();
  };
  
  componentDidMount= async e => {
	  
//	let current_path = window.location.href;
//	let check_search = _.split(current_path, '/');
//	let stored_results, products, hideSearch, proFull, proSingle, matchStr, nullResults;
//	matchStr = _.replace(check_search[4], /_/g, " ");
//	nullResults = "rd_search_none";
//	if(_.size(check_search) > 4 ) {
//		if(check_search[3] === 'brand'){
//			stored_results = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
//			products =  _.filter(stored_results, (item) => _.lowerCase(item.BRAND) === matchStr);
//			hideSearch = "rd_search_none"; 
//			proFull = "col-md-12";
//			proSingle = "rd_multi_product";
//		    this.setState({ products, hideSearch, proFull, proSingle, nullResults, loading: false });
//		}else if(check_search[3] === 'color'){
//			stored_results = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
//			products =  _.filter(stored_results, (item) => _.lowerCase(item.SKU_ATTRIBUTE_VALUE2) === matchStr);
//			hideSearch = "rd_search_none"; 
//			proFull = "col-md-12";
//			proSingle = "rd_multi_product";
//		    this.setState({ products, hideSearch, proFull, proSingle, nullResults,  loading: false });
//		}
//	}else{
		this.search('');
		this.setState({ value: '' });
//	}
  };
  get renderProducts() {
    //let products = <h1 >Search products</h1>;
	let products= <h1 >Search products</h1>;  
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
    	            handlePageChange={this.handlePageChange} activePage={this.state.activePage} nullResults={this.state.nullResults} 
    	            imgMouseOut={this.imgMouseOut} imgMouseOver={this.imgMouseOver} updateCartData={this.updateCartData} cartData={this.state.cartData} />;
    }
    return products;
  }
  get detailsPage(){
	  let products= <h1 >Search products</h1>;  
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
	    	            handlePageChange={this.handlePageChange} activePage={this.state.activePage} nullResults={this.state.nullResults} 
	    	            imgMouseOut={this.imgMouseOut} imgMouseOver={this.imgMouseOver} updateCartData={this.updateCartData} cartData={this.state.cartData} />;
	    }
	    return products;
  }
  get renderHeaderMenus() {
	  let headerMenus;
	  headerMenus = <HeaderMenus srcValues={this.state.value} changeHandler={this.onChangeHandler} fetchText={this.fetchText} micImg={this.state.micImg} micGif={this.state.micGif} navigatePage={this.navigatePage} />;
	  return headerMenus;
  }
   
  render() {
	return (
      <div className="container">
        <Brandsfixed />
        <div className="row">
          <div className="col-md-12 rd_nav_fixed">
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
            <Slider />
          </div>
          <div className="col-md-12">
            {this.renderProducts}
          </div>  
          <div className="col-md-12 rd_footer">
            <div className="rd_footer_left">
              <p>Follow Us</p>
              <p>
	            <img src="/assets/images/logo/pinterest.png" alt="pinterest.png" className="rd_follow_us" />
	            <img src="/assets/images/logo/twitter.png" alt="twitter.png" className="rd_follow_us" />
	            <img src="/assets/images/logo/facebook.png" alt="facebook.png" className="rd_follow_us" />
              </p> 	  
            </div>
            <div className="rd_footer_left">
              <p>About Us</p>
              <p className="rd_text_13">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p> 	  
            </div>
            <div className="rd_footer_left rd_float_right">
              <p>Contact Us</p>
              <p className="rd_text_13">24 Street, temp building, <br /> Pin Code: 232323</p> 	  
            </div>
            <div className="rd_left">&copy; Container Riders 2019</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
