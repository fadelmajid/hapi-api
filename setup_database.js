const dotenv = require('dotenv').config();
const { Pool } = require('pg');

console.log(process.env.NODE_ENV);
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "a455328fm"
});

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  pool.query("CREATE DATABASE projecthapi", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});