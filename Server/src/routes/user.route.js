import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { register } from '../controller/user.controller.js'


const router=Router()
router.route('/register').post(upload.single('avatar'),register)



export {router}
