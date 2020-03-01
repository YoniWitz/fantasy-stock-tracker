import React from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Card, Button} from "react-bootstrap";

interface IProps {
  selectedHolding: IHolding;
  setEditMode: (isEditMode: boolean) => void;
  handleSelectHolding:(holding: number | string | null) => void;
}

export const HoldingDetails: React.FC<IProps> = ({ selectedHolding, setEditMode, handleSelectHolding }) => {
  return (
    <Card border="primary">
      <Card.Img
        variant="top"
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
      />
      <Card.Body>
        <Card.Title>{selectedHolding.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button block onClick={() => { setEditMode(true) }}>Sell</Button>{' '}
        <Button block onClick={() => handleSelectHolding(null)}>Cancel</Button>
      </Card.Body>
    </Card>
  );
};
