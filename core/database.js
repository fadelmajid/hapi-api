let postgres = require("pg").Pool
let pool

let config = require('../config/config.json')
let configDB = config['development']

class Database {
    async getPool () {
        try {    
            if (pool) {
                return pool
            }
            pool = await new postgres({
                connectionLimit : 500,
                host: configDB.host,
                port: configDB.port,
                user: configDB.username,
                password: configDB.password,
                database: configDB.database,
                timezone: 'SYSTEM',
                timeout: 5
            })
            return pool
        } catch (error) {
            throw error
        }
    }

    async getConnection () {
        let conn = await this.getPool()
        conn = await conn.connect()
        return conn
    }

    async query (sql, params) {
        console.log(sql);
        console.log(params);
        let conn = await this.getPool()
        console.log(conn);
        let query = await conn.query(sql, params)
        return query
    }

    async getAll(conn, sql, data, limit) {
        let bind = data.length
        // if limit greater than 0 set the limit
        if(parseInt(limit) > 0) {
            data.push(limit)
            sql += " LIMIT $"+(bind+1)
        }

        let query = await conn.query(sql, data)
        return query.rows
    }

    async getPaging (conn, sql, data, page_no, no_per_page) {
        let query = await conn.query(sql, data)
        let total_row = query.rowCount
        let last_row = no_per_page * page_no
        let first_row = last_row - no_per_page
        let total_page = Math.ceil(total_row / no_per_page)

        // length of the data
        let bind = data.length
        sql += " LIMIT $" + (bind+1) + " OFFSET $"+ (bind+2)

        data.push(no_per_page)
        data.push(first_row > total_row ? total_row : first_row)
 
        query = await conn.query(sql, data)

        return {
            'data': query.rows,
            'total_row': total_row,
            'total_page': total_page,
            'no_per_page': no_per_page
        }
    }

    async insert (conn, tblname, data, id_name) {
        // validate data
        if(typeof data !== 'object') {
            throw getMessage('dbins001')
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
            throw getMessage('dbins002')
        }else{
            cols = cols.slice(0, -1)
            vals = vals.slice(0, -1)
        }

        let sql = "INSERT INTO " + tblname + "(" + cols + ") VALUES (" + vals + ") returning " + id_name 
        let result = await conn.query(sql, binding)
        return result.rows[0]
    }


    async update (conn, tblname, where, data) {
        // validate data
        if(typeof data !== 'object') {
            throw getMessage('dbupd001')
        }
        if(typeof where !== 'object') {
            throw getMessage('dbupd002')
        }else if(where.cond === undefined) {
            throw getMessage('dbupd003')
        }else if(where.cond == '') {
            throw getMessage('dbupd004')
        }

        let count = 0
        let binding = []
        //let where = {"cond": "test_id = ? ", "bind": [id]}
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
            throw getMessage('dbupd005')
        }else{
            setcond = setcond.slice(0, -1)
        }


        let sql = "UPDATE " + tblname + " SET " + setcond + " WHERE " + where.cond

        return await conn.query(sql, binding)
    }


    async delete (conn, tblname, where) {
        // validate data
        if(typeof where !== 'object') {
            throw getMessage('dbdel001')
        }else if(where.cond === undefined) {
            throw getMessage('dbdel002')
        }else if(where.cond == '') {
            throw getMessage('dbdel003')
        }

        let binding = []
        //let where = {"cond": "test_id = ? ", "bind": [id]}
        if(where.bind !== undefined && typeof where.bind == 'object') {
            for(let i = 0, len = where.bind.length; i < len; i++) {
                binding.push(where.bind[i])
            }
        }

        let sql = "DELETE FROM " + tblname + " WHERE " + where.cond
        return await conn.query(sql, binding)
    }
}

module.exports = Database;
