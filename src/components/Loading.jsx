import React from 'react'
import Logo from '../assets/circle.png'
import { Col, Image } from 'react-bootstrap'
import '../Main.css'
import '../Effect.css'

function Loading(params) {
  return (
    <Col className="d-flex align-items-center loading" sm={12}>
      <div className="flex-column text-center mx-auto bg-custom-opacity">
        <Image
          src={Logo}
          width="300"
          height="300"
          roundedCircle
          className="animate-spin"
        />
        <p className="font-weight-bold my-1">Loading, Please Wait</p>
      </div>
    </Col>
  )
}

export default Loading
