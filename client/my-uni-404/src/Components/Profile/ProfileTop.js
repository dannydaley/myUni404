import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

class ProfileTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userID: this.props.userID,
            email: "",
            aboutMe: "",
            course: "",
            year: 0,
            profilePicture: "",
            asked: 0,
            answered: 0,
            updateProfile: false,
            updateAboutMe: "",
        };
    }

    componentDidMount = async () => {
        this.setState({ contentLoaded: false });
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

    onProfilePictureChange = (event) => {
        this.updateProfilePicture(event.target.files[0]);
    };
    updateProfilePicture = async (image) => {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("uploader", this.state.firstName + this.state.lastName);
        formData.append("userID", this.props.userID);
        await axios
            .post(
                process.env.REACT_APP_SERVER + "/changeProfilePicture",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    body: JSON.stringify({
                        userID: this.props.userID,
                        name: this.state.firstName + this.state.lastName,
                    }),
                }
            )
            .then((res) => {
                this.props.updateProfilePicture(res.data.profilePicture);
                this.setState({ profilePicture: res.data.profilePicture });
            });
    };

    updateAboutMe = async () => {
        fetch(process.env.REACT_APP_SERVER + "/updateAboutMe", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: this.props.userID,
                aboutMe: this.state.updateAboutMe,
            }),
        })
            //TURN THE RESPONSE INTO A JSON OBJECT
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    aboutMe: this.state.updateAboutMe,
                    updateProfile: false,
                });
            });
    };

    onAboutMeChange = (event) =>
        this.setState({ updateAboutMe: event.target.value });

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
                        <div
                            style={{
                                backgroundImage:
                                    "url(" +
                                    process.env.REACT_APP_SERVER +
                                    "/public/" +
                                    this.state.profilePicture +
                                    ")",
                                backgroundSize: "cover",
                                minWidth: "120px",
                                height: "120px",
                                margin: "20px auto 0px ",
                                border: "1px solid gray",
                                borderRadius: "50%",
                            }}
                        ></div>
                        {this.props.userData.userID === this.props.userID ? (
                            <div>
                                <Button
                                    id="loadFileXml"
                                    onClick={() =>
                                        document
                                            .getElementById("file-input")
                                            .click()
                                    }
                                >
                                    Change profile picture
                                </Button>
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    id={"file-input"}
                                    name="file"
                                    onChange={this.onProfilePictureChange.bind(
                                        this
                                    )}
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
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <textarea
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                        }}
                                        onChange={(event) =>
                                            this.onAboutMeChange(event)
                                        }
                                    >
                                        {this.state.aboutMe}
                                    </textarea>
                                    <Button
                                        sx={{ margin: "0 auto", width: "100%" }}
                                        onClick={() => this.updateAboutMe()}
                                    >
                                        Submit changes
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: "300px",
                                        height: "200px",
                                    }}
                                >
                                    <h3>{this.state.aboutMe}</h3>
                                </div>
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
