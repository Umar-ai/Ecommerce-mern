import {Router} from 'express'
import designFound from '../controller/desgin.controller.js'
import { find_productchart } from '../controller/productchart.controller.js'


const router=Router()
router.route('/find').post(find_productchart)



export {router}
