import { User } from "../models/user.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { Product } from "../models/product.model.js";


const addtoCart=asynchandler(async(req,res)=>{
    const id=req.params.id  //product id
    if(!id){
        throw new apierror(500,"Id not received in the params")
    }
    const user=await User.findOne({_id:req.user._id}) 
    if(!user){
        throw new apierror(500,"User not found")
    } 
   if(user.cart.some((val)=>val.productId==id)) 
    {
        const index=user.cart.findIndex((val) => val.productId == id)  
        user.cart[index].quantity=user.cart[index].quantity+1 
        await user.save({validateBeforeSave:false}) 
   }
   else{ 
    const cart_pro={
        productId:id,
        quantity:1
    }
    user.cart.push(cart_pro)
    await user.save({validateBeforeSave:false})
   }
   return res
   .status(200)
   .json(new apiresponse(200,user,"Product add successfully to the cart"))
})


const increaseInCart=asynchandler(async(req,res)=>{
    const product_Id=req.params.cartid
    const user=await User.findOne({_id:req.user._id})
    if(!user){
        throw new apierror(200,"user not found")
    }
    const index=user.cart.findIndex((val)=>val.productId==product_Id)
    user.cart[index].quantity=user.cart[index].quantity+1
    await user.save({validateBeforeSave:true})
    return res
    .status(200)
    .json(new apiresponse(200,user,"product in the cart increased successfully"))
})
const decreaseInCart=asynchandler(async(req,res)=>{
    const product_Id=req.params.cartid
    const user=await User.findOne({_id:req.user._id})
    if(!user){
        throw new apierror(200,"user not found")
    }
    const index=user.cart.findIndex((val)=>val.productId==product_Id)
    if( user.cart[index].quantity>1){
        user.cart[index].quantity=user.cart[index].quantity-1
        await user.save({validateBeforeSave:true})
    }
    else{
        user.cart=user.cart.filter((_,i)=>i!==index)
        await user.save({validateBeforeSave:true})
    }
    return res
    .status(200)
    .json(new apiresponse(200,user,"product in the cart increased successfully"))
})
const delteCart=asynchandler(async(req,res)=>{
    const userid=req.user._id
    const loggedInuser=await User.findOne({_id:userid})
    loggedInuser.cart=[]
    await loggedInuser.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(new apiresponse(200,loggedInuser,"user created cleared successfully"))
})


export {addtoCart,increaseInCart,decreaseInCart,delteCart}