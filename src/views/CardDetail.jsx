import React from 'react';
import {Card} from 'react-bootstrap';
import '../Main.css';
import '../Effect.css'

function CardDetail({cardDetail}) {
    return (
      <Card className="flex-column text-center bg-custom-opacity text-white stick animate-slide-right">
        <Card.Img src={cardDetail.card_images[0].image_url} />
        <Card.Body>
          <Card.Title className="font-weight-bold">
            {cardDetail.name}
          </Card.Title>
          <p className="mb-4 font-weight-bold">{cardDetail.type}</p>
          <Card style={{ backgroundColor: 'rgba(245, 222, 179, 0.8)'}}>
            <Card.Text className="mt-4 text-justify px-3 pb-3 text-truncate text-dark">
              {cardDetail.desc}
            </Card.Text>
            <p className="show-more">Show More</p>
          </Card>
        </Card.Body>
      </Card>
    )
}

export default CardDetail