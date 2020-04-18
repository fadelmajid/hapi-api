"use strict";

const dotenv = require('dotenv')
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:a455328fm@localhost:5432/hapidb'
});

class Database {
    async query (params) {
        try {
            const sql = params.sql;
            const values = params.values;
            
            const res = await pool.query(sql, values)
            return res.rows[0];   
        } catch (error) {
            throw error
        }
    }
}

module.exports = Database;