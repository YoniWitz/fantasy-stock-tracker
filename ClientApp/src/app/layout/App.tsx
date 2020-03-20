import React, { useState, useEffect, Fragment } from "react";
import "./custom.css";
import { IHolding } from "../models/IHolding";
import { NavMenu } from "../../components/NavMenu";
import { Container } from "react-bootstrap";
import { HoldingDashboard } from '../../components/holdings/dashboard/HoldingDashboard'
import axiosagent from "../api/axiosagent";
import { Spinning } from "./Spinning";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "../../components/home/HomePage";
import { LoginForm } from "../../components/users/forms/LoginForm";
import { IUser } from "../models/IUsers";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify';
import { RegisterForm } from "../../components/users/forms/RegisterForm"

const App = () => {
  let [holdings, setHoldings] = useState<IHolding[]>([]);
  let [selectedHolding, setSelectedHolding] = useState<IHolding | null>(null);
  let [spinning, setSpinning] = useState<boolean>(true);
  let [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    let tempUser: IUser = JSON.parse(localStorage.getItem('user')!);

    if (tempUser) {
      setUser({
        displayName: tempUser.displayName,
        token: tempUser.token,
        userName: tempUser.userName
      })

      axiosagent.HoldingsRequests.list()
        .then(holdingsJson =>
          // resJson.forEach(holding => holding.id = holding.date.split('.')[0].replace('T', ' '); )
          setHoldings(holdingsJson)
        )
        .then(() => setSpinning(false))
        .catch(err => console.log(`${err}, error fetching holdings`))
        .finally(() => setSpinning(false));
    }
    else {
      setSpinning(false);
    }
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
        .then(() => resolve('created'))
        .catch((err) => reject(err));
    })
  }

  const handleEditSubmit = (editedHolding: IHolding) => {
    return new Promise(function (resolve, reject) {
      axiosagent.HoldingsRequests.update(editedHolding.id, editedHolding)
        .then(updatedHolding => setHoldings([...holdings.filter(holding => holding.id !== updatedHolding.id), updatedHolding]))
        .then(() => resolve('updated'))
        .catch((err) => reject(err));
    })
  }

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <NavMenu setUser={setUser} user={user} setSelectedHolding={setSelectedHolding} handleCreateSubmit={handleCreateSubmit} />
      <Container style={{ marginTop: "10px" }}>
        <Switch>
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
          <Route exact path='/register'
            render={(props) => <RegisterForm  {...props} setUser={setUser} />} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment >
  );
};
export default App;
