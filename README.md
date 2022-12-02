# myUni404

myUni404 is a tool for universities with computing programs. The intent is for students and ambitious programmers to have a platform in which they can ask questions in a beginner friendly environment, and improve their knowledge and bug fixing skills by answering questions for others. The platform has a built in code syntax highlighter which formats entered code making it not only visually pleasing, but easier to identify issues too.

## Features

-   View question feed
-   Search for question and get relevant hits
-   View questions and answers
-   write questions
-   Write answers
-   Vote answers up or down
-   Answeres with higher votes are listed above those with less
-   Multiple categorys/feeds of questions by field
-   User profiles
-   view users asked questions
-   view users answers
-   asked/answered count
-   Profile picture and about me updates

## FRONT END

The front end is built in React, with some stylings coming from the material-ui library. The colour scheme is inspired by the Falmouth University Learning Space to support my social media platform build which **myUni404** will be integrated into as a feature.

#### INSTALLED DEPENDENCIES

-   "axios": "^1.2.0"
-   "dotenv": "^16.0.3"
-   "localforage": "^1.10.0"
-   "match-sorter": "^6.3.1"
-   "react": "^18.2.0"
-   "react-dom": "^18.2.0"
-   "react-router-dom": "^6.4.3"
-   "react-syntax-highlighter": "^15.5.0"
-   "styled-components": "^5.3.6"

## BACK END

The back end is an express js server. **Two different server files exist**, one is intended for deployment with a mySQL server while the other for use with SQLite3. Both server files have the same functionality just with slightly different syntax for SQL queries, namely SQLites' db.run(), db.get(), db.all() and db.serialize are all covered by db.query in mySQL. AUTOINCREMENT also becomes AUTO_INCREMENT in mySQL server.
Image uploads for profile pictures are handled by Multer, images are loaded into /public/images/profilePictures from the server root directory.

#### INSTALLED DEPENDENCIES

-   "body-parser": "^1.20.1",
-   "cookie-parser": "^1.4.6",
-   "cookie-session": "^2.0.0",
-   "cors": "^2.8.5",
-   "crypto": "^1.0.1",
-   "dotenv": "^16.0.3",
-   "express": "^4.18.2",
-   "multer": "^1.4.5-lts.1",
-   "mysql": "^2.18.1",
-   "sqlite3": "^5.1.2"

## DATABASE

My preferred choice for a storage solution was an SQL database. As the SQL database allows for multiple tables within a single space
and holds data continuously between server restarts, so it felt like a good fit for the main storage solution for my platform.
The added benefit of being able to use the tables relationally was another great plus and is functionality that is used throughout

The deployment is set up for use with mySQL server but has a backup SQLite database. All mySQL server settings can be found in the .env or docker-compose file.

SQLite3 database set up in server.js under the variable **db**, when functionality is switched to SQLite by renaming the main mySQL version of server.js to serverMySQL.js, and serverLite.js to server.js.

#### **FILE: "SQLite3.db"**

### **DATABASE TABLE SETUP**

table setup is performed from the endpoints:

#### **users table** - /usersSetup

#### **posts table** - /postsSetup

These endpoints delete the existing tables and reprovision a new set with the following fields. Dummy data is inserted into the rows to aid development and reduce the amount of times I have to create an account to test functionality. **These dummy-data files can be found in the dummy-data directory in the server root.**

---

### **TABLE STRUCTURE**

The following is a description of each table, the data types for each row, along with any special identifiers such as **primary keys** or **auto incrementors**, followed by a visual example of the table.

### TABLE: users

#### **FIELDS & DATA TYPES:**

##### |`userID` INTEGER, PRIMARY KEY, AUTOINCREMENTS|

##### |`firstName` VARCHAR(255)|

##### |`lastName` VARCHAR(255)|

##### |`email` VARCHAR(255), UNIQUE|

##### |`password` VARCHAR(255)|

##### |`passwordSalt` VARCHAR(512)|

##### |`aboutMe` VARCHAR(255)|

##### |`profilePicture` VARCHAR(255)|

##### |`course` VARCHAR(255)|

##### |`year` INT|

##### |`asked` INT|

##### |`answered` INT|

| userID | firstName    | lastName     | password     | passwordSalt     | aboutMe                   | profilePicture  | course       | year | asked | answered |
| ------ | ------------ | ------------ | ------------ | ---------------- | ------------------------- | --------------- | ------------ | ---- | ----- | -------- |
| INT    | VARCHAR(255) | VARCHAR(255) | VARCHAR(255) | VARCHAR(512)     | VARCHAR(255)              | VARCHAR(255)    | VARCHAR(255) | INT  | INT   | INT      |
| 1      | Danny        | Daley        | myPassword   | mYhAsHeDpAsSwOrD | This is my about me text! | Web Development | 3            | 1    | 4     | 2        |

---

#### TABLE: posts

**FIELDS & DATA TYPES:**

##### |`postID` INTEGER, PRIMARY KEY, AUTOINCREMENTS|

##### |`author` VARCHAR(255)|

##### |`authorID` INT|

##### |`date` VARCHAR(255)|

##### | `category` VARCHAR(255)|

##### | `title` VARCHAR(255)|

##### |`text` TEXT|

##### |`code` TEXT|

##### |`language` VARCHAR(255)|

##### |`relativePostID` INT|

##### |`score` INT|

| postID | author       | authorID | authorProfilePicture              | date         | category     | title                   | text              | code                | language     | score |
| ------ | ------------ | -------- | --------------------------------- | ------------ | ------------ | ----------------------- | ----------------- | ------------------- | ------------ | ----- |
| INT    | VARCHAR(255) | INT      | VARCHAR(255)                      | VARCHAR(255) | VARCHAR(255) | VARCHAR(255)            | TEXT              | TEXT                | VARCHAR(255) | INT   |
| 10     | Danny Daley  | 1        | "images/profilePictures/8197.png" | "2022-12-01" | Web          | "Cant center this div!" | "How do I Cen..." | <div margin:center> | HTML         | 3     |

#### **_When items are added to the 'date' column, the Date() built in function is called to properly acheive date formatting_**

## TESTING THE PROJECT

Jest is a JavaScript test runner that lets you access the DOM via jsdom. While jsdom is only an approximation of how the browser works, it is usually good enough for testing React components. Jest provides a great iteration speed combined with powerful features like mocking modules and timers so you can have more control over how the code executes

## RUNNING THE PROJECT

Opening a terminal in myUni404/client/myUni404 and running ..
`npm start`
will start the react development server.

Opening a terminal in myUni404/server and running ..
`npm start`
will run the express server, or alternatively..
``npm run dev`
to start the server in development mode.

To run the project at deployment, I prefer to log in to the Ubuntu droplet via ssh.

I like to run my projects from the /srv directory..
`cd /srv/myUni404/server`

run docker-compose build, and start the docker image...
`docker-compose build && docker-compose up`

or alternatively, run the command and start a daemonised image to run in the background..
`docker-compose build && docker-compose up -d`
