'use strict';

const Db = require('../../core/db');
const db = new Db;
const tbl = require('../../config/tables.json');
const assert = require('assert-plus');

class ProductDAO {
    async get(id) {
        try {
            assert.optionalNumber(id);

            let values = [id]
			let sql = `SELECT * FROM ${tbl.product} WHERE product_id = $1`;

			let result = await db.query({
				sql : sql, 
				values: values
            });
            
            return result;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async list() {

    }

    async create() {

    }

    async update() {

    }

    async delete() {
        
    }
}

module.exports = ProductDAO