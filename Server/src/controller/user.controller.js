import { User } from "../models/user.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { Design } from "../models/structure.model.js";

const tokenGenerator = async (id) => {
    const user = await User.findById(id)
    const refreshToken = await user.createRefreshtoken()
    const AccessToken = await user.createAccesstoken()
    if (refreshToken == " " || AccessToken == " ") {
        throw new apierror(400, "Token generation in function failed")
    }
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { refreshToken, AccessToken }
}

const register = asynchandler(async (req, res) => {

    const { username, email, password } = req.body

    if ([username, email, password].some((val) => val == " ")) {
        throw new apierror(400, "All these fields are required")
    }
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
        throw new apierror(400, "Email already exists")
    }
    const checkUsername = await User.findOne({ username })
    if (checkUsername) {
        throw new apierror(400, "username already exists")
    }
    const avatarUrl = req?.file.path
    if (!avatarUrl) {
        throw new apierror(400, "Avatar field is compulsory")
    }
    const avatarUpload = await cloudinaryUpload(avatarUrl)
    if (!avatarUpload) {
        throw new apierror(400, "Cloudinary response not found")
    }

    let date = new Date()
    const month = date.getMonth()
    const desginFound = await Design.findOne({ month })
    if (desginFound) {
        desginFound.Count = desginFound.Count + 1
        await desginFound.save({ validateBeforeSave: false })
    }
    else {
        const design = await Design.create({
            month,
            Count: 1
        })
    }
    const user = await User.create({
        username,
        email,
        password,
        avatar: avatarUpload.url
    }
    )
    console.log(user)
    if (!user) {
        throw new apierror(400, "User creation failed")
    }
    return res
        .json(new apiresponse(200, user, "Signup Successfully"))

})
const login = asynchandler(async (req, res) => {
    const { email, password } = req.body
    if ([email, password].some((val) => val == "")) {
        throw new apierror(400, "All these fields are required to login")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new apierror(400, "No user exists from this email")
    }
    const passwordcheck = await user.verifyPassword(password)
    if (!passwordcheck) {
        throw new apierror(400, "Password incorrect")
    }
    const { refreshToken, AccessToken } = await tokenGenerator(user._id)
    return res
        .status(200)
        .cookie("accesstoken", AccessToken, { httpOnly: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .json(new apiresponse(200, user, "User logged In successfully"))

})
const logout = asynchandler(async (req, res) => {
    const user_id = req.user._id
    //    let users=await User.findOne({_id:user_id})
    const user = await User.findByIdAndUpdate(user_id, { refreshToken: undefined }, { new: true })
    if (!user) {
        throw new apierror(400, "user not found while logging out")
    }
   
    const options = {
        httpOnly: true,
    }
    return res
        .status(200)
        .clearCookie("accesstoken", options)
        .clearCookie("refreshToken", options)
        .json(new apiresponse(200, {}, "User logout Successfully"))

})
const userCart=asynchandler(async(req,res)=>{
    const user=await User.findOne({_id:req.user._id}).populate({
        path:'cart.productId',
        // model:'Product'
    })
    if(!user){
        throw new apierror(500,"having error while getting the cart data")
    }
    return res
    .status(200)
    .json(new apiresponse(200,user,"user data in the cart founded successfully"))
})

export { register, login, logout,userCart }