import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { productCreation, productDelete, productFind,getPrdouct,productDeleteAll,addReview } from '../controller/product.controller.js'
import {verfiyUser} from '../middlewares/auth.middleware.js'

const router=Router()
router.route('/create').post(upload.fields([
    {name:'one',maxCount:1},{name:'two',maxCount:1},{name:'three',maxCount:1}
]),productCreation)

router.route('/delete/:id').delete(productDelete)
router.route('/allProducts').post(productFind)
router.route('/productdetail/:id').post(getPrdouct)
router.route('/allProductDelte').post(productDeleteAll)
router.route('/addReview/:id').post(verfiyUser,addReview)




export {router}
