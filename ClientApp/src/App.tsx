import React, { Component } from 'react';
import './custom.css'

 class App extends Component {
  state = {
    values:[]
  }

  componentDidMount(){
    fetch("http://localhost:5001/holding")
    .then(res => res.json())
    .then(resJson => console.log(resJson))
    .catch(err => console.log(err, "error fetching data"));
  }

  render () {
    return (
      <div>
      hello
      </div>
    );
  }
}
export default App;