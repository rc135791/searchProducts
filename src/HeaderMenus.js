import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';


const HeaderMenus = ({srcValues, changeHandler, fetchText, micImg, micGif, navigatePage }) => {
	       return (
    			  <Navbar className="navbar rd_bg_orange navbar-dark navbar-expand-sm" expand="lg">
    	          <Navbar.Toggle aria-controls="basic-navbar-nav" />
    	          <Navbar.Collapse id="basic-navbar-nav">
    	            <Nav className="mr-auto">
    	              <Nav.Link onClick={e => navigatePage(e, 'home',  3)} href="#home">Home</Nav.Link>
    	              <NavDropdown title="Brands" id="basic-nav-dropdown">
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'reflex',  1)} href="#brand/reflex">Reflex</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'mlanm',  1)}  href="#brand/mlanm">MLANM</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'gildan',  1)} href="#brand/gildan">Gildan</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'iwollence',  1)} href="#brand/iwollence">IWOLLENCE</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'workforce',  1)} href="#brand/workforce">Workforce</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'paul_jones',  1)} href="#brand/paul_jones">PAUL JONES</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'mushare',  1)} href="#brand/mushare">MUSHARE</NavDropdown.Item>
	  	                <NavDropdown.Item onClick={e => navigatePage(e, 'reaction_kenneth_cole',  1)} href="#brand/reaction_kenneth_cole">REACTION Kenneth Cole</NavDropdown.Item>
	  	              </NavDropdown>
    	              <NavDropdown title="Colors" id="basic-nav-dropdown">
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'black',  2)} href="#color/black">Black</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'green',  2)} href="#color/green">Green</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'maroon',  2)} href="#color/maroon">Maroon</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'blue',  2)} href="#color/blue">Blue</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'gray',  2)} href="#color/gray">Gray</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'white',  2)} href="#color/white">White</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'red',  2)} href="#color/red">Red</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'wine_red',  2)} href="#color/wine_red">Wine Red</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'dark_green',  2)} href="#color/dark_green">Dark Green</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'coffee',  2)} href="#color/coffee">Coffee</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'navy_blue',  2)} href="#color/navy_blue">Navy Blue</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'army_green',  2)} href="#color/army_green">Army Green</NavDropdown.Item>
    	                <NavDropdown.Item onClick={e => navigatePage(e, 'gray-blazer',  2)} href="#color/gray-blazer">Gray-Blazer</NavDropdown.Item>
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