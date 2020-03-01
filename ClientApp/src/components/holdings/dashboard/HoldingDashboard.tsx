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
  let [editMode, setEditMode] = useState<boolean>(false);

  const handleSelectHolding = (id: string | number | null) => setSelectedHolding(holdings.find(holding => holding.id === id));

  return (
    <Row>
      <Col>
        <HoldingList holdings={holdings} handleSelectHolding={handleSelectHolding} />
      </Col>
      <Col lg="4">
        {selectedHolding && !editMode && <HoldingDetails handleSelectHolding={handleSelectHolding} selectedHolding={selectedHolding} setEditMode={setEditMode} />}
        {editMode && <HoldingForm onCancelForm={setEditMode} />}
      </Col>
    </Row>
  );
};
