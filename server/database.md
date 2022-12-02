# DATABASE

My preferred choice for a storage solution. As the SQL database allows for multiple tables within a single space
and holds data continuously between server restarts, so it felt like a good fit for the main storage solution for my platform.
The added benefit of being able to use the tables relationally was another great plus and is functionality that is used throughout

The deployment is set up for use with mySQL server but has a backup SQLite database. All mySQL server settings can be found in the .env or docker-compose file.

SQLite3 database set up in server.js under the variable **db**, when functionality is switched to SQLite by renaming the main mySQL version of server.js to serverMySQL.js, and serverLite.js to server.js.

### **FILE: "SQLite3.db"**

## **DATABASE TABLE SETUP**

table setup is performed from the endpoints:

### **users table** - /usersSetup

### **posts table** - /postsSetup

These endpoints delete the existing tables and reprovision a new set with the following fields. Dummy data is inserted into the rows to aid development and reduce the amount of times I have to create an account to test functionality.

---

## **TABLE STRUCTURE**

The following is a description of each table, the data types for each row, along with any special identifiers such as **primary keys** or **auto incrementors**, followed by a visual example of the table.

## TABLE: users

### **FIELDS & DATA TYPES:**

#### |`userID` INTEGER, PRIMARY KEY, AUTOINCREMENTS|

#### |`firstName` VARCHAR(255)|

#### |`lastName` VARCHAR(255)|

#### |`email` VARCHAR(255), UNIQUE|

#### |`password` VARCHAR(255)|

#### |`passwordSalt` VARCHAR(512)|

#### |`aboutMe` VARCHAR(255)|

#### |`profilePicture` VARCHAR(255)|

#### |`course` VARCHAR(255)|

#### |`year` INT|

#### |`asked` INT|

#### |`answered` INT|

| userID | firstName    | lastName     | password     | passwordSalt     | aboutMe                   | profilePicture  | course       | year | asked | answered |
| ------ | ------------ | ------------ | ------------ | ---------------- | ------------------------- | --------------- | ------------ | ---- | ----- | -------- |
| INT    | VARCHAR(255) | VARCHAR(255) | VARCHAR(255) | VARCHAR(512)     | VARCHAR(255)              | VARCHAR(255)    | VARCHAR(255) | INT  | INT   | INT      |
| 1      | Danny        | Daley        | myPassword   | mYhAsHeDpAsSwOrD | This is my about me text! | Web Development | 3            | 1    | 4     | 2        |

---

### TABLE: posts

**FIELDS & DATA TYPES:**

#### |`postID` INTEGER, PRIMARY KEY, AUTOINCREMENTS|

#### |`author` VARCHAR(255)|

#### |`authorID` INT|

#### |`date` VARCHAR(255)|

#### | `category` VARCHAR(255)|

#### | `title` VARCHAR(255)|

#### |`text` TEXT|

#### |`code` TEXT|

#### |`language` VARCHAR(255)|

#### |`relativePostID` INT|

#### |`score` INT|

| postID | author       | authorID | authorProfilePicture              | date         | category     | title                   | text              | code                | language     | score |
| ------ | ------------ | -------- | --------------------------------- | ------------ | ------------ | ----------------------- | ----------------- | ------------------- | ------------ | ----- |
| INT    | VARCHAR(255) | INT      | VARCHAR(255)                      | VARCHAR(255) | VARCHAR(255) | VARCHAR(255)            | TEXT              | TEXT                | VARCHAR(255) | INT   |
| 10     | Danny Daley  | 1        | "images/profilePictures/8197.png" | "2022-12-01" | Web          | "Cant center this div!" | "How do I Cen..." | <div margin:center> | HTML         | 3     |

## **_When items are added to the 'date' column, the Date() built in function is called to properly acheive date formatting_**
