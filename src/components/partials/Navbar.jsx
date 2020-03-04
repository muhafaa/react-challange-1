import React from 'react';
import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

function Navigation(props) {
    return (
      <Navbar
        className="d-flex justify-content-between custom-gradient"
        style={{ zIndex: 10 }}
      >
        <NavLink to="/" className="navbar-brand text-center font-weight-bold" >
          Yu-Gi-Oh Deck
        </NavLink>

        <NavLink to="/my-deck" activeClassName="active" className="nav-item nav-link text-center font-weight-bold text-dark" >
          My Deck
        </NavLink>
      </Navbar>
    )    
}

export default Navigation