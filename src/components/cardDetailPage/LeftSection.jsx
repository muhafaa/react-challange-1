import React from 'react';
import {Card} from 'react-bootstrap';
import '../../Main.css'

const LeftSection = ({card}) => {
    return (
        <>
          <Card>
            <Card.Img variant="top" src={card.card_images[0].image_url} />
          </Card>

            <Card className="bg-custom-opacity mt-3 p-3">
              <Card className="bg-custom-gold my-1">
                <p className="text-center font-weight-bold m-0">TYPE: {card.type}</p>
              </Card>

              <Card className="bg-custom-gold my-1">
                <p className="text-center font-weight-bold m-0">LEVEL: {card.level}</p>
              </Card>

              <Card className="bg-custom-gold my-1">
                <p className="text-center font-weight-bold m-0">ATK: {card.atk}</p>
              </Card>

              <Card className="bg-custom-gold my-1">
                <p className="text-center font-weight-bold m-0">DEF: {card.def}</p>
              </Card>   
            </Card>
        </>
    );
};

export default LeftSection;