"use strict"
let obj = (rootpath) => {
    const moment = require('moment')
    const fn = {}
    
    // START SERVICE
    fn.findByID = async (req, res, next) => {
        try {
            // let service_id = parseInt(req.params.service_id) || 0
            // if (service_id <= 0) {
            //     throw getMessage('srv001')
            // }

            // // validate if address exists
            // let result = await req.model('service').getService(service_id)
            // if (!result || result.service_status == 'inactive' || result.is_deleted == true) {
            //     throw getMessage('srv003')
            // }

            // res.success(result)
            console.log('findById');
        } catch (e) {next(e)}
    }

    fn.getAllService = async (req, res, next) => {
        try {
            let keyword = req.query.keyword || ''
            keyword = '%' + keyword + '%'
            let where = ' AND srv.service_name LIKE $1 AND srv.is_deleted = $2 AND srv.service_status = $3'
            let data = [keyword, false, 'active']
            let order_by = ' srv.service_id ASC '
            
            // validate result
            let result = await req.model('service').getAllService(where, data, order_by)
            if (!result) {
                throw getMessage('srv003')
            }

            res.success(result)
        } catch(e) {next(e)}
    }

    fn.getPagingService = async (req, res, next) => {
        try {
            let keyword = req.query.keyword || ''
            keyword = '%' + keyword + '%'
            let where = ' AND srv.service_name LIKE $1 AND srv.is_deleted = $2 AND srv.service_status = $3'
            let data = [keyword, false, 'active']
            let order_by = ' srv.service_id ASC '
            let page_no = req.query.page || 0
            let no_per_page = req.query.perpage || 0
            
            // validate result
            let result = await req.model('service').getPagingService(
                where,
                data,
                order_by,
                page_no,
                no_per_page
            )
            if (!result) {
                throw getMessage('srv003')
            }

            res.success(result)
        } catch(e) {next(e)}
    }
    // END SERVICE


    fn.getAllServiceByUnit = async (req, res, next) => {
        try {
            let unit_id = parseInt(req.params.unit_id) || 0
            if (unit_id <= 0) {
                throw getMessage('unt001')
            }

            let keyword = req.query.keyword || ''
            keyword = '%' + keyword + '%'
            let where = ' AND unt.unit_id = $1 AND srv.service_name LIKE $2 AND srv.is_deleted = $3 AND srv.service_status = $4'
            let data = [unit_id, keyword, false, 'active']
            let order_by = ' srv.service_id ASC '
            let result = await req.model('service').getAllService(where, data, order_by)

            res.success(result)
        } catch(e) {next(e)}
    }

    return fn
}

module.exports = obj