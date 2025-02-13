import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { productCreation, productDelete, productFind,getPrdouct } from '../controller/product.controller.js'


const router=Router()
router.route('/create').post(upload.fields([
    {name:'one',maxCount:1},{name:'two',maxCount:1},{name:'three',maxCount:1}
]),productCreation)

router.route('/delete/:id').delete(productDelete)
router.route('/allProducts').post(productFind)
router.route('/productdetail/:id').post(getPrdouct)




export {router}
