import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:8000/api/users';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get(URL)
      .then(({data}) => {
        console.log(data);
        this.setState({data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Node-Express-Mini</h1>
        </header>
        <p className="App-intro">
        </p>
        {this.state.data.map(item => {
          return (
            <div key={item.id}>
              <p>{`${item.name} - ${item.bio}`}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
