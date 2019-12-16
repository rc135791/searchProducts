import React from "react";

//import Movie from "./Movie";
import classes from "./Products.module.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const Products = ({ prolist, brandList, proSize, proColor }) => {
  let products_list = <h3>Loading...</h3>;
  let search_box, brands_product, product_size, product_color, search_results;
  const columns = [
	  {
	    dataField: 'DESCRIPTION',
	    text: 'Product Name'
	  },
	  {
	    dataField: 'BRAND',
	    text: 'Brand'
	  },
	  {
		dataField: 'SKU_ATTRIBUTE_VALUE2',
		text: 'Color'
	  },
	  {
	    dataField: 'LIST_PRICE',
	    text: 'Product Price'
	  },
	  {
		dataField: 'IN_STOCK',
		text: 'In Stock'
	  }
	  
	  ];
  if (prolist) {
	  brands_product = brandList.filter(item => item !== null).map((item, index) => (
	    <li key={index}><input type="checkbox" name="brand[]" value={item} className="form-check-input" /> {item}</li>
	  ));
	  product_size = proSize.filter(item => item !== null).map((item, index) => (
			    <li key={index}><input type="checkbox" name="prSize[]" value={item} className="form-check-input" /> {item}</li>
	  ));
	  product_color = proColor.filter(item => item !== null).map((item, index) => (
	    	<li key={index}><input type="checkbox" name="prCol[]" value={item} className="form-check-input" /> {item}</li>
	  ));
	  products_list = prolist.filter(item => item.ITEM_NUMBER !== null).map((item, index) => (
		<div className="rd_single_product" key={item.ITEM_NUMBER}>	
		  <div className="rd_pro_section">
	        <div className="rd_left text-center"><img src={"/assets/images/products/"+item.ITEM_NUMBER+".jpg"} className="rd_proimg" /></div>
	        <div className="rd_left rd_wrapTxt  text-center" title={item.DESCRIPTION}>{item.DESCRIPTION}</div>
	        <div className="rd_left text-center">-</div>
	        <div className="rd_left text-center">{item.finalPrice} <span className={item.discClass}>{item.totalAfterDiscount == 0 ? '':item.totalAfterDiscount}</span></div>
	      </div>
	    </div>    
    ));
  }
  
  return (
      <div className="row marTop40">
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
        <div className="col-md-9">{products_list}</div>
      </div>
  );
};


export default Products;
