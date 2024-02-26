const execQuery = require("../config/db");

const getUserByEmail = async (email) => {
    const queryText = "SELECT id, name, email, password FROM users WHERE email = $1";
    const queryParams = [email];
    return await execQuery(queryText, queryParams);
} 

const createUser = async({name,email,password }) => {
    const queryText = "INSERT INTO users(name, email, password) VALUES ($1,$2,$3)";
    const queryParams = [name, email, password];
    return await execQuery(queryText, queryParams);
}

module.exports = { createUser, getUserByEmail };
