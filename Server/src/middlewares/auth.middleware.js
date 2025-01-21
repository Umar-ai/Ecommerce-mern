import { apierror } from "../utils/apierror";
import { apiresponse } from "../utils/apiresponse";
import jwt from 'jsonwebtoken'

const verfiyUser=async (req,res,next)=>{
    const accesstoken=req.cookies.accesstoken
    if(!accesstoken){
        throw new apierror(400,"access token not found")
    }
    const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET)
    if(!verify){
      throw new apierror(401,"access token verification failed")
    }
    const user=User.findById(verify._id)
    req.user=user
    next()

}

export {verfiyUser}