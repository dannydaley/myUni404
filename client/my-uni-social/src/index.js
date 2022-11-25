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
} from "react-router-dom";

import FullQuestion from './Components/FullQuestion/FullQuestion';
import AccountSettings from './Components/Account/AccountSettings';
import QuestionFeed from './Components/Home/QuestionFeed';
import SignInForm from './Components/SignIn/SignInForm';
import SignUpForm from './Components/SignIn/SignUp';

const router = createBrowserRouter([
  {
    path:  "",
    element: <SignInPage />,    
    children: [
      {
        path: "",
        element: <SignInForm />
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
    element: <HomePage />,
    children: [
      {
        path: "feed",
        element: <QuestionFeed />
      },
      {
        path: "ask",
        element: <AskQuestion />
      },
      {
        path: "feed/question",
        element: <FullQuestion />
      },
      {
        path: "account",
        element: <AccountSettings />
      }
    ]
  }
]);
// this.state = {
//   message: 'helloooooo'
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>    
    <RouterProvider router={router} />
  </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <App />
//     <HomePage />
//       {/* <SignInPage /> */}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
