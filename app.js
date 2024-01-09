require('express-async-errors')
const express = require('express')
const app = express()
require('dotenv').config()
const helmet = require('helmet')
const xss = require('xss-clean')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
//const rateLimiter = require('express-rate-limit')
const cors = require('cors')
const connectToDb = require('./db/connection')
const notfound = require('./middleware/notfound')
const errorHandler = require('./middleware/error-handler')
const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route')
const businessUserRouter = require('./routes/business-route')
const categoryRouter = require('./routes/categories-route')
const citiesRouter = require('./routes/cities-route')
const authorizationMiddleware = require('./middleware/authorization')

app.use('/uploads',express.static('uploads'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
//app.use(Helmet())
app.use(xss())
app.use(cors())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',authorizationMiddleware,userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/cities',citiesRouter)
app.use('/api/v1/businessUser',authorizationMiddleware,businessUserRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(notfound)
app.use(errorHandler)
const start = async()=>{
    try{
        await connectToDb(process.env.MONGO_URI)
        app.listen(process.env.PORT||2000,    console.log(`server started at ${process.env.PORT}`))
    }catch(e){
        console.log(e)

    }
}

start()









