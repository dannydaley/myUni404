/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CodeEditor from "../CodeEditor";

export default class CreateReply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorID: this.props.userID,
            author: this.props.userFirstName + " " + this.props.userLastName,
            title: "reply",
            relativePostID: this.props.relativePostID,
            text: "",
            code: "",
            language: this.props.language,
            category: this.props.category,
            shortSubmit: false,
        };
    }

    //expand and retract answer box
    expandAnswer = () => {
        this.setState({ expanded: true });
    };
    retractAnswer = () => {
        this.setState({ expanded: false });
    };

    //handle input changes
    onTextChange = (event) => this.setState({ text: event.target.value });
    onCodeChange = (event) => this.setState({ code: event.target.value });

    //handle form submit
    submitAnswer = () => {
        if (
            this.state.text.length < 20 ||
            this.state.category === "none" ||
            this.state.title === "none"
        ) {
            this.setState({ shortSubmit: true });
        } else {
            console.log(this.props.userProfilePicture);
            fetch(process.env.REACT_APP_SERVER + "/postQuestion", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorID: this.state.authorID,
                    author: this.state.author,
                    title: this.state.title,
                    text: this.state.text,
                    code: this.state.code,
                    relativePostID: this.state.relativePostID,
                    language: this.state.language,
                    category: this.state.category,
                    authorProfilePicture: this.props.userProfilePicture,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "success") {
                        this.props.refreshQuestion();
                    }
                });
        }
    };

    render() {
        //content if expanded
        if (this.state.expanded) {
            return (
                <div style={{ margin: "10px auto" }}>
                    <Card
                        sx={{
                            minWidth: 275,
                            pb: 2,
                            margin: "0 auto",
                        }}
                        style={{ margin: "0 auto" }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "baseline",
                                    margin: "0 auto",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundImage:
                                            "url(" +
                                            process.env.REACT_APP_SERVER +
                                            "/public/" +
                                            this.props.userProfilePicture +
                                            ")",
                                        backgroundSize: "cover",
                                        minWidth: "60px",
                                        height: "60px",
                                        border: "1px solid gray",
                                        borderRadius: "50%",
                                    }}
                                ></div>

                                <Typography
                                    sx={{ fontSize: 18 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {this.props.userFirstName}{" "}
                                    {this.props.userLastName}
                                </Typography>
                            </div>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ mb: 2, textAlign: "center" }}
                            >
                                Answer this question
                            </Typography>
                            <div
                                style={{
                                    width: "100%",
                                    margin: "0 auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <textarea
                                    spellcheck="true"
                                    style={{
                                        width: "90%",
                                        minHeight: "200px",
                                        fontSize: "18pt",
                                        padding: "10px",
                                        maxWidth: "90%",
                                    }}
                                    onChange={this.onTextChange}
                                />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        mt: 1,
                                        mb: 2,
                                        textAlign: "left",
                                        marginLeft: "0",
                                    }}
                                >
                                    Add some code to your answer
                                </Typography>
                                <CodeEditor onCodeChange={this.onCodeChange} />
                            </div>
                        </CardContent>
                        {this.state.shortSubmit ? (
                            <div
                                style={{
                                    width: "400px",
                                    margin: "0 auto",
                                    marginBottom: "20px",
                                }}
                            >
                                <h2>
                                    Your question is either missing a title, too
                                    short or no category is selected
                                </h2>
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: "0 20px",
                            }}
                        >
                            <ArrowUpwardIcon
                                style={{
                                    color: "blue",
                                    cursor: "pointer",
                                    alignSelf: "flex-start",
                                }}
                                onClick={this.retractAnswer}
                            />
                            <Button
                                variant="contained"
                                onClick={this.submitAnswer}
                            >
                                Submit answer
                            </Button>
                            <div style={{ width: "30px" }}></div>
                        </div>
                    </Card>
                    <Divider sx={{ marginTop: "10px" }} />
                </div>
            );
        } else {
            //content if retracted
            return (
                <div style={{ margin: "10px 0" }}>
                    <Card sx={{ minWidth: 275, pb: 2 }}>
                        <CardContent>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "baseline",
                                }}
                            >
                                <img
                                    alt=""
                                    src={
                                        process.env.REACT_APP_SERVER +
                                        "/public/" +
                                        this.props.userProfilePicture
                                    }
                                    style={{
                                        border: "1px solid gray",
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <Typography
                                    sx={{ fontSize: 18 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {this.props.userFirstName}{" "}
                                    {this.props.userLastName}
                                </Typography>
                            </div>
                        </CardContent>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                border: "2px solud red",
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{ margin: "0 auto" }}
                                onClick={this.expandAnswer}
                            >
                                Answer this question
                            </Button>
                        </div>
                    </Card>
                    <Divider sx={{ marginTop: "10px" }} />
                </div>
            );
        }
    }
}
