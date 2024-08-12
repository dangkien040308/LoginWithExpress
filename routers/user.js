const userRouter = require('express').Router()
const userController = require('../controller/userController')
const middlewareController = require('../controller/middlewareController')

//GET ALL USERS
userRouter.get('/', middlewareController.verifyToken ,userController.getAllUsers)

//DELETE A USer 
userRouter.delete('/:id',middlewareController.verifyTokenAndAdminAuth,userController.deleteUser)

module.exports = userRouter