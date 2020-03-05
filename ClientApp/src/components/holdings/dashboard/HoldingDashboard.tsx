import React, { useState } from "react";
import { IHolding } from "../../../app/models/IHolding";
import { Row, Col } from "react-bootstrap";
import { HoldingList } from "./HoldingList";
import { HoldingDetails } from "../details/HoldingDetails";
import { HoldingForm } from "../form/HoldingForm";

interface IProps {
  holdings: IHolding[];
  handleEditSubmit: (holding: IHolding) => Promise<unknown>;
  setSelectedHolding: (holding: IHolding) => void;
  selectedHolding: IHolding | null;
  handleDeleteHolding: (id: string) => Promise<unknown>;
}
export const HoldingDashboard: React.FC<IProps> = ({ holdings, handleEditSubmit, setSelectedHolding, selectedHolding, handleDeleteHolding }) => {
  let [editMode, setEditMode] = useState<boolean>(false);

  const handleSelectedHolding = (id: string | null) => {
    setSelectedHolding(holdings.filter(holding => holding.id === id)[0]);
    setEditMode(false);
  }

  return (
    <Row>
      <Col>
        <HoldingList handleDeleteHolding={handleDeleteHolding} holdings={holdings} handleSelectHolding={handleSelectedHolding} />
      </Col>
      <Col lg="4">
        {selectedHolding && !editMode && <HoldingDetails handleSelectedHolding={handleSelectedHolding} selectedHolding={selectedHolding} setEditMode={setEditMode} />}
        {editMode && <HoldingForm setSelectedHolding={setSelectedHolding} handleSubmit={handleEditSubmit} formHolding={selectedHolding} onCancelForm={setEditMode} />}
      </Col>
    </Row>
  );
};
