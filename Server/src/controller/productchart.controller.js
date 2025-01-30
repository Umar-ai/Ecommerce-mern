import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ProductChart } from "../models/productChart.js";

const find_productchart=asynchandler(async(req,res)=>{

const response=await ProductChart.find()
if(!response){
    throw new apierror(400,"something went wrong while fetching product information")
}

return res
.status(200)
.json(new apiresponse(200,response,"Product chart information found successfully"))
    
})


export {find_productchart}