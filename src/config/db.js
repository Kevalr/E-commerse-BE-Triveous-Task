const { Pool, PoolClient } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER || "daazlhii",
  password: process.env.DB_PASSWORD || "Z1f2kAUwE3_4sF3cMtm7dUS8IEbtr9o1",
  host: process.env.DB_HOST || "rain.db.elephantsql.com",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "daazlhii",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 3000,
});

const execQuery = async (queryText, queryParams = []) => {
    let client;
    client = await pool.connect();
    try {
      const result = await pool.query(queryText, queryParams);
      return result;
    } catch (error) {
      return {success:false, qry_error: true, message: error.message};
    } finally {
      client.release();
    }
  };

pool.on("error", (err) => {
  console.log("error ", err);
  process.exit(-1);
});

module.exports = execQuery;