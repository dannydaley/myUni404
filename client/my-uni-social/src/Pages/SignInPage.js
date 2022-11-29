import SignInForm from "../Components/SignIn/SignInForm";
import SignInLeft from "../Components/SignIn/SignInLeft";
import Divider from "@mui/material/Divider";
import React from "react";
import SignUpForm from "../Components/SignIn/SignUp";

export default class SignIn extends React.Component {
    render() {
        let { changeRoute, setUserData, route } = this.props;

        if (route === "signin" || route === "signout") {
            return (
                <div
                    style={{
                        backgroundColor: "#292929",
                        display: "flex",
                        flexDirection: "row",
                        width: "100vw",
                        height: "100vh",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <SignInLeft />
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        style={{ height: "50%" }}
                    />

                    <SignInForm
                        changeRoute={changeRoute}
                        setUserData={setUserData}
                    />
                </div>
            );
        } else if (route === "signup") {
            return (
                <div
                    style={{
                        backgroundColor: "#292929",
                        display: "flex",
                        flexDirection: "row",
                        width: "100vw",
                        height: "100vh",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <SignInLeft />
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        style={{ height: "50%" }}
                    />
                    <SignUpForm changeRoute={changeRoute} />
                </div>
            );
        }
    }
}
