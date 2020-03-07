import React from 'react'
import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Navigation(props) {
  return (
    <Navbar
      className="d-flex justify-content-between custom-gradient"
      style={{ zIndex: 10 }}
      data-testid="navbar"
    >
      <NavLink
        to="/"
        className="navbar-brand text-center font-weight-bold"
        data-testid="linkToHome"
      >
        Yu-Gi-Oh Deck
      </NavLink>

      <NavLink
        to="/my-deck"
        activeClassName="active"
        className="nav-item nav-link text-center font-weight-bold text-dark"
        data-testid="linkToDeck"
      >
        My Deck
      </NavLink>
    </Navbar>
  )
}

export default Navigation
