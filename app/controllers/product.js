const ProductDAO = require('../models/product');
const product = new ProductDAO;
const _ = require('underscore');
const validator = require('validator');

class ProductController {
    async get(request, reply) {
        try {
            const params = request.params.product_id || 0;

            const result = await product.get(params);
            return result;
        } catch (error) {
            throw error
        }
    }

    async list(request, reply) {
        try {
            // query
            const keyword = request.query.keyword || '';
            keyword = `% ${keyword} %`;

            const where = ' AND (product_name LIKE $1 OR product_desc LIKE $2) '
            const data = [keyword, keyword];
            const result = await product.list(where, data);
            return result;
        } catch (error) {
            throw error
        }
    }

    async create(request, reply) {
        try {
            const product_name = request.body.product_name || '';
            const product_no = request.body.product_name || '';
            const product_image = request.body.product_name || '';
            const product_desc = request.body.product_name || '';
            const product_price = request.body.product_name || '';

            const data = {
                product_name: product_name,
                product_no: product_no,
                product_image: product_image,
                product_desc: product_desc,
                product_price: product_price
            }

            const result = await product.create(data);
            return result;
        } catch (error) {
            throw error
        }
    }

    async update(request, reply) {
        try {
            const product_id = request.params.product_id || 0;
            const product_name = request.body.product_name || '';
            const product_no = request.body.product_name || '';
            const product_image = request.body.product_name || '';
            const product_desc = request.body.product_name || '';
            const product_price = request.body.product_name || '';

            const data = {
                product_name: product_name,
                product_no: product_no,
                product_image: product_image,
                product_desc: product_desc,
                product_price: product_price
            }

            const result = await product.update(product_id, data);
            return result;
        } catch (error) {
            throw error
        }
    }


    async delete(request, reply) {
        try {
            const product_id = request.params.product_id || 0;

            const result = await product.delete(product_id);
            return result;
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductController;