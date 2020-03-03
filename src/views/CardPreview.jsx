import React from 'react';
import {Col, Image} from 'react-bootstrap';

function CardPreview({item, setDetail}) {
  return (
    <Col key={item.id} sm={4} md={3} lg={3} className="my-2">
      <Image
        src={item.card_images[0].image_url}
        fluid
        className="kartu"
        onClick={() => {
          setDetail(item)
        }}
      />
    </Col>
  )
}

export default CardPreview