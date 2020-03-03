import React, { useState, useEffect, Fragment } from "react";
import "./custom.css";
import { IHolding } from "../models/IHolding";
import { NavMenu } from "../../components/NavMenu";
import { Container } from "react-bootstrap";
import { HoldingDashboard } from '../../components/holdings/dashboard/HoldingDashboard'
import axiosagent from "../api/axiosagent";

const App = () => {
  let [holdings, setHoldings] = useState<IHolding[]>([]);
  let [selectedHolding, setSelectedHolding] = useState<IHolding | null>(null);

  useEffect(() => {
    axiosagent.HoldingsRequests.list()
      .then(holdingsJson =>
        // resJson.forEach(holding => holding.id = holding.date.split('.')[0].replace('T', ' '); )
        setHoldings(holdingsJson)
      )
      .catch(err => console.log(`${err}, error fetching holdings`));
  }, []);

  const handleDeleteHolding = (id: string) => {
    axiosagent.HoldingsRequests.delete(id)
      .then(() => setHoldings(holdings.filter(holding => holding.id !== id)))
      .catch(err => console.log(`${err}, error deleting holding`));
  }

  const handleCreateSubmit = (newHolding: IHolding) => {
    axiosagent.HoldingsRequests.create(newHolding)
      .then(createdHolding => setHoldings([...holdings, createdHolding]))
      .catch(err => console.log(`${err}, error creating holding`));
  }

  const handleEditSubmit = (editedHolding: IHolding) => {
    axiosagent.HoldingsRequests.update(editedHolding.id, editedHolding)
      .then(updatedHolding => setHoldings([...holdings.filter(holding => holding.id !== editedHolding.id), updatedHolding]))
      .catch(err => console.log(`${err}, error updating holding`));
  }

  return (
    <Fragment>
      <NavMenu setSelectedHolding={setSelectedHolding} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: "60px" }}>
        <HoldingDashboard handleDeleteHolding={handleDeleteHolding} selectedHolding={selectedHolding} setSelectedHolding={setSelectedHolding} handleEditSubmit={handleEditSubmit} holdings={holdings} />
      </Container>
    </Fragment>
  );
};
export default App;
