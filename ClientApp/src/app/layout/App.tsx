import React, { useState, useEffect, Fragment } from "react";
import "./custom.css";
import { IHolding } from "../models/IHolding";
import { NavMenu } from "../../components/NavMenu";
import { Container } from "react-bootstrap";
import {HoldingDashboard} from '../../components/holdings/dashboard/HoldingDashboard'

const App = () => {
  let [holdings, setHoldings] = useState<IHolding[]>([]);

  useEffect(() => {
    fetch("http://localhost:5002/holdings")
      .then(res => res.json())
      .then((resJson: IHolding[]) => setHoldings(resJson))
      .catch(err => console.log(`${err}, error fetching data`));
  });
  return (
    <Fragment>
      <NavMenu />
      <Container style={{ marginTop: "60px" }}>
       <HoldingDashboard holdings={holdings} />
      </Container>
    </Fragment>
  );
};
export default App;
