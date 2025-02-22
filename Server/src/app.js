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

// !design routes
import {router as designRouter} from './routes/design.route.js'
app.use('/api/v1/design',designRouter)

//! product chart 

import {router as product_chartRouter} from './routes/productChart.route.js'
app.use('/api/v1/productchart',product_chartRouter)

// !Cart
import {router as cartRouter} from './routes/cart.router.js'
app.use('/api/v1/cart',cartRouter)

// !Order
import {router as orderRouter} from './routes/order.routes.js'
app.use('/api/v1/order',orderRouter)

export default app