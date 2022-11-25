import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Home/NavBar';
import HomeGrid from './Components/Home/HomeGrid';
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import AskQuestion from './Components/AskQuestion';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useSlotProps } from '@mui/base';
import Question from './Components/Home/QuestionCard';
import FullQuestion from './Components/FullQuestion/FullQuestion';
import AccountSettings from './Components/Account/AccountSettings';
import QuestionFeed from './Components/Home/QuestionFeed';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignInPage />,
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
