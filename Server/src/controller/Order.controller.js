import { Order } from "../models/order.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import {User} from '../models/user.model.js'


const create_Order=asynchandler(async(req,res)=>{
    const{order_price,product_id,order_quantity,payment_method}=req.body
    if([order_price,product_id,order_quantity,payment_method].some((val)=>val=="")){
        throw new apierror(205,"all these fields are required for a order")
    }
    const order=await Order.create({
        order_price,
        product_id,
        order_quantity,
        payment_method,
        customer_id:req.user._id
    })
    if(!order){
        throw new apierror(205,"something went wrong while creating the error")
    }
    console.log(order)
    return res
    .status(200)
    .json(new apiresponse(200,order,"Order created successfully"))
})
const all_Orders=asynchandler(async(req,res)=>{
    const allorders=await Order.find().populate('product_id')
    if(!allorders){
        throw new apierror(205,"all orders data not found")
    }
    return res
    .status(200)
    .json(new apiresponse(200,allorders,"All orders data found"))
})
const delete_allorder=asynchandler(async(req,res)=>{
   await Order.deleteMany()
   return res
   .status(200)
   .json(new apiresponse(200,{},"all orders deleted"))

})
const change_status=asynchandler(async(req,res)=>{
    const id=req.params.id
    if (!id){
        throw new apierror(205,"Id not found in the params")
    }
    const order=await Order.findOne({_id:id})
    if(!order){
        throw new apierror(205, "Order not found")
    }
    order.isDelivered=true
    await order.save({validateBeforeSave:false})
    const user=await User.findOne({_id:order.customer_id})
    user.reviews.push(order.product_id)
    await user.save({validateBeforeSave:false})
    console.log(user)
    return res
    .status(200)
    .json(new apiresponse(200,order,"order delivery status converted"))
})
const cancel_Order=asynchandler(async(req,res)=>{
    const id=req.params.id
    if (!id){
        throw new apierror(205,"Id not found in the params")
    }
    const order=await Order.findOne({_id:id})
    order.isCancelled=true
    await order.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(new apiresponse(200,order,"order cancelled status converted"))
})

export {create_Order,all_Orders,delete_allorder,change_status,cancel_Order}