import { apierror } from "../utils/apierror.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

const verfiyAdmin=async (req,res,next)=>{
    const accesstoken=req.cookies.accesstoken
    if(!accesstoken){
        throw new apierror(400,"access token not found")
    }
    // console.log(process.env.ACCESS_TOKEN_SECRET)
    const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET)
    if(!verify){
      throw new apierror(401,"access token verification failed")
    }
    const user=await User.findById(verify._id)
    if(user.isAdmin==false){
        throw new apierror(205,"only admin can access this route")
    }
    req.user=user
    next()

}

export {verfiyAdmin}