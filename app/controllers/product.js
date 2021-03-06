const ProductDAO = require('../models/product');
const product = new ProductDAO;
const ElevaniaAPI = require('../clients/elevania')
const elevania = new ElevaniaAPI;

const _ = require('underscore');

class ProductController {
    async elevaniaProduct(request, reply) {
        try {
            const result = await elevania.reqData();
            
            for(let i = 0; i < result.length; i++){
                let data = {
                    product_name: result[i].prdNm,
                    product_desc: result[i].dispCtgrNmRoot,
                    product_no: result[i].prdNo,
                    product_price: result[i].selPrc,
                    product_image: result[i].imageKindChk
                };

                await product.create(data);
            }

            const res = await product.list();
            return res;
        } catch (error) {
            throw error   
        }
    }

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
            let keyword = request.query.keyword; 
            if(_.isEmpty(request.query.keyword)){
                keyword = null
            };

            const where = ''
            const data = []
            if(!_.isNull(keyword)){
                keyword = `% ${keyword} %`;
                where = ' AND (product_name LIKE $1 OR product_desc LIKE $2) '
                data = [keyword, keyword];
            }

            const result = await product.list(where, data);
            return result;
        } catch (error) {
            throw error
        }
    }

    async create(request, reply) {
        try {
            const product_name = request.payload.product_name || '';
            const product_no = request.payload.product_no || '';
            const product_image = request.payload.product_image || '';
            const product_desc = request.payload.product_desc || '';
            const product_price = request.payload.product_price || '';

            const data = {
                product_name: product_name,
                product_no: product_no,
                product_image: product_image,
                product_desc: product_desc,
                product_price: product_price
            }

            const prd = await product.create(data);
            const result = await product.get(prd.product_id);
            return result;
        } catch (error) {
            throw error
        }
    }

    async update(request, reply) {
        try {
            const product_id = request.params.product_id || 0;
            const product_name = request.payload.product_name || '';
            const product_no = request.payload.product_no || '';
            const product_image = request.payload.product_image || '';
            const product_desc = request.payload.product_desc || '';
            const product_price = request.payload.product_price || '';

            const data = {
                product_name: product_name,
                product_no: product_no,
                product_image: product_image,
                product_desc: product_desc,
                product_price: product_price
            }

            await product.update(product_id, data);
            const result = await product.get(product_id);
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