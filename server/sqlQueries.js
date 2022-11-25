
const USER_SIGN_UP = 'INSERT INTO users (email, firstName, lastName, password, passwordSalt, profilePicture) VALUES (?,?,?,?,?,?)';
const FIND_USER = 'SELECT * FROM users WHERE email = ?';
