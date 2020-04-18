const ProductDAO = require('../data_access/product');
const product = new ProductDAO;

class ProductController {
    async get(request, reply) {
        try {
        const params = request.params.product_id;
        // const result = await product.get(params);
        return params;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductController;