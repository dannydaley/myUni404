import React from "react";
import { Button } from "@mui/material";

class ProfileTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userID: 1,
            email: "",
            aboutMe: "",
            course: "",
            year: 0,
            profilePicture: "",
            asked: 0,
            answered: 0,
            updateProfile: false,
        };
    }

    componentDidMount = async () => {
        this.setState({ contentLoaded: false });
        // this.setState({ settings: newSettings })
        //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
        fetch(process.env.REACT_APP_SERVER + "/getProfile", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: this.props.userID,
            }),
        })
            //TURN THE RESPONSE INTO A JSON OBJECT
            .then((response) => response.json())
            // .then(await this.delayFunction())
            // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
            .then((data) => {
                this.setState({
                    firstName: data.userData.firstName,
                    lastName: data.userData.lastName,
                    email: data.userData.email,
                    aboutMe: data.userData.aboutMe,
                    course: data.userData.course,
                    year: data.userData.year,
                    profilePicture: data.userData.profilePicture,
                    asked: data.userData.asked,
                    answered: data.userData.answered,
                });
                this.setState({ contentLoaded: true });
            });
    };

    onProfilePicChange = (event) => {};

    onAboutMeChange = (event) => {};

    updateProfile = () => this.setState({ updateProfile: true });
    render() {
        return (
            <div
                style={{
                    backgroundColor: "#292929",
                    width: "100%",
                    color: "whitesmoke",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        padding: "0 20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <img
                            alt="User profile-pic"
                            src={
                                process.env.REACT_APP_SERVER +
                                "/public/" +
                                this.state.profilePicture
                            }
                            style={{
                                minWidth: "120px",
                                height: "120px",
                                margin: "20px auto 0px ",
                                border: "1px solid gray",
                                borderRadius: "50%",
                            }}
                        />
                        {this.props.userData.userID === this.props.userID ? (
                            <div>
                                <Button
                                    id="loadFileXml"
                                    onClick={() =>
                                        document.getElementById("file").click()
                                    }
                                >
                                    Change profile picture
                                </Button>
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    id={"file"}
                                    name="file"
                                    onChange={() => this.onProfilePicChange()}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "80%",
                            flexWrap: "wrap",
                            margin: "0 auto",
                        }}
                    >
                        <h2>
                            {this.state.firstName} {this.state.lastName}
                        </h2>
                        <div
                            style={{
                                zIndex: "10",
                                marginTop: "70px",
                                minWidth: "200px",
                                maxWidth: "65%",
                                textAlign: "left",
                            }}
                        >
                            {this.state.updateProfile ? (
                                <div>
                                    <textarea
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                        }}
                                        onChange={(event) =>
                                            console.log(event.target.value)
                                        }
                                    >
                                        {this.state.aboutMe}
                                    </textarea>
                                </div>
                            ) : (
                                <h3>{this.state.aboutMe}</h3>
                            )}
                        </div>
                        <div
                            style={{
                                zIndex: "0",
                            }}
                        >
                            <h3>{this.state.course}</h3>
                            <h3>year: {this.state.year}</h3>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            margin: "0 auto",
                        }}
                    >
                        <h5 style={{ padding: "0 10px" }}>
                            questions asked: {this.state.asked}
                        </h5>
                        <h5 style={{ padding: "0 10px" }}>
                            questions answered: {this.state.answered}
                        </h5>
                    </div>
                </div>
                {this.props.userData.userID === this.props.userID ? (
                    <div>
                        <Button onClick={() => this.updateProfile()}>
                            Update profile info
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default ProfileTop;
