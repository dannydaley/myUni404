import * as React from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CodeBlock from "../CodeBlock";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function Answer(props) {
    return (
        <div style={{ marginBottom: "10px" }}>
            <Box sx={{ minWidth: 275 }}>
                <CardContent>
                    <div
                        // src={"http://localhost:3001/public/" + props.posterProfilerPicture}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                        }}
                    >
                        <img
                        alt=""
                        src={"http://localhost:3001/public/" + props.authorProfilePicture}
                            style={{
                                border: "1px solid gray",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                            }}
                            onClick={() => props.viewProfile(props.authorID)}
                        />
                        <Typography
                            sx={{ fontSize: 18 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {props.author}
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            variant="body2"
                            sx={{ textAlign: "left", marginTop: "30px" }}
                        >
                            {props.text}
                            <CodeBlock
                                codeString={props.code}
                                language={props.language}
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
                        />
                        <Typography color="text.secondary">
                            {props.score}
                        </Typography>
                        <ArrowDownwardIcon
                            sx={{
                                color: "gray",
                                cursor: "pointer",
                                ":hover": { color: "red" },
                            }}
                        />
                    </div>
                </CardActions>
            </Box>
        </div>
    );
}
