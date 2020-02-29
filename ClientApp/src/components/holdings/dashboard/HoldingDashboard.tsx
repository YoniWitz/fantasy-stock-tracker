import React, { useState } from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Row, Col } from "react-bootstrap";
import { HoldingList } from "./HoldingList";
import { HoldingDetails } from "../details/HoldingDetails";
import { HoldingForm } from "../form/HoldingForm";

interface IProps {
  holdings: IHolding[];
}
export const HoldingDashboard: React.FC<IProps> = ({ holdings }) => {
  let [selectedHolding, setSelectedHolding] = useState<IHolding | undefined>(undefined);

  const selectHolding = (id:string | number) =>{
    setSelectedHolding(holdings.find(holding => holding.id === id));
  }

  return (
    <Row>
      <Col>
        <HoldingList holdings={holdings} selectHolding={selectHolding} />
      </Col>
      <Col lg="4">
          {selectedHolding && <HoldingDetails selectedHolding={selectedHolding}/>}
          <HoldingForm/>
      </Col>
    </Row>
  );
};
