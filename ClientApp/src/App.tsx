import React, { Component } from 'react';
import './custom.css'

 class App extends Component {
  state = {
    values:[]
  }

  componentDidMount(){
    fetch("http://localhost:5002/holdings")
    .then(res => res.json())
    .then(resJson =>this.setState({values:resJson}))
    .catch(err => console.log(`${err}, error fetching data`));
  }

  render () {
    return (
      <div>
      <ul>
        {this.state.values.map((value :any) => 
          (
            <li key={value.id}>{value.name}</li>
          ))}
      </ul>

      </div>
    );
  }
}
export default App;