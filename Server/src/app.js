import express, { urlencoded } from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({
    path:'../.env'
})
const app=express()


app.use(cookieparser())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(urlencoded({
    limit:'15kb'
}))
app.use(express.json({
    limit:"15kb"
}))

// !user routes
import {router as userRouter} from './routes/user.route.js'
app.use('/api/v1/users',userRouter)
// !product routes
import {router as productRouter} from './routes/product.route.js'
app.use('/api/v1/products',productRouter)

export default app