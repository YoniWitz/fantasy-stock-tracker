import React, { useState } from "react";
import { Media, Button, Badge, Spinner } from "react-bootstrap";
import { IHolding } from "../../../app/models/IHolding";

interface IProps {
  holdings: IHolding[];
  handleSelectHolding: (id: string | null) => void;
  handleDeleteHolding: (id: string) => Promise<unknown>;
}

export const HoldingList: React.FC<IProps> = ({ holdings, handleSelectHolding, handleDeleteHolding }) => {
  let [target, setTarget] = useState<string>('');

  const handleDeleteButton = (id: string) => {
    setTarget(id);
    handleDeleteHolding(id)
      .then(() => setTarget(''));
      handleSelectHolding(null);
  }
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

            </p>
            <Button style={{ margin: '5px', float: "right" }} variant="danger" onClick={() => handleDeleteButton(holding.id)}>
              {target === holding.id  ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                : 'Delete'}
            </Button>
            <Button style={{ margin: '5px', float: "right" }} onClick={() => handleSelectHolding(holding.id)}>
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
