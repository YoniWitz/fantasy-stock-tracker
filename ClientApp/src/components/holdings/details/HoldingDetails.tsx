import React from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Card, Button} from "react-bootstrap";

interface IProps {
  selectedHolding: IHolding;
  handleEditMode: (isEditMode: boolean) => void;
}

export const HoldingDetails: React.FC<IProps> = ({ selectedHolding, handleEditMode }) => {
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
        <Button block onClick={() => { handleEditMode(true) }}>Sell</Button>{' '}
        <Button block>Sell</Button>
      </Card.Body>
    </Card>
  );
};
