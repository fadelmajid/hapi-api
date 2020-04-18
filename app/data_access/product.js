const Database = require('../../core/database');
const db = new Database;
class ProductDAO {
    async get(id) {
        try {
            let sql = "SELECT * FROM product WHERE product = $1 LIMIT 1"

            let rows = db.query(sql, [id])
            return rows.rows[0];
        } catch (error) {
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