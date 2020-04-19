"use strict";

const dotenv = require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:a455328fm@localhost:5432/hapidb'
});

const ErrorCodes = {
    dbins001: "Insert Query Error! Data should be an object.",
    dbins002: "Insert Query Error! Please provide data.",
    dbupd001: "Update Query Error! Data should be an object.",
    dbupd002: "Update Query Error! Please provide where condition.",
    dbupd003: "Update Query Error! Please provide cond & bind.",
    dbupd004: "Update Query Error! Please provide where condition.",
    dbupd005: "Update Query Error! Please provide data.",
    dbdel001: "Delete Query Error! Please provide where condition.",
    dbdel002: "Delete Query Error! Please provide cond & bind.",
    dbdel003: "Delete Query Error! Please provide where condition.",
}

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


    async getAll(sql, data, limit) {
        let bind = data.length
        // if limit greater than 0 set the limit
        if(parseInt(limit) > 0) {
            data.push(limit)
            sql += " LIMIT $"+(bind+1)
        }

        let query = await pool.query(sql, data)
        return query.rows
    }

    async getPaging (sql, data, page_no, no_per_page) {
        let query = await pool.query(sql, data)
        let total_row = query.rowCount
        let last_row = no_per_page * page_no
        let first_row = last_row - no_per_page
        let total_page = Math.ceil(total_row / no_per_page)

        // length of the data
        let bind = data.length
        sql += " LIMIT $" + (bind+1) + " OFFSET $"+ (bind+2)

        data.push(no_per_page)
        data.push(first_row > total_row ? total_row : first_row)
 
        query = await pool.query(sql, data)

        return {
            'data': query.rows,
            'total_row': total_row,
            'total_page': total_page,
            'no_per_page': no_per_page
        }
    }

    async insert (tblname, data, id_name) {
        // validate data
        if(typeof data !== 'object') {
            throw ErrorCodes.dbins001
        }

        // prepare const
        let cols = ""
        let vals = ""
        let count = 0
        let binding = []

        for (let prop in data) {
            count++
            if (!data.hasOwnProperty(prop)) {
                //The current property is not a direct property of p
                continue
            }
            cols += prop + ","
            vals += "$"+count+","
            binding.push(data[prop])
        }

        if(cols == '' || vals == '') {
            throw ErrorCodes.dbins002
        }else{
            cols = cols.slice(0, -1)
            vals = vals.slice(0, -1)
        }

        let sql = "INSERT INTO " + tblname + "(" + cols + ") VALUES (" + vals + ") returning " + id_name 
        let result = await pool.query(sql, binding)
        return result.rows[0]
    }


    async update (tblname, where, data) {
        // validate data
        if(typeof data !== 'object') {
            throw ErrorCodes.dbupd001
        }
        if(typeof where !== 'object') {
            throw ErrorCodes.dbupd002
        }else if(where.cond === undefined) {
            throw ErrorCodes.dbupd003
        }else if(where.cond == '') {
            throw ErrorCodes.dbupd004
        }

        let count = 0
        let binding = []
        //let where = cond": "test_id = ? ", "bind": [id]}
        if(where.bind !== undefined && typeof where.bind == 'object') {
            for(let i = 0, len = where.bind.length; i < len; i++) {
                count++
                binding.push(where.bind[i])
            }
        }

        // prepare const
        let setcond = ""
        for (let prop in data) {
            count++
            if (!data.hasOwnProperty(prop)) {
                //The current property is not a direct property of p
                continue
            }
            setcond += prop + " = $"+count+","
            binding.push(data[prop])
        }
        if(setcond == '') {
            throw ErrorCodes.dbupd005
        }else{
            setcond = setcond.slice(0, -1)
        }


        let sql = "UPDATE " + tblname + " SET " + setcond + " WHERE " + where.cond

        return await pool.query(sql, binding)
    }


    async delete (tblname, where) {
        // validate data
        if(typeof where !== 'object') {
            throw ErrorCodes.dbdel001
        }else if(where.cond === undefined) {
            throw ErrorCodes.dbdel002
        }else if(where.cond == '') {
            throw ErrorCodes.dbdel003
        }

        let binding = []
        //let where = cond": "test_id = ? ", "bind": [id]}
        if(where.bind !== undefined && typeof where.bind == 'object') {
            for(let i = 0, len = where.bind.length; i < len; i++) {
                binding.push(where.bind[i])
            }
        }

        let sql = "DELETE FROM " + tblname + " WHERE " + where.cond
        return await pool.query(sql, binding)
    }
}

module.exports = Database;