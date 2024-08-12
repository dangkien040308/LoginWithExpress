const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

let refreshTokens = []
const authController = {
   // Register
   registerUser : async(req,res) => {
      try {
          const salt = await bcrypt.genSalt(10)
          const hashed = await bcrypt.hash(req.body.password, salt)
  
          // Create user 
          const user = User.create({
              username : req.body.username,
              password : hashed ,
              email : req.body.email,
              admin : req.body.admin
          })
            .then(data => res.status(200).json(data))
            .catch(err => res.json(err))
      } catch(err) {
          res.status(500).json(err)
      }   
   }  ,
   // Generate Access Token 
   generateAccessToken : (user) => {
     return jwt.sign({
      _id : user._id,
      admin : user.admin,
      username : user.username,
      email : user.email,
      admin : user.admin
    }, 
    process.env.ACCESS_KEY ,
    { expiresIn : "1d" } 
    )
   },
   // Generate Refresh Token
   generateRefreshToken : (user) => {
     return jwt.sign({
      _id : user._id,
      admin : user.admin,
      username : user.username,
      email : user.email,
      admin : user.admin
    }, 
    process.env.REFRESH_KEY ,
    { expiresIn : "365d" } 
    )
   },
   // Login
   loginUser : async(req,res) => {
      try {
        const user = await User.findOne({username : req.body.username})
        if(!user) {
          return res.status(404).json('Wrong username')
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
          return res.status(404).json('Wrong password')
        }
        if(user && validPassword) {
          const accessToken = authController.generateAccessToken(user)
          const refreshToken = authController.generateRefreshToken(user)
          refreshTokens.push(refreshToken)
          res.cookie("refreshToken",refreshToken,{
              httpOnly : true,
              secure : false,
              path : "/",
              sameSite : "strict"
          })
          const {password, ...other} = user._doc
          res.status(202).json({...other, accessToken})
        } 
      }catch(err) {
         return res.status(500).json(err)
      }
   },

   requestRefreshToken : async(req,res) => {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) res.json("You're not authenticated")
      if (!refreshTokens.includes(refreshToken)) res.json("Token is not valid")
      const user = jwt.verify(refreshToken,process.env.REFRESH_KEY,(err,user) => {
        if (err) {
          res.json(err)
        } 
        const newRefreshToken = authController.generateRefreshToken(user)
        const newAccessToken = authController.generateAccessToken(user)
        refreshTokens = refreshTokens.filter(token => token != refreshToken)
        refreshTokens.push(newRefreshToken)
        res.cookie("refreshToken",newRefreshToken,{
          httpOnly : true,
          secure : false,
          path : "/",
          sameSite : "strict"
      })
        res.status(200).json({newAccessToken})
      })
      
   },

   logoutUser : async(req,res) => {
     res.clearCookie("refreshToken")
     refreshTokens = refreshTokens.filter(token => token != req.cookies.refreshToken) 
     res.status(200).json({refreshTokens})
   }
   
}

module.exports = authController