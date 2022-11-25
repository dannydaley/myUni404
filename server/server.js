const express = require('express')
const app = express()
const port = 3001

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./SQLite3.db');

app.locals.db = db;

let userDataJSON = require("./dummy-data/users.json");
let postDataJSON = require("./dummy-data/posts.json");


app.get('/usersSetup', (res) => {
  db.serialize(() => {
    // delete any existing user table
    db.run('DROP TABLE IF EXISTS `users');
    //rebuild the users table
    db.run('CREATE TABLE `users` (userID INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR(255), password VARCHAR(255), passwordSalt VARCHAR(255), aboutMe VARCHAR(255), course VARCHAR(255), year INTEGER, profilePicture VARCHAR(255), asked INTEGER, answered INTEGER');
    let users = userDataJSON;
    users.array.forEach(element => {
      db.run('INSERT INTO `users` (firstName, lastName,email, password, passwordSalt, aboutMe, course, year, profilePicture, asked, answered) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      // pass in values from the json objects
      [user.firstName, user.lastName, user.email, user.password, user.passwordSalt, user.aboutMe, user.course, user.profilePicture, user.asked, user.answered])
      });
    })
  console.log('Users table set up complete')
  res.send('Users table setup complete')
});


app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`)
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})