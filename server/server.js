const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'build')));

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./SQLite3.db');

app.locals.db = db;

let userDataJSON = require("./dummy-data/users.json");
let postDataJSON = require("./dummy-data/posts.json");


// Session setup
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var userSession = {
  secret: "myMegaSecret",
  keys: ['key1', 'key2', 'key3'],
  originalMaxAge: 0,
  maxAge:0,
  resave: true,
  saveUninitialized: true,  
  cookie: {
    httpOnly: true,    
    secure: false,
    maxAge: 30  
  }
};


app.use(cookieParser());
app.use(session(userSession));


//#region SECURITY
// set up crypto middleware for hashing password and checking password hahses
let crypto = require('crypto');

// number of iterations to jumble the hash
const iterations = 1000;

//set up char length of hash
const hashSize = 64;

// which hashing algorithm will be used
const hashAlgorithm = 'sha256';

// create a hash salt/pepper
const generatePepper = crypto.randomBytes(256).toString('hex');

//this function returns a hash of the password, combined with the pepper and the salt.
function passwordHash(thePassword, theSalt) {  
  const pepper = process.env.PEPPER;
   return crypto.pbkdf2Sync(thePassword, pepper + theSalt, iterations, hashSize, hashAlgorithm).toString('hex');
}

//#endregion SECURITY


app.get('/usersSetup', (req, res) => {
  db.serialize(() => {
    // delete any existing user table
    db.run('DROP TABLE IF EXISTS `users`'), (err) => {
      if (err) {
        console.log(err.message);
      }
    };
    //rebuild the users table
    db.run('CREATE TABLE `users` (userID INTEGER PRIMARY KEY AUTOINCREMENT, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(255), aboutMe varchar(255), course varchar(255), year INTEGER, profilePicture varchar(255), asked INTEGER, answered INTEGER)',
      // , firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(255), aboutMe varchar(255), course varchar(255), year INTEGER, profilePicture varchar(255), asked INTEGER, answered INTEGER'
      (err) => {
      if (err) {
        console.log(err.message)
      }
    });
    let users = userDataJSON.entries;
    users.forEach(user => {
      db.run('INSERT INTO users (firstName, lastName, email, password, passwordSalt, aboutMe, course, year, profilePicture, asked, answered) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      // pass in values from the json objects
      [user.firstName, user.lastName, user.email, user.password, user.passwordSalt, user.aboutMe, user.course, user.year, user.profilePicture, user.asked, user.answered],
        // , user.lastName, user.email, user.password, user.passwordSalt, user.aboutMe, user.course, user.year, user.profilePicture, user.asked, user.answered],
         (err) => {
        if (err) {
          console.log(err.message)
        }
      })
      });
    })
  console.log('Users table set up complete')
  res.send('Users table setup complete')
});

const GET_ALL_USERS = "SELECT * FROM users";
const FIND_USER = "SELECT * FROM users WHERE email = ?";
const SIGN_UP_USER = "INSERT INTO users (firstName,lastName, email, password, passwordSalt, aboutMe, course, year, profilePicture, asked, answered) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// get all users
app.get('/getAllUsers', (req, res, next) => {
  // grab all user data
  db.all(GET_ALL_USERS, [], (err, userData) => {
    // if error
    if (err) {
      // respond with error status and error message
      res.status(500).send(err.message);
      return;
    };
    // respond with userData on success
    res.send(userData);
  });
});

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`)
})





app.post('/signUp', (req, res) => {  
  //set up variables from the request for better readability
  let { signUpEmail, signUpFirstName, signUpLastName, signUpPassword, confirmSignUpPassword } = req.body;
  //if both password fields match
  if (signUpPassword === confirmSignUpPassword) {
    //generate salt to store
    let passwordSalt = generatePepper;
    //generate password to store, using password from the confirm field, and the generated salt
    let storePassword = passwordHash(confirmSignUpPassword, passwordSalt);
    //assign default profile picture
    let profilePicture = 'UPDATE THIS WITH PROFILE PICTURE LOCATION';
    //assign other values
    let aboutMe = "I haven't added an about me yet!";
    let course = "I haven't added my course yet!"
    let year = "I haven't added my year yet!";
    let asked = 0;
    let answered = 0;
    //Create a new user in the user database with the fields from the form, the default profile picture and the generated password hash and salt
    db.run(SIGN_UP_USER, [ signUpFirstName, signUpLastName, signUpEmail, storePassword, passwordSalt, aboutMe, course, year, profilePicture, asked, answered  ], (err, rows) => {
      if (err) {
        console.log("failed to add user to database")
        console.log(err.message)
        // if email already exists in database
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
          console.log("EMAIL ALREADY EXISTS");
          res.json("duplicate email");
          return;
        };
        // if any other error case, respond with status and error message
        res.status(500).send(err.message);
        return;
      };
      //respond with success 
      res.json('sign up success');   
    });
  //response if password fields dont match    
  } else {    
    res.json("PASSWORDS DONT MATCH");
  };
});

app.post('/signin', (req, res) => {  
  // pull data from request body for better readbility
  let { email, password } = req.body;
  // search if user exists using email address
  db.get(FIND_USER, email, (err, userData) => {
    if (err) {
      console.log("error at database");
      res.status(500).send(err)
    }
    //assign any returned rows to user variable
    let user = userData  
    //if a user exists, and their stored password matches the output of the hashing function
    // with their password entry..  
    if (user!== undefined && user.password === passwordHash(password, user.passwordSalt)) {
      // create empty session data to be populated
      req.session.userData = {};
      // apply user data to session variables
      req.session.userData.isSignedIn = true;
      req.session.userData.userFirstName = user.firstName;
      req.session.userData.userLastName =  user.lastName;
      req.session.userData.loggedInUsername = user.username;
      req.session.userData.userProfilePicture = user.profilePicture;
      //respond with user data on succesful login
      res.json({
        status: 'success',
        isSignedIn: req.session.userData.isSignedIn,
        firstName: req.session.userData.userFirstName,
        lastName: req.session.userData.userLastName,
        username: req.session.userData.loggedInUsername,
        profilePicture: req.session.userData.userProfilePicture
      });
    // otherwise, credentials are invalid
    } else {
      //respond with failure message
      res.json({
      status: 'failed',
      message: 'incorrect email or password'
      });
    };  
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})