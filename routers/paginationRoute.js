const express = require('express')
const paginationRouter = express.Router()
const accountModel = require('../models/account')

const ITEM_PER_PAGE = 2
paginationRouter.get('/users',(req,res) => {
    let page = req.query.page 
    if (page) {
        page = parseInt(page)
        page = page < 0 ? 1 : page 
        let skip = (page - 1) * ITEM_PER_PAGE
        accountModel.find({})
           .skip(skip)
           .limit(ITEM_PER_PAGE)
           .then(data => {
               res.json(data)
           })
           .catch(err => {
               res.json('Server Error')
           })
    } else { 
        accountModel.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json('Server Error')
            })
    }
})

module.exports = paginationRouter