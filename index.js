const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const router = require('./routers/accountRouter')
const loginRouter = require('./routers/loginRoute')
const paginationRouter = require('./routers/paginationRoute')
const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')

dotenv.config()
app.use(cors())
app.use(cookieParser())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'/public')))
mongoose.connect(process.env.MONGODB)

// server run
app.listen(3001, (req,res) => {
  console.log('Run server')
})


app.use('/api/accounts',router)
app.use('/',loginRouter)
app.use('/',paginationRouter)
app.use('/v1/auth',authRouter)
app.use('/v1/users',userRouter)

app.post('/login',(req,res) => {
  const username = req.body.username
  const password = req.body.password
  // var role = req.body.role 
  //     role = role ? req.body.role : "user"
  accountModel.findOne({username, password})
    .then(data => {
       if (data) {
         const token = jwt.sign({_id : data._id},'login')
         return res.json({
            message : 'Login successfully',
            token : token
         })
       } else {
         res.json('Login failed')
       }
    })
    .catch(err => res.status(500).json('Server Error'))
  })

app.get('/tasks',(req,res,next) => {
  try {
      var token = req.cookies.token
      jwt.verify(token,'login') 
      next()
  } catch(err) {
      res.json(err)
  }
} , (req,res) => {
     res.json('All Tasks')
})

app.get('/home',(req,res) => {
    res.sendFile(path.join(__dirname,'/public/html/index.html'))
})
