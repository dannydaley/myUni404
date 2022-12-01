import ProfileTop from "./ProfileTop";
import Button from "@mui/material/Button";
import React from "react";
import QuestionCard from "../Home/QuestionCard";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            feed: "asked",
            feedData: [],
        };
    }
    switchAsked = () => this.setState({ feed: "asked" });
    switchAnswered = () => this.setState({ feed: "answered" });

    //COMPONENT DID MOUNT IS BUILT IN AND RUNS WHEN THE COMPONENT MOUNTS
    componentDidMount = async () => {
        // this.setState({ settings: newSettings })
        //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
        fetch(process.env.REACT_APP_SERVER + "/getUserQuestionFeed", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: this.props.userID,
            }),
        })
            //TURN THE RESPONSE INTO A JSON OBJECT
            .then((response) => response.json())
            .then((data) => {
                this.setState({ feedData: data });
            });
    };

    render() {
        return (
            <>
                <ProfileTop
                    loggedInEmail={this.props.loggedInEmail}
                    userData={this.props.userData}
                    userID={this.props.userID}
                    userFirstName={this.props.userFirstName}
                    userLastName={this.props.userLastName}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "300px",
                        margin: "50px auto",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ width: "100px" }}
                        onClick={this.switchAsked}
                    >
                        Asked
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "100px" }}
                        onClick={this.switchAnswered}
                    >
                        Answered
                    </Button>
                </div>
                <div>
                    {this.state.feed === "asked" ? (
                        <div>
                            {}
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                        </div>
                    ) : (
                        <div>
                            <QuestionCard />
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Profile;
