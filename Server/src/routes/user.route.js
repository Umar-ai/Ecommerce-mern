import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { register,login,logout,userCart,add_Useradress,getUser } from '../controller/user.controller.js'
import {verfiyUser} from '../middlewares/auth.middleware.js'

const router=Router()
router.route('/register').post(upload.single('avatar'),register)
router.route('/login').post(login)
router.route('/logout').post(verfiyUser,logout)
router.route('/userCart').post(verfiyUser,userCart)
router.route('/add_address').post(verfiyUser,add_Useradress)
router.route('/getUser').post(verfiyUser,getUser)




export {router}
