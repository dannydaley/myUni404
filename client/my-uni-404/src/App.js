import React from "react";
import "./index.css";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import NavBar from "./Components/Home/NavBar";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import SignInForm from "./Components/SignIn/SignInForm";
import SignUpForm from "./Components/SignIn/SignUp";

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            route: "signin",
            isSignedIn: false,
            mailNotifications: 0,
            notifications: ["1", "2", "3"],
            alertNotifications: 0,
            userID: 0,
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userProfilePicture: "",
        };
    }

    setUserData = (
        userID,
        userFirstName,
        userLastName,
        userEmail,
        userProfilePicture,
        isSignedIn
    ) => {
        this.setState({
            userID: userID,
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userProfilePicture: userProfilePicture,
            isSignedIn: isSignedIn,
        });
    };
    updateLoggedInUser = (email) => {
        this.setState({ loggedInEmail: email });
    };
    changeRoute = (route) => {
        this.setState({ route: route });
    };

    postInfo = (postDataIn) => (this.postData = postDataIn);

    router = createBrowserRouter([
        {
            path: "",
            element: <SignInPage />,
            children: [
                {
                    path: "",
                    element: <SignInForm />,
                },
                {
                    path: "/",
                    element: <SignInForm />,
                },
                {
                    path: "signin",
                    element: <SignInForm />,
                },
                {
                    path: "signup",
                    element: <SignUpForm />,
                },
            ],
        },
        {
            path: "/home",
            element: <HomePage />,
            children: [],
        },
    ]);

    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <>
                        <NavBar />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HomePage
                                    userProfilePicture={this.state.userProfilePicture}
                                        userData={this.state}
                                        userID={this.state.userID}
                                        userFirstName={this.state.userFirstName}
                                        userLastName={this.state.userLastName}
                                    />
                                }
                            />
                        </Routes>
                    </>
                ) : (
                    <SignInPage
                        route={this.state.route}
                        changeRoute={this.changeRoute}
                        setUserData={this.setUserData}
                    />
                )}
            </div>
        );
    }
}

export default App;
