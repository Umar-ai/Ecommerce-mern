import {Router} from 'express'
import designFound from '../controller/desgin.controller.js'


const router=Router()
router.route('/find').post(designFound)



export {router}
