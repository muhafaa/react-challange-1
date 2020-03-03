import React from 'react';
import {Navbar} from 'react-bootstrap';

function Navigation(props) {
    return (
      <Navbar
        bg="info"
        className="d-flex justify-content-center"
        style={{ zIndex: 10 }}
      >
        <Navbar.Brand href="#home" className="text-center font-weight-bold" >
          Yu-Gi-Oh Deck
        </Navbar.Brand>
      </Navbar>
    )    
}

export default Navigation