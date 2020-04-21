const dotenv = require('dotenv').config();
const { Pool } = require('pg');

console.log(process.env.NODE_ENV);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  pool.query("CREATE TABLE product ( product_id SERIAL PRIMARY KEY, product_name VARCHAR(255), product_no VARCHAR(50), product_image TEXT, product_desc VARCHAR(255), product_price VARCHAR(50), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP);", function (err, result) {
      if (err) throw err;
      console.log("Table created");
  });
});