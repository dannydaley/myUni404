import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

export default class Question extends React.Component {
    goToQuestion = (
        authorProfilePicture,
        title,
        author,
        question,
        code,
        postID,
        language,
        authorID
    ) => {
        this.props.readyQuestion(
            authorProfilePicture,
            title,
            author,
            question,
            code,
            postID,
            language,
            authorID
        );
        this.props.changeRoute("question");
    };
    render() {
        return (
            <div style={{ marginBottom: "10px" }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "top",
                            }}
                        >
                            <div
                                style={{
                                    backgroundImage:
                                        "url(" +
                                        process.env.REACT_APP_SERVER +
                                        "/public/" +
                                        this.props.authorProfilePicture +
                                        ")",
                                    backgroundSize: "cover",
                                    minWidth: "50px",
                                    height: "50px",
                                    marginBottom: "50px",
                                    border: "1px solid gray",
                                    borderRadius: "50%",
                                }}
                                onClick={() =>
                                    this.props.viewProfile(this.props.authorID)
                                }
                            ></div>

                            <Typography
                                sx={{
                                    fontSize: 15,
                                    textAlign: "center",
                                    marginLeft: "7px",
                                }}
                                color="text.secondary"
                            >
                                {this.props.poster}
                            </Typography>
                        </div>
                        <div style={{ width: "80%", marginLeft: "auto" }}>
                            <Typography
                                variant="h5"
                                style={{ textAlign: "left" }}
                                component="div"
                                onClick={() =>
                                    this.goToQuestion(
                                        this.props.authorProfilePicture,
                                        this.props.title,
                                        this.props.poster,
                                        this.props.question,
                                        this.props.code,
                                        this.props.postID,
                                        this.props.language,
                                        this.props.authorID
                                    )
                                }
                            >
                                {this.props.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "left" }}
                            >
                                {this.props.question}
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() =>
                                this.goToQuestion(
                                    this.props.authorProfilePicture,
                                    this.props.title,
                                    this.props.poster,
                                    this.props.question,
                                    this.props.code,
                                    this.props.postID,
                                    this.props.language,
                                    this.props.authorID
                                )
                            }
                        >
                            Read More
                        </Button>
                        <div
                            style={{
                                marginLeft: "auto",
                                display: "flex",
                                flexDirection: "row",
                                verticalAlign: "center",
                            }}
                        ></div>
                        <ReplyIcon sx={{ color: "gray", paddingLeft: "5px" }} />
                        <Typography
                            color="text.secondary"
                            sx={{ paddingRight: "15px" }}
                        >
                            {this.props.replies}
                        </Typography>
                    </CardActions>
                </Card>
                <Divider sx={{ marginTop: "10px" }} />
            </div>
        );
    }
}
