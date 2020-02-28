import React, { useState, useEffect } from 'react';
import './custom.css'
import { IHolding } from '../models/IHolding';
import { NavMenu } from '../../components/NavMenu';



const App = () => {
  let [holdings, setHoldings] = useState<IHolding[]>([]);

  useEffect(() => {
    fetch("http://localhost:5002/holdings")
      .then(res => res.json())
      .then((resJson: IHolding[]) => setHoldings(resJson))
      .catch(err => console.log(`${err}, error fetching data`));
  });
  return (
    <div>
      <NavMenu />
      <ul>
        {holdings.map(holdings =>
          (
            <li key={holdings.id}>{holdings.name}</li>
          ))}
      </ul>
    </div>
  );
}
export default App;