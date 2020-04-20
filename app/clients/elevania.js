'use strict'

const dotenv = require('dotenv').config();
const request = require('axios');
const parser = require('xml2json');

class ElevaniaAPI {
    async reqData () {
        const data = {
            url: process.env.ELEVANIA_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                'openapikey': process.env.ELEVANIA_API_KEY
            }
        };

        try {
            const result = await request(data);
            let res = JSON.parse(parser.toJson(result.data));

            res = res.Products.product;
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ElevaniaAPI;