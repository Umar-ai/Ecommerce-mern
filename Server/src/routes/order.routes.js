import {Router} from 'express'
import { create_Order,all_Orders,delete_allorder,change_status,cancel_Order } from '../controller/Order.controller.js'
import {verfiyAdmin} from '../middlewares/auth2.middleware.js'
import {verfiyUser} from '../middlewares/auth.middleware.js'

const router=Router()

router.route('/create_order').post(verfiyUser,create_Order)
router.route('/all_orders').post(all_Orders)
router.route('/delete').post(delete_allorder)
router.route('/changeStatus/:id').post(verfiyAdmin,change_status)
router.route('/cancel_Order/:id').post(verfiyAdmin,cancel_Order)



export {router}
