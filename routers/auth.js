const authRouter = express.Router()
const authController = require('../controller/authController')
const middlewareController = require('../controller/middlewareController')

authRouter.post('/register',authController.registerUser)
authRouter.post('/login',authController.loginUser)

authRouter.post('/refresh',authController.requestRefreshToken)
authRouter.post('/logout', middlewareController.verifyToken ,authController.logoutUser)

module.exports = authRouter