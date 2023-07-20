const { MongoClient } = require("mongodb");
require("dotenv").config();
let _db;

async function connectDb() {
  const connectionString = process.env.DB_CONNECTION_STRING;

  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    _db = client.db();
    console.log("Connect to MongoDb");
  } catch (error) {
    console.log("Error connecting to mongodb ");
    console.log(error.message);
  }
}

function getDb() {
  if (!_db) {
    console.log("Database not connect");
  }
  return _db;
}
module.exports = { connectDb, getDb };
