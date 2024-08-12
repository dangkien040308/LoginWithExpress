const express = require('express')
const loginRouter = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')
const accountModel = require('../models/account')

loginRouter.post('/register',(req,res) => {
  const username = req.body.username
  const password = req.body.password
  accountModel.findOne({username : username}) 
   .then(data => {
        if (data) {
          res.json('This username is existed')
        } else {
          res.json('Create account successfully')
          accountModel.create({ username : username, password : password})
        }
   })
   .catch(err => {
      res.status(500).json('Create account fail')
   })
})


loginRouter.get('/login',(req,res) => {
  res.sendFile(path.join(__dirname,'../public/html/login.html'))
})

module.exports = loginRouter