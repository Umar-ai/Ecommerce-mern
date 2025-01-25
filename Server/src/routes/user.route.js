import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { register,login,logout } from '../controller/user.controller.js'
import {verfiyUser} from '../middlewares/auth.middleware.js'

const router=Router()
router.route('/register').post(upload.single('avatar'),register)
router.route('/login').post(login)
router.route('/logout').post(verfiyUser,logout)



export {router}
