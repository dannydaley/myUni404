const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

var path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

//#region IMAGES AND IMAGE UPLOAD HANDLING

// default profile picture applied to all users profilePicture field in the users table of the db on account creation

//set up multer middleware for image uploads
var multer = require("multer");

// set up storage for file uploads
const storage = multer.diskStorage({
    // set destination to public image directory
    destination: "public/images/profilePictures",
    filename: function (req, file, cb) {
        // create a unique suffix so that image names will never have a duplicate
        //suffix consists of the date, a hyphen and then a large random number
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "IMAGE-" + uniqueSuffix + ".png");
        // generate the file name of the file to be added to the public image directory
        // filename contains path to folder to make things easier across the server
        // we append .png top the filename so that files are recognised as their format
        let fileName =
            "images/profilePictures/" + "IMAGE-" + uniqueSuffix + ".png";
        // update the string attached to the incoming req.body.image field
        // this is added to the database as the imageLocation
        req.body.imageLocations += fileName + ",";
    },
});
// set up multer function to be called on uploads
let upload = multer({ storage: storage });

//#endregion IMAGES AND IMAGE UPLOAD HANDLING

// var sqlite3 = require("sqlite3").verbose();
var sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./SQLite3.db");

app.locals.db = db;

let userDataJSON = require("./dummy-data/users.json");
let postDataJSON = require("./dummy-data/posts.json");

// Session setup
var session = require("cookie-session");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var userSession = {
    secret: "myMegaSecret",
    keys: ["key1", "key2", "key3"],
    originalMaxAge: 0,
    maxAge: 0,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 30,
    },
};

app.use(cookieParser());
app.use(session(userSession));

//#region SECURITY
// set up crypto middleware for hashing password and checking password hahses
let crypto = require("crypto");

// number of iterations to jumble the hash
const iterations = 1000;

//set up char length of hash
const hashSize = 64;

// which hashing algorithm will be used
const hashAlgorithm = "sha256";

// create a hash salt/pepper
const generatePepper = crypto.randomBytes(256).toString("hex");

//this function returns a hash of the password, combined with the pepper and the salt.
function passwordHash(thePassword, theSalt) {
    const pepper = process.env.PEPPER;
    return crypto
        .pbkdf2Sync(
            thePassword,
            pepper + theSalt,
            iterations,
            hashSize,
            hashAlgorithm
        )
        .toString("hex");
}

//#endregion SECURITY

//#region SQL QUERIES

const GET_ALL_USERS = "SELECT * FROM users";
const FIND_USER = "SELECT * FROM users WHERE email = ?";
const SIGN_UP_USER =
    "INSERT INTO users (firstName,lastName, email, password, passwordSalt, aboutMe, course, year, profilePicture, asked, answered) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const GET_ALL_POSTS = "SELECT * FROM POSTS ORDER BY postID DESC";
const GET_QUESTION_FEED =
    "SELECT * FROM POSTS WHERE (title != ?) AND (category = ?) ORDER BY postID DESC";
const GET_QUESTION_REPLIES =
    "SELECT * FROM POSTS WHERE relativePostID = ? ORDER BY score DESC";
const POST_QUESTION =
    "INSERT INTO posts (authorID, author, relativePostID, date, title, text, code, language, category, authorProfilePicture, score) VALUES (?, ?, ?, date(), ?, ?, ?, ?, ?, ?, ?)";

const UPDATE_USER_ABOUT_ME = "UPDATE users SET aboutMe = ? WHERE userID= ?";
//#endregion SQL QUERIES

//#region DATABASE SETUP ENDPOINTS

app.get("/usersSetup", (req, res) => {
    db.serialize(() => {
        // delete any existing user table
        db.run("DROP TABLE IF EXISTS `users`"),
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            };
        //rebuild the users table
        db.run(
            "CREATE TABLE `users` (userID INTEGER PRIMARY KEY AUTOINCREMENT, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(255), aboutMe varchar(255), course varchar(255), year INTEGER, profilePicture varchar(255), asked INTEGER, answered INTEGER)",
            // , firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(255), aboutMe varchar(255), course varchar(255), year INTEGER, profilePicture varchar(255), asked INTEGER, answered INTEGER'
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            }
        );
        let users = userDataJSON.entries;
        users.forEach((user) => {
            db.run(
                "INSERT INTO users (firstName, lastName, email, password, passwordSalt, aboutMe, course, year, profilePicture, asked, answered) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                // pass in values from the json objects
                [
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.password,
                    user.passwordSalt,
                    user.aboutMe,
                    user.course,
                    user.year,
                    user.profilePicture,
                    user.asked,
                    user.answered,
                ],
                // , user.lastName, user.email, user.password, user.passwordSalt, user.aboutMe, user.course, user.year, user.profilePicture, user.asked, user.answered],
                (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                }
            );
        });
    });
    console.log("Users table set up complete");
    res.send("Users table setup complete");
});

app.get("/postsSetup", (req, res) => {
    db.serialize(() => {
        // delete any existing user table
        db.run("DROP TABLE IF EXISTS `posts`"),
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            };
        //rebuild the users table
        db.run(
            "CREATE TABLE `posts` (postID INTEGER PRIMARY KEY AUTOINCREMENT, author varchar(255), authorID INTEGER, authorProfilePicture VARCHAR(255), date varchar(255), category varchar(255), score INTEGER, relativePostID INTEGER, title varchar(255), text TEXT, code TEXT, language varchar(255))",
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            }
        );
        let posts = postDataJSON.entries;
        posts.forEach((post) => {
            db.run(
                "INSERT INTO posts (author, authorID, authorProfilePicture, date, category, score, relativePostID, title, text, code, language) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                // pass in values from the json objects
                [
                    post.author,
                    post.authorID,
                    post.authorProfilePicture,
                    post.date,
                    post.category,
                    post.score,
                    post.relativePostID,
                    post.title,
                    post.text,
                    post.code,
                    post.language,
                ],
                (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                }
            );
        });
    });
    console.log("posts table set up complete");
    res.send("Posts table setup complete");
});
// get all users
app.get("/getAllUsers", (req, res, next) => {
    // grab all user data
    db.all(GET_ALL_USERS, [], (err, userData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with userData on success
        res.send(userData);
    });
});
// get all users
app.get("/getAllPosts", (req, res, next) => {
    // grab all user data
    db.all(GET_ALL_POSTS, [], (err, postData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with userData on success
        res.send(postData);
    });
});

//#endregion DATABASE SETUP ENDPOINTS

app.post("/getQuestionFeed", (req, res, next) => {
    // grab all user data
    //dont include 'reply' as title to not pull replies
    let dontInclude = "reply";
    let category = req.body.feed;
    db.all(GET_QUESTION_FEED, [dontInclude, category], (err, postData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with userData on success
        res.json(postData);
    });
});

app.post("/getQuestionReplies", (req, res, next) => {
    // grab all user data

    let relativePostID = req.body.postID;
    db.all(GET_QUESTION_REPLIES, relativePostID, (err, postData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with userData on success
        res.json(postData);
    });
});

app.post("/getSession", (req, res) => {});

app.post("/signUp", (req, res) => {
    //set up variables from the request for better readability
    let {
        signUpEmail,
        signUpFirstName,
        signUpLastName,
        signUpPassword,
        confirmSignUpPassword,
    } = req.body;
    //if both password fields match
    if (signUpPassword === confirmSignUpPassword) {
        //generate salt to store
        let passwordSalt = generatePepper;
        //generate password to store, using password from the confirm field, and the generated salt
        let storePassword = passwordHash(confirmSignUpPassword, passwordSalt);
        //assign default profile picture
        let profilePicture = "UPDATE THIS WITH PROFILE PICTURE LOCATION";
        //assign other values
        let aboutMe = "I haven't added an about me yet!";
        let course = "I haven't added my course yet!";
        let year = "I haven't added my year yet!";
        let asked = 0;
        let answered = 0;
        //Create a new user in the user database with the fields from the form, the default profile picture and the generated password hash and salt
        db.run(
            SIGN_UP_USER,
            [
                signUpFirstName,
                signUpLastName,
                signUpEmail,
                storePassword,
                passwordSalt,
                aboutMe,
                course,
                year,
                profilePicture,
                asked,
                answered,
            ],
            (err, rows) => {
                if (err) {
                    console.log("failed to add user to database");
                    console.log(err.message);
                    // if email already exists in database
                    if (
                        err.message ===
                        "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email"
                    ) {
                        console.log("EMAIL ALREADY EXISTS");
                        res.json("duplicate email");
                        return;
                    }
                    // if any other error case, respond with status and error message
                    res.status(500).send(err.message);
                    return;
                }
                //respond with success
                res.json("sign up success");
            }
        );
        //response if password fields dont match
    } else {
        res.json("PASSWORDS DONT MATCH");
    }
});

app.post("/signin", (req, res) => {
    // pull data from request body for better readbility
    let { email, password } = req.body;
    // search if user exists using email address
    db.get(FIND_USER, email, (err, userData) => {
        if (err) {
            console.log("error at database");
            res.status(500).send(err);
        }
        //assign any returned rows to user variable
        let user = userData;
        //if a user exists, and their stored password matches the output of the hashing function
        // with their password entry..
        if (
            user !== undefined &&
            user.password === passwordHash(password, user.passwordSalt)
        ) {
            // create empty session data to be populated
            req.session.userData = {};
            // apply user data to session variables
            req.session.userData.userID = user.userID;
            req.session.userData.isSignedIn = true;
            req.session.userData.userFirstName = user.firstName;
            req.session.userData.userLastName = user.lastName;
            req.session.userData.userProfilePicture = user.profilePicture;
            req.session.userData.email = user.email;
            //respond with user data on succesful login
            res.json({
                status: "success",
                userID: req.session.userData.userID,
                isSignedIn: req.session.userData.isSignedIn,
                firstName: req.session.userData.userFirstName,
                lastName: req.session.userData.userLastName,
                profilePicture: req.session.userData.userProfilePicture,
                email: req.session.userData.email,
            });
            // otherwise, credentials are invalid
        } else {
            //respond with failure message
            res.json({
                status: "failed",
                message: "incorrect email or password",
            });
        }
    });
});

app.post("/postQuestion", (req, res) => {
    let postData = req.body;
    if (postData.relativePostID === 0) {
        db.run(
            "UPDATE `users` SET asked = asked + 1 WHERE userID = ?",
            postData.authorID,
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            }
        );
    } else {
        db.run(
            "UPDATE `users` SET `answered` = `answered`+ 1 WHERE `userID` = ?",
            postData.authorID,
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            }
        );
    }
    db.run(
        POST_QUESTION,
        [
            postData.authorID,
            postData.author,
            postData.relativePostID,
            postData.title,
            postData.text,
            postData.code,
            postData.language,
            postData.category,
            postData.authorProfilePicture,
            0,
        ],
        (err, rows) => {
            if (err) {
                console.log("failed to add post to database");
                console.log(err.message);
                res.status(500).send(err.message);
                return;
            }
            //respond with success
            res.json({
                status: "success",
            });
        }
    );
});

app.post("/getProfile", (req, res) => {
    profileID = req.body.userID;
    db.all(
        "SELECT firstName,lastName, aboutMe, course, year, profilePicture, asked, answered FROM `users` WHERE userID = ?",
        profileID,
        (err, rows) => {
            if (err) {
                console.log("Error at dabase");
                console.log(err.message);
                res.status(500).send(err.message);
                return;
            }
            //respond with success
            res.json({
                status: "success",
                userData: rows[0],
            });
        }
    );
});

app.post("/changeProfilePicture", upload.single("image"), (req, res) => {
    /*ALREADY RUN THROUGH MULTER*/
    //remove undefined from filename after being processed by multer
    req.body.imageLocations = req.body.imageLocations.replace("undefined", "");
    //remove any commas from filename after being processed by multer
    let image = req.body.imageLocations.replace(",", "");
    // update the profilePicture attached to the user where username matches the logged in users from the request
    db.run(
        "UPDATE users SET profilePicture = ? WHERE userID = ?",
        [image, req.body.userID],
        (err, result) => {
            // if error
            if (err) {
                // respond with error status and error message
                res.status(500).send(err.message);
                return;
            }
            // grab users first name and lastname from database by username from request
            db.all(
                "SELECT users.firstName, users.lastName FROM users WHERE userID = ? LIMIT 1",
                req.body.userID,
                (err, rows) => {
                    // if error
                    if (err) {
                        // respond with error status and error message
                        res.status(500).send(err.message);
                        return;
                    }
                }
            );
            db.all(
                "UPDATE posts SET authorProfilePicture = ? WHERE authorID = ?",
                [image, req.body.userID],
                (err, rows) => {
                    // if error
                    if (err) {
                        // respond with error status and error message
                        res.status(500).send(err.message);
                        return;
                    }
                }
            );
        }
    );
    res.json({
        profilePicture: image,
    });
});

app.post("/updateAboutMe", (req, res) => {
    //pull variables from request body for better readability
    const { aboutMe, userID } = req.body;
    //update users general information in database
    db.run(UPDATE_USER_ABOUT_ME, [aboutMe, userID], (err) => {
        if (err) {
            //error response
            res.json("ERROR AT DATABASE");
        }
        //success response
        res.json("success at database");
    });
});

app.post("/vote", (req, res) => {
    let vote = req.body.vote;
    let postID = req.body.postID;
    if (vote === "up") {
        db.run(
            "UPDATE `posts` SET score = score + 1 WHERE postID = ?",
            postID,
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            }
        );
    } else {
        db.run(
            "UPDATE `posts` SET score = score - 1 WHERE postID = ?",
            postID,
            (err) => {
                if (err) {
                    console.log(err.message);
                }
            }
        );
    } //respond with success
    res.json({
        status: "success",
    });
});

app.post("/getUserQuestionFeed", (req, res) => {
    let userID = req.body.userID;
    db.all(
        "SELECT * FROM `posts` WHERE `authorID` = ?",
        userID,
        (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            res.json({
                status: "success",
                postData: rows,
            });
        }
    );
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
