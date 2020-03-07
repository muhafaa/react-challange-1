import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import '../Main.css'
import '../Effect.css'

import addToDeck from '../actions/addToDeck'

function CardDetail(props) {
  const dispatch = useDispatch()
  const deckList = useSelector((state) => state.deckReducer.deckList)
  return (
    <Card
      className="flex-column text-center bg-custom-opacity text-white stick animate-slide-right"
      data-testid="card-detail"
    >
      <Card.Img
        src={props.cardDetail.card_images[0].image_url}
        data-testid="card-detail-image"
      />
      <Card.Body>
        <Card.Title className="font-weight-bold">
          {props.cardDetail.name}
        </Card.Title>
        <p className="mb-4 font-weight-bold">{props.cardDetail.type}</p>
        <Card style={{ backgroundColor: 'rgba(245, 222, 179, 0.8)' }}>
          <Card.Text
            className="mt-4 text-justify px-3 pb-3 text-truncate text-dark"
            data-testid="card-detail-desc"
          >
            {props.cardDetail.desc}
          </Card.Text>
          <Link
            to={`/card/${props.cardDetail.id}`}
            className="show-more"
            data-testid="toDetailPage"
          >
            Show More
          </Link>
        </Card>
        {(() => {
          if (!deckList.some((deck) => deck === props.cardDetail.id)) {
            return (
              <Card
                className="mt-3 p-1"
                style={{ backgroundColor: 'rgba(245, 222, 179, 0.8)' }}
              >
                <Button
                  className="font-weight-bold text-dark"
                  variant="outline-success"
                  onClick={() => {
                    dispatch(addToDeck(props.cardDetail))
                  }}
                  data-testid="btn-fav"
                >
                  Add to my deck
                </Button>
              </Card>
            )
          }
        })()}
      </Card.Body>
    </Card>
  )
}

export default CardDetail
