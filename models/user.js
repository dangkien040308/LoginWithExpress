const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
      type : String,
      required : true,
      minlength : 6,
      maxlength : 20,
      unique : true
    },
    password : {
      type : String,
      required : true,
      minlength : 6
    },
    email : {
      type : String,
      required : true,
      minlength : 10,
      maxlength : 50,
      unique : true
    },
    admin : {
      type : Boolean,
      default : false
    }
},  { timestamps : true })

const User = mongoose.model('User',userSchema)

module.exports = User