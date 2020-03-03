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
    axiosagent.Holdings.list()     
      .then((resJson: IHolding[]) => {
      // resJson.forEach(holding => holding.id = holding.date.split('.')[0].replace('T', ' '); )
      setHoldings(resJson)
    })
      .catch(err => console.log(`${err}, error fetching data`));
  }, []);

  const handleDeleteHolding = (id: string) => setHoldings(holdings.filter(holding => holding.id !== id));

  const handleCreateSubmit = (newHolding: IHolding) => setHoldings([...holdings, newHolding]);

  const handleEditSubmit = (editedHolding: IHolding) => setHoldings([...holdings.filter(holding => holding.id !== editedHolding.id), editedHolding]);

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
