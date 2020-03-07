import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Button } from 'react-bootstrap'

const emptyDeck = () => {
  return (
    <Jumbotron className="bg-custom-gold m-auto">
      <h2>Your deck list is currently empty</h2>
      <Link
        to="/"
        className="d-flex justify-content-center mt-3 text-decoration-none"
      >
        <Button variant="info" className="font-weight-bold">
          Pick some card
        </Button>
      </Link>
    </Jumbotron>
  )
}

export default emptyDeck
