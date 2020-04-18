"use strict";

const ProductController = require('../controllers/product');
const product = new ProductController;

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/product/{product_id}',
			handler: product.get
			// handler: (request, h) => {
			// 	return request.params.product_id;
			// }
		},
		// {
		// 	method: 'GET',
		// 	path: '/product',
		// 	config : {
		// 		handler: productController.find,
		// 		// validate : productValidate.find
		// 	}
		// },
		// {
		// 	method: 'POST',
		// 	path: '/product',
		// 	config : {
		// 		handler : productController.insert,
		// 		// validate : productValidate.insert
		// 	}
		// },
		// {
		// 	method: 'PUT',
		// 	path: '/product/{product_id}',
		// 	config : {
		// 		handler: productController.update,
		// 		// validate : productValidate.update
		// 	}
		// },
		// {
		// 	method: 'DELETE',
		// 	path: '/product/{product_id}',
		// 	config : {
		// 		handler: productController.delete,
		// 		// validate : productValidate.delete
		// 	}
		// }
	];
}();