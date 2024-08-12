const mongoose = require('mongoose')


const accountSchema = new mongoose.Schema({
    username : String ,
    password : String ,
    role : String 
})

const accountModel = mongoose.model('account',accountSchema)
module.exports = accountModel