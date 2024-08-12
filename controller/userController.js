const User = require('../models/user')
const userController = {

    //GET ALL USERS
    getAllUsers : async(req,res) => {
        try {
            User.find({})
               .then(data => res.status(200).json(data))
               .catch(err => res.json(err))
        } catch(err) {
            res.status(500).json(err)
        }
    }  ,
    // DELETE A USER 
    deleteUser : async(req,res) => {
        try {
            User.findById(req.params.id)
                .then(data => res.json({data}))
                .catch(err => res.json(err))
        } catch(err) {
          res.status(500).json(err)
       }
    }
}

module.exports = userController