import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import AskQuestion from './Components/AskQuestion';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useLocation,
} from "react-router-dom";

import FullQuestion from './Components/FullQuestion/FullQuestion';
import AccountSettings from './Components/Account/AccountSettings';
import QuestionFeed from './Components/Home/QuestionFeed';
import SignInForm from './Components/SignIn/SignInForm';
import SignUpForm from './Components/SignIn/SignUp';
import { useSlotProps } from '@mui/base';


class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      mailNotifications: 0,
      notifications: ["1", "2", "3"],
      alertNotifications: 0,
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userProfilePicture: ''      
    }
  }

  setUserData = (userFirstName, userLastName, userEmail, userProfilePicture, isSignedIn )=> {
    this.setState({ userFirstName: userFirstName, userLastName: userLastName, userEmail: userEmail, userProfilePicture: userProfilePicture, isSignedIn: isSignedIn })
  }
  updateLoggedInUser = (email) => {
  this.setState({ loggedInEmail: email}) 
}
changeRoute = (route) => {
  this.setState({ route: route })
}

postInfo = (postDataIn) => this.postData = postDataIn

router = createBrowserRouter([
  {
    path:  "",
    element: <SignInPage />,    
    children: [
      {
        path: "",
        element: <SignInForm  />
      },
      {
        path: "/",
        element: <SignInForm />
      },
      {
        path: "signin",
        element: <SignInForm />
      },
      {
        path: "signup",
        element: <SignUpForm />
      }
    ]
  },
  {
    path: "/home",
    element: <HomePage />
  }
]);


  render() {
    return (
      <div className="App" >
        { this.state.isSignedIn ? 
          <>
          <HomePage userData={this.state}/>
          </> : <SignInPage route={this.state.route} changeRoute={this.changeRoute} setUserData={this.setUserData}/>
        }
      </div>
    );
  }

}

export default App;







