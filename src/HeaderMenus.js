import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';


const HeaderMenus = ({srcValues, changeHandler, fetchText, micImg, micGif }) => {
	       return (
    			  <Navbar className="navbar rd_bg_orange navbar-dark navbar-expand-sm" expand="lg">
    	          <Navbar.Toggle aria-controls="basic-navbar-nav" />
    	          <Navbar.Collapse id="basic-navbar-nav">
    	            <Nav className="mr-auto">
    	              <Nav.Link href="/">Home</Nav.Link>
    	              <NavDropdown title="Brands" id="basic-nav-dropdown">
	  	                <NavDropdown.Item href="/brand/reflex">Reflex</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/mlanm">MLANM</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/gildan">Gildan</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/iwollence">IWOLLENCE</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/workforce">Workforce</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/paul_jones">PAUL JONES</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/mushare">MUSHARE</NavDropdown.Item>
	  	                <NavDropdown.Item href="/brand/reaction_kenneth_cole">REACTION Kenneth Cole</NavDropdown.Item>
	  	              </NavDropdown>
    	              <NavDropdown title="Colors" id="basic-nav-dropdown">
    	                <NavDropdown.Item href="/color/black">Black</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/green">Green</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/maroon">Maroon</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/blue">Blue</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/gray">Gray</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/white">White</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/red">Red</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/wine_red">Wine Red</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/dark_green">Dark Green</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/coffee">Coffee</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/navy_blue">Navy Blue</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/army_green">Army Green</NavDropdown.Item>
    	                <NavDropdown.Item href="/color/gray-blazer">Gray-Blazer</NavDropdown.Item>
    	              </NavDropdown>
    	            </Nav>
    	            <Form inline>
    	              <input value={srcValues} onChange={e => changeHandler(e)} placeholder="Enter text to search" className="form-control rd_width_80"/>
    	              <img onClick={e => fetchText(e)} className={micImg} src="/assets/images/mic/icon.png" alt="mic" />
    	              <img className={micGif} src="/assets/images/mic/mic-recording.gif" alt="mic_recording" />			  
    	            </Form>
    	          </Navbar.Collapse>
    	        </Navbar>
    		  );	
};

export default HeaderMenus;