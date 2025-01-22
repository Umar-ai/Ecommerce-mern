import { User } from "../models/user.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { cloudinaryUpload} from "../utils/cloudinary.js";


const register=asynchandler(async(req,res)=>{
    const{username,email,password}=req.body

    if([username,email,password].some((val)=>val==" ")){
        throw new apierror(400,"All these fields are required")
    }
    const checkEmail=await User.findOne({email})
    if(checkEmail){
        throw new apierror(400,"Email already exists")
    }
    const checkUsername=await User.findOne({username})
    if(checkUsername){
        throw new apierror(400,"username already exists")
    }

    const avatarUrl=req?.file.path
    if(!avatarUrl){
        throw new apierror(400,"Avatar field is compulsory")
    }
    const avatarUpload=await cloudinaryUpload(avatarUrl)
    if(!avatarUpload){
        throw new apierror(400,"Cloudinary response not found")
    }
    const user=await User.create({
        username,
        email,
        password,
        avatar:avatarUpload.url
    }
    )
    if(!user){
        throw new apierror(400,"User creation failed")
    }
    return res
    .json(new apiresponse(200,user,"Signup Successfully"))

})

export {register}