"use strict";

var productController = require('../controllers/product');
// var productValidate = require('src/validate/product');

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/product/{product_id}',
			handler: () => {
				return 'Halo';
			}
			
			// {
			// 	handler: productController.findByID,
			// 	// validate: productValidate.findByID
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