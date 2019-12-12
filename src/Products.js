import React from "react";

//import Movie from "./Movie";
import classes from "./Products.module.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const Products = ({ list }) => {
  let cards = <h3>Loading...</h3>;
  const columns = [{
	  dataField: 'DESCRIPTION',
	  text: 'Product ID'
	}, {
	  dataField: 'LIST_PRICE',
	  text: 'Product Name'
	}, {
	  dataField: 'IN_STOCK',
	  text: 'Product Price'
	}];
  if (list) {
   // cards = list.map((m, i) => <Movie key={i} item={m} />);
	  
    cards = <BootstrapTable keyField='ITEM_NUMBER' data={ list } columns={ columns } pagination={ paginationFactory() } />;
  }
  
  return (
      <div className="row marTop40">
        <div className="col-md-12">{cards}</div>
      </div>
  );
};


export default Products;
