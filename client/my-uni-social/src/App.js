import logo from './logo.svg';
import './App.css';
import React from 'react';
import { requirePropFactory } from '@mui/material';


class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      message: 'hello'
    }
  }
  sayState = () => alert(this.state.message)

  keys = require('../config/env')
  render() {

  return (
    <div className="App" message={this.sayState}>
      
    </div>
  );
  }

}

export default App;
