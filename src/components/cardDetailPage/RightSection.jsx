import React from 'react';
import {Card} from 'react-bootstrap';

function RightSection({card}) {
    return (
        <Card className="bg-custom-opacity p-3">
          <Card className="bg-custom-cream mb-3 p-1">
            <h4 className="m-0 font-weight-bold">{card.name}</h4>
          </Card>

          <Card className="bg-custom-cream mb-3 p-1">
            <p className="m-0">Id: {card.id}</p>
          </Card>

          <Card className="bg-custom-cream mb-3 p-1">
            <p className="m-0">Race: {card.race}</p>
          </Card>

          <Card className="bg-custom-cream p-1">
            <h5 className="m-0"><strong>Description:</strong> {card.desc}</h5>
          </Card>
        </Card>
    );
}

export default RightSection;