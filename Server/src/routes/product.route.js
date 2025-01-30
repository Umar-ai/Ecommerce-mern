import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { productCreation, productDelete } from '../controller/product.controller.js'


const router=Router()
router.route('/create').post(upload.array('images',3),productCreation)
router.route('/delete/:id').delete(productDelete)



export {router}
