import React from "react";
import Pagination from "react-bootstrap/Pagination";
import _ from 'lodash';
//import classes from "./Products.module.css";
//import BootstrapTable from 'react-bootstrap-table-next';
//import paginationFactory from 'react-bootstrap-table2-paginator';
//import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


const Products = ({ onProductsDataChange, prolist, onBrandsDataChange, brandsArr, brandList, 
	                onSizeDataChange, sizeArr, proSize, 
	                onColorDataChange, colorArr, proColor }) => {
  let products_list = <h3>Loading...</h3>;
  let active = 2;
  let page_items = [];
  let brands_product, product_size, product_color, search_results;
  let temp_results_arr = [];
  const userSearchResultsCurrent = JSON.parse(window.sessionStorage.getItem("userSearchResults"));
  if (prolist) {
	  const toggle = (event, option, search_type) => {
		   if (event.target.checked) {
		    	switch(search_type) {
		          case 1: brandsArr.push(option);
		          		  break;
		          case 2: sizeArr.push(option);
          		  	      break;
		          case 3: colorArr.push(option);
          		          break;
          		  default: break;        
		        }		    	
		    } else {
		    	switch(search_type) {
		          case 1: _.remove(brandsArr, function(n) {
				        	 return n === option;
				          });
		          		  break;
		          case 2: _.remove(sizeArr, function(n) {
					         return n === option;
				          });
        		  	      break;
		          case 3: _.remove(colorArr, function(n) {
					        return n === option;
				          });
        		          break;
        		  default: break;
		        };
		    }
		    
	        if(_.size(brandsArr) > 0 )
	        {
	        	search_results =  _.filter(userSearchResultsCurrent, (item) => _.includes(brandsArr, item.BRAND));
	        	temp_results_arr = search_results;
	        }
	        if(_.size(sizeArr) > 0 )
	        {
	        	search_results =  _.filter((_.size(temp_results_arr) > 0 ? temp_results_arr : userSearchResultsCurrent), (item) => _.includes(sizeArr, item.SKU_ATTRIBUTE_VALUE1));
	        	temp_results_arr = search_results;
	        }
	        if(_.size(colorArr) > 0 )
	        {
	        	search_results =  _.filter((_.size(temp_results_arr) > 0 ? temp_results_arr : userSearchResultsCurrent), (item) => _.includes(colorArr, item.SKU_ATTRIBUTE_VALUE2));
	        	temp_results_arr = search_results;
	        }
	        if(_.size(brandsArr) === 0 && _.size(sizeArr) === 0 && _.size(colorArr) === 0){
	        	search_results = userSearchResultsCurrent;
	        }
	        onProductsDataChange(search_results);
	  };
	   
	   
	  brands_product = brandList.filter(item => item !== null).map((item, index) => (
	    <li key={index}><input type="checkbox" name="brand[]" value={item} onClick={event => toggle(event, item, 1)} className="form-check-input" /> {item}</li>
	  ));
	  product_size = proSize.filter(item => item !== null).map((item, index) => (
			    <li key={index}><input type="checkbox" name="prSize[]" value={item} onClick={event => toggle(event, item, 2)} className="form-check-input" /> {item}</li>
	  ));
	  product_color = proColor.filter(item => item !== null).map((item, index) => (
	    	<li key={index}><input type="checkbox" name="prCol[]" value={item} onClick={event => toggle(event, item, 3)} className="form-check-input" /> {item}</li>
	  ));
	  
	  for (let number = 1; number <= 5; number++) {
		  page_items.push(
	      <Pagination.Item key={number} active={number === active}>
	        {number}
	      </Pagination.Item>,
	    );
	  }
//	  const paginationBasic = (
//		  
//		);
	  products_list = prolist.filter(item => item.ITEM_NUMBER !== null).map((item, index) => (
		<div className="rd_single_product" key={item.ITEM_NUMBER}>	
		  <div className="rd_pro_section">
	        <div className="rd_left text-center"><img src={"/assets/images/products/"+item.ITEM_NUMBER+".jpg"} alt={item.ITEM_NUMBER} className="rd_proimg" /></div>
	        <div className="rd_left rd_wrapTxt rd_red_border text-center rd_marg_top20" title={item.DESCRIPTION}>{item.DESCRIPTION}</div>
	        <div className="rd_left text-center">{item.BRAND} {item.SKU_ATTRIBUTE_VALUE1} {item.SKU_ATTRIBUTE_VALUE2}</div>
	        <div className="rd_left text-center">{item.finalPrice} <span className={item.discClass}>{item.totalAfterDiscount === 0 ? '':item.totalAfterDiscount}</span></div>
	      </div>
	    </div>    
    ));
  }
  
  return (
      <div className="row marTop40">
        <div className="col-md-9">
          {products_list} 
          
        </div>
        <div className="col-md-3 rd_search_section">
          <div className="rd_left rd_border_grey rd_marg_bot20">
           <div className="rd_search_title">Brands</div>
           <div className="rd_left"><ul className="rd_list_style rd_font_uppercase">{brands_product}</ul></div>
          </div>  
          <div className="rd_left rd_border_grey rd_marg_bot20">
            <div className="rd_search_title">Size</div>
            <div className="rd_left"><ul className="rd_list_style rd_font_uppercase">{product_size}</ul></div>
          </div>
          <div className="rd_left rd_border_grey rd_marg_bot20">
            <div className="rd_search_title">Color</div>
            <div className="rd_left"><ul className="rd_list_style rd_font_uppercase">{product_color}</ul></div>
          </div>
        </div>        
      </div>
  );
};

export default Products;
