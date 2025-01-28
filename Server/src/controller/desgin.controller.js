import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { Design } from "../models/structure.model.js";

const designFound=asynchandler(async(req,res)=>{
const datas=await Design.find()

return res
.status(200)
.json(new apiresponse(200,datas,"Design found successfully"))

})

export default designFound