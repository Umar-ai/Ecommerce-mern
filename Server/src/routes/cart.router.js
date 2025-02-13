import Router from 'express'
import { addtoCart,increaseInCart,decreaseInCart,delteCart } from '../controller/Cart.controller.js'
import { verfiyUser } from '../middlewares/auth.middleware.js'
const router=Router()


router.route('/addtocart/:id').post(verfiyUser,addtoCart)
router.route('/increasecart/:cartid').post(verfiyUser,increaseInCart)
router.route('/decreasecart/:cartid').post(verfiyUser,decreaseInCart)
router.route('/deletecart').post(verfiyUser,delteCart)

export  {router}