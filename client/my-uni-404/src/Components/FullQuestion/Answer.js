import * as React from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CodeBlock from "../CodeBlock";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { renderMatches } from "react-router-dom";

export default class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.score,
            votingOpen: true,
        };
    }

    votePost = async (vote) => {
        if (this.state.votingOpen) {
            // this.setState({ settings: newSettings })
            //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
            fetch(process.env.REACT_APP_SERVER + "/vote", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postID: this.props.postID,
                    vote: vote,
                }),
            })
                //TURN THE RESPONSE INTO A JSON OBJECT
                .then((response) => response.json())
                // .then(await this.delayFunction())
                // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
                .then((data) => {
                    vote === "up"
                        ? this.setState({
                              score: (this.state.score += 1),
                              votingOpen: false,
                          })
                        : this.setState({
                              score: (this.state.score -= 1),
                              votingOpen: false,
                          });
                });
        } else {
            return;
        }
    };
    render() {
        return (
            <div style={{ marginBottom: "10px" }}>
                <Box sx={{ minWidth: 275 }}>
                    <CardContent>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "baseline",
                            }}
                        >
                            {/* <img
                                alt=""
                                src={
                                    process.env.REACT_APP_SERVER +
                                    "/public/" +
                                    this.props.authorProfilePicture
                                }
                                style={{
                                    border: "1px solid gray",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                }}
                                onClick={() =>
                                    
                                }
                            /> */}
                            <div
                                style={{
                                    backgroundImage:
                                        "url(" +
                                        process.env.REACT_APP_SERVER +
                                        "/public/" +
                                        this.props.authorProfilePicture +
                                        ")",
                                    backgroundSize: "cover",
                                    minWidth: "60px",
                                    height: "60px",
                                    border: "1px solid gray",
                                    borderRadius: "50%",
                                }}
                                onClick={() =>
                                    this.props.viewProfile(this.props.authorID)
                                }
                            ></div>
                            <Typography
                                sx={{ fontSize: 18 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {this.props.author}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "left", marginTop: "30px" }}
                            >
                                {this.props.text}
                                <CodeBlock
                                    codeString={this.props.code}
                                    language={this.props.language}
                                />
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div
                            style={{
                                marginLeft: "auto",
                                display: "flex",
                                flexDirection: "row",
                                verticalAlign: "center",
                            }}
                        >
                            <ArrowUpwardIcon
                                sx={{
                                    color: "gray",
                                    cursor: "pointer",
                                    ":hover": { color: "lightGreen" },
                                }}
                                onClick={() => this.votePost("up")}
                            />
                            <Typography color="text.secondary">
                                {this.state.score}
                            </Typography>
                            <ArrowDownwardIcon
                                sx={{
                                    color: "gray",
                                    cursor: "pointer",
                                    ":hover": { color: "red" },
                                }}
                                onClick={() => this.votePost("down")}
                            />
                        </div>
                    </CardActions>
                </Box>
            </div>
        );
    }
}
