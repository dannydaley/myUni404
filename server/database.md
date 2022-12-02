# SQL DATABASE

My preferred choice for a storage solution. As the SQL database allows for multiple tables within a single space
and holds data continuously between server restarts, so it felt like a good fit for the main storage solution for my platform.
The added benefit of being able to use the tables relationally was another great plus and is functionality that is used throughout

SQLite3 database set up in server.js under the variable **SQLdatabase**, table setup is performed from the endpoints:

### **users table** - /usersSetup

### **posts table** - /postsSetup

### **FILE: "SQLite3.db"**

---

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

| userID | firstName | lastName | password   | passwordSalt     | aboutMe                   | profilePicture  | course | year | asked | answered |
| ------ | --------- | -------- | ---------- | ---------------- | ------------------------- | --------------- | ------ | ---- | ----- | -------- |
| 1      | Danny     | Daley    | myPassword | mYhAsHeDpAsSwOrD | This is my about me text! | Web Development | 3      | 1    | 4     |

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

---
