import React from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Card, Button, Row, Col } from "react-bootstrap";
interface IProps {
  holding: IHolding;
}

export const HoldingDetails = () => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
      />
      <Card.Body>
        <Card.Title>name</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Row>
          <Col>
            <Button>Sell</Button>
          </Col>
          <Col>
            <Button>Sell</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
