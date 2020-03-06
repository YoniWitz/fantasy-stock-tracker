import React, { useState, useEffect, Fragment } from "react";
import "./custom.css";
import { IHolding } from "../models/IHolding";
import { NavMenu } from "../../components/NavMenu";
import { Container } from "react-bootstrap";
import { HoldingDashboard } from '../../components/holdings/dashboard/HoldingDashboard'
import axiosagent from "../api/axiosagent";
import { Spinning } from "./Spinning";
import { Route } from "react-router-dom";
import { HomePage } from "../../components/home/HomePage";

const App = () => {
  let [holdings, setHoldings] = useState<IHolding[]>([]);
  let [selectedHolding, setSelectedHolding] = useState<IHolding | null>(null);
  let [spinning, setSpinning] = useState<boolean>(true);

  useEffect(() => {
    axiosagent.HoldingsRequests.list()
      .then(holdingsJson =>
        // resJson.forEach(holding => holding.id = holding.date.split('.')[0].replace('T', ' '); )
        setHoldings(holdingsJson)
      )
      .then(() => setSpinning(false))
      .catch(err => console.log(`${err}, error fetching holdings`));
  }, []);

  const handleDeleteHolding = (id: string) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.delete(id)
        .then(() => setHoldings(holdings.filter(holding => holding.id !== id)))
        .then(() => resolve())
        .catch(err => console.log(`${err}, error deleting holding`));
    })
  }

  const handleCreateSubmit = (newHolding: IHolding) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.create(newHolding)
        .then(createdHolding => setHoldings([...holdings, createdHolding]))
        .then(() => resolve())
        .catch(err => console.log(`${err}, error creating holding`));
    })
  }

  const handleEditSubmit = (editedHolding: IHolding) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.update(editedHolding.id, editedHolding)
        .then(updatedHolding => setHoldings([...holdings.filter(holding => holding.id !== updatedHolding.id), updatedHolding]))
        .then(() => resolve())
        .catch(err => console.log(`${err}, error updating holding`));
    })
  }

  return (
    <Fragment>
      <NavMenu setSelectedHolding={setSelectedHolding} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: "80px" }}>
        <Route path='/' component={HomePage} />
        {spinning ? <Spinning content='Loading Holdings' /> :
          <Route path='/holdings' render=
            {(props) =>
              <HoldingDashboard {...props}
                handleDeleteHolding={handleDeleteHolding}
                selectedHolding={selectedHolding}
                setSelectedHolding={setSelectedHolding}
                handleEditSubmit={handleEditSubmit}
                holdings={holdings} />}
          />
         } 
      </Container>
    </Fragment >
  );
};
export default App;
