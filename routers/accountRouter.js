const express = require('express')
const router = express.Router()
const accountModel = require('../models/account')

router.route('/')
      .get((req,res) => {
          accountModel.find({})
          .then(data => { 
             res.json(data)
          })
          .catch(err => res.status(500).json('Server Error'))
      })
      .post((req,res) => {
        const username = req.body.username 
        const password = req.body.password 
        const role = req.body.role
        role = role ? role : "user"
        accountModel.create({username, password, role})
        .then(data => res.json(data))
        .catch(err => res.status(500).json('Server Error'))
        
      })

router.put('/:id',(req,res) => {
    const id = req.params.id
    const newPassword = req.body.password 
    accountModel.findByIdAndUpdate(id, { password : newPassword })
    .then(data => {res.json(data)})
    .catch(err => {res.status(500).json('Server Error')})
})

router.delete('/:id',(req,res) => {
    const id = req.params.id
    accountModel.deleteOne({_id : id})
    .then(data => {res.json('Delete Successfully')})
    .catch(err => {res.status(500).json('Server Error')})
})
router.delete('/',(req,res) => {
    accountModel.deleteMany({})
     .then(data => {res.json('Delete all successfully')})
     .catch(err => {res.json(err)})
})

module.exports = router