import React from "react";
import { Media, Button, Badge } from "react-bootstrap";
import { IHolding } from "../../../app/models/IHolding";

interface IProps {
  holdings: IHolding[];
  handleSelectHolding: (id: string | number) => void;
}

export const HoldingList: React.FC<IProps> = ({ holdings, handleSelectHolding }) => {
  return (
    <ul>
      {holdings.map(holding => (
        <Media key={holding.id} as="li" className="border-bottom border-primary rounded" style={{ backgroundColor: 'white', padding: '4px' }}>
          <img
            width={64}
            height={64}
            className="mr-3"
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>{holding.name}</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
              in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
            <Button style={{ margin: '5px', float: "right" }} color="blue" onClick={() => handleSelectHolding(holding.id)}>
              View
            </Button>
            <Badge pill variant="info">
              tag
            </Badge>
          </Media.Body>
        </Media>
      ))}
    </ul>
  );
};
