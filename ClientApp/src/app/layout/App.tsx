import React, { useState, useEffect, Fragment } from "react";
import "./custom.css";
import { IHolding } from "../models/IHolding";
import { NavMenu } from "../../components/NavMenu";
import { ListGroup, Container } from "react-bootstrap";

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
        <ListGroup>
          {holdings.map(holdings => (
            <ListGroup.Item key={holdings.id}>{holdings.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </Fragment>
  );
};
export default App;
