const jwt = require('jsonwebtoken')

const middlewareController = {
    // Verify Token for getting all users
    verifyToken : (req,res,next) => {
      const accessToken = req.headers.token.split(" ")[1] 
      if(accessToken) {
        jwt.verify(accessToken,process.env.ACCESS_KEY,(err,user) => {
          if (err) {
            return res.status(403).json('Token is not valid')
          } else {
            req.user = user
            next()
          }
        })
      } else {
        res.status(401).json("You're not authenticated")
      }
    },
    // Verify Token for deleting function - authorization
    verifyTokenAndAdminAuth : (req,res,next) => {
       middlewareController.verifyToken(req,res, () => {
          if(req.user._id == req.params.id || req.user.admin) {
             next()
          } else {
            return res.status(403).json('You are not allowed to delete other')
          }
       })
    }
}

module.exports = middlewareController