import React from "react";
import "./index.css";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";

import { Route, Routes } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
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

    updateProfilePicture = (newLocation) =>
        this.setState({ userProfilePicture: newLocation });
    postInfo = (postDataIn) => (this.postData = postDataIn);

    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HomePage
                                        updateProfilePicture={
                                            this.updateProfilePicture
                                        }
                                        userProfilePicture={
                                            this.state.userProfilePicture
                                        }
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
