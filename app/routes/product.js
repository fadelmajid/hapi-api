"use strict";

const ProductController = require('../controllers/product');
const product = new ProductController;

module.exports = function() {
	return [
		{
			method: 'GET',
			path: '/product/elevania',
			handler: product.elevaniaProduct
		},
		{
			method: 'GET',
			path: '/product/{product_id}',
			handler: product.get
		},
		{
			method: 'GET',
			path: '/product',
			handler: product.list
		},
		{
			method: 'POST',
			path: '/product',
			handler: product.create
		},
		{
			method: 'PATCH',
			path: '/product/{product_id}',
			handler: product.update
		},
		{
			method: 'DELETE',
			path: '/product/{product_id}',
			handler: product.delete
		}
	];
}();