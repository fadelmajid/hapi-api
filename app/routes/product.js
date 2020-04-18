"use strict";

const ProductController = require('../controllers/product');
const product = new ProductController;

module.exports = function(server) {
	return [
		{
			method: 'GET',
			path: '/product/{product_id}',
			handler: product.get
			// handler: (request, h) => {
			// 	return request.params.product_id;
			// }
		}
	];
}();