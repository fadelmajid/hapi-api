'use strict';

const Db = require('../../core/db');
const db = new Db;
const tbl = require('../../config/tables.json');

class ProductDAO {
    async get(id) {
        try {
            const values = [id]
			const sql = `SELECT * FROM ${tbl.product} WHERE product_id = $1`;

			const result = await db.query({
				sql : sql, 
				values: values
            });
            
            return result;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async list(where = '', data = [], order_by = " product_id ASC ", limit = 0) {
        const sql = "SELECT * FROM " + tbl.product + " WHERE 1=1 " + where + " ORDER BY " + order_by;

        const res = await db.getAll(sql, data, limit);
        return res;
    }

    async create(data) {
        const res = await db.insert(tbl.product, data, 'product_id');
        return res;
    }

    async update(id, data) {
        const where = {'cond': 'product_id = $1', 'bind': [id]};
        const res = await db.update(tbl.product, where, data);
        return res;
    }

    async delete(id) {
        const where = {'cond': 'product_id = $1', 'bind': [id]};
        const res = await db.delete(tbl.product, where);
        return res;
    }
}

module.exports = ProductDAO