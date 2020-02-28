import React from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Row, Col, ListGroup } from "react-bootstrap";

interface IProps {
  holdings: IHolding[];
}
export const HoldingDashboard: React.FC<IProps> = ({ holdings }) => {
  return (
    <Row>
      <Col>
        <ListGroup>
          {holdings.map(holdings => (
            <ListGroup.Item key={holdings.id}>{holdings.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col lg="4"></Col>
    </Row>
  );
};
