'use strict';

const Db = require('../../core/db');
const db = new Db;

class ProductDAO {
    async get(id) {
        try {
            let values = [
                id
            ]

			let sql = 'SELECT * FROM product WHERE product_id = $1 ';

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