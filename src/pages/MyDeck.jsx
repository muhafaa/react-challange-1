import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '../Main.css'

import EmptyDeck from '../components/myDeck/emptyDeck'
import CardPreview from '../components/CardPreview'
import CardDetail from '../components/CardDetail'

const MyDeck = (props) => {
  const deckList = useSelector((state) => state.deckReducer.deckList)
  const [cardDetail, setCardDetail] = useState({})
  return (
    <>
      {(() => {
        if (deckList.length < 1) {
          return (
            <Row className="h-100">
              <EmptyDeck />
            </Row>
          )
        } else {
          return (
            <Row className="container-fluid mx-auto my-5">
              <Col sm={12} className="card bg-custom-cream p-3 my-2 mx-auto">
                <h2 className="font-weight-bold text-uppercase text-center m-0">
                  My Deck
                </h2>
              </Col>
              <Col sm={12} md={3}>
                {(() => {
                  if (cardDetail.hasOwnProperty('id')) {
                    return <CardDetail cardDetail={cardDetail} />
                  }
                })()}
              </Col>
              <Col
                sm={12}
                md={9}
                className="p-5 my-3 bg-custom-opacity text-white"
              >
                <Row>
                  {deckList.map((deck, i) => {
                    return (
                      <CardPreview
                        key={i}
                        item={deck}
                        setDetail={(card) => {
                          setCardDetail(card)
                        }}
                      />
                    )
                  })}
                </Row>
              </Col>
            </Row>
          )
        }
      })()}
    </>
  )
}

export default MyDeck
