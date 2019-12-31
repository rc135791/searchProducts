import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

//import { search } from "./utils";
//import Products from "./Products";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

const HeaderMenus = ({ onBrandsDataChange, brandsArr, brandList}) => {
	      let brands_product;
	      
		  console.log(onBrandsDataChange);
		  console.log("********7**********");
		  console.log(brandsArr);
		  console.log("********8**********");
		  console.log(brandList);
//		  brands_product = brandList.filter(item => item !== null).map((item, index) => (
//        		  <Nav.Link href="#home" key={index}>{item}</Nav.Link>
//      	  ));
    	  return (
    			  <Navbar className="navbar rd_bg_orange navbar-dark navbar-expand-sm" expand="lg">
    	          <Navbar.Toggle aria-controls="basic-navbar-nav" />
    	          <Navbar.Collapse id="basic-navbar-nav">
    	            <Nav className="mr-auto">
    	              <Nav.Link href="#home">Home</Nav.Link>
    	              <NavDropdown title="Brands" id="basic-nav-dropdown">
	  	                <NavDropdown.Item href="#action/3.1">colors page Reflex</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.2">MLANM</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.3">Gildan</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.1">IWOLLENCE</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.2">Workforce</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.3">PAUL JONES</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.1">MUSHARE</NavDropdown.Item>
	  	                <NavDropdown.Item href="#action/3.2">REACTION Kenneth Cole</NavDropdown.Item>
	  	              </NavDropdown>
    	              <NavDropdown title="Colors" id="basic-nav-dropdown">
    	                <NavDropdown.Item href="#action/3.1">Black</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.2">Green</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.3">Maroon</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.1">Blue</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.2">Gray</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.3">White</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.1">Red</NavDropdown.Item>
    	                <NavDropdown.Divider />
    	                <NavDropdown.Item href="#action/3.2">Wine Red</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.3">Dark Green</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.1">Coffee</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.2">Navy Blue</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.3">Army Green</NavDropdown.Item>
    	                <NavDropdown.Item href="#action/3.3">Gray-Blazer</NavDropdown.Item>
    	              </NavDropdown>
    	            </Nav>
    	            <Form inline>
    	              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    	              <Button variant="outline-success">Search</Button>
    	            </Form>
    	          </Navbar.Collapse>
    	        </Navbar>
    		  );	
};

export default HeaderMenus;