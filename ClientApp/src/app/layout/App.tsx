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
import { LoginForm } from "../../components/users/forms/LoginForm";
import { IUser } from "../models/IUsers";

const App = () => {
  let [holdings, setHoldings] = useState<IHolding[]>([]);
  let [selectedHolding, setSelectedHolding] = useState<IHolding | null>(null);
  let [spinning, setSpinning] = useState<boolean>(true);
  let [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    axiosagent.HoldingsRequests.list()
      .then(holdingsJson =>
        // resJson.forEach(holding => holding.id = holding.date.split('.')[0].replace('T', ' '); )
        setHoldings(holdingsJson)
      )
      .then(() => setSpinning(false))
      .catch(err => console.log(`${err}, error fetching holdings`))
      .finally(() => setSpinning(false));
  }, []);

  const handleDeleteHolding = (id: string) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.delete(id)
        .then(() => setHoldings(holdings.filter(holding => holding.id !== id)))
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  const handleCreateSubmit = (newHolding: IHolding) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.create(newHolding)
        .then(createdHolding => setHoldings([...holdings, createdHolding]))
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  const handleEditSubmit = (editedHolding: IHolding) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.update(editedHolding.id, editedHolding)
        .then(updatedHolding => setHoldings([...holdings.filter(holding => holding.id !== updatedHolding.id), updatedHolding]))
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  return (
    <Fragment>
      <NavMenu user={user} setSelectedHolding={setSelectedHolding} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: "80px" }}>
        <Route exact path='/'
          render={(props) => <HomePage {...props} user={user} />} />
        {spinning ? <Spinning content='Loading Holdings' /> :
          <Route path='/holdings' render=
            {() =>
              <HoldingDashboard
                handleDeleteHolding={handleDeleteHolding}
                selectedHolding={selectedHolding}
                setSelectedHolding={setSelectedHolding}
                handleEditSubmit={handleEditSubmit}
                holdings={holdings} />}
          />
        }
        <Route exact path='/login'
          render={(props) => <LoginForm  {...props} setUser={setUser} />} />
      </Container>
    </Fragment >
  );
};
export default App;
