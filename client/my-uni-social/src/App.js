import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Home/NavBar';
import HomeGrid from './Components/Home/HomeGrid';
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import AskQuestion from './Components/AskQuestion';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      message: 'hello'
    }
  }
  sayState = () => alert(this.state.message)

  render() {

  return (
    <div className="App" message={this.sayState}>

    </div>
  );
  }

}

export default App;
