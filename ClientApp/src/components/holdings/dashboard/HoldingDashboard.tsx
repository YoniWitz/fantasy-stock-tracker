import React from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Row, Col } from "react-bootstrap";
import { HoldingList } from "./HoldingList";
import { HoldingDetails } from "../details/HoldingDetails";

interface IProps {
  holdings: IHolding[];
}
export const HoldingDashboard: React.FC<IProps> = ({ holdings }) => {
  return (
    <Row>
      <Col>
        <HoldingList holdings={holdings} />
      </Col>
      <Col lg="4">
          <HoldingDetails />
      </Col>
    </Row>
  );
};
