import { Product } from "../models/product.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ProductChart } from "../models/productChart.js";

const productCreation = asynchandler(async (req, res) => {
    const { name, description, category, price, stock, brand, color } = req.body
    console.log(req.body)

    if ([name, description, category, price, stock, brand, color].some((val) => val == " ")) {
        throw new apierror(400, "All these are required while creating a product")
    }
    const checkName = await Product.findOne({ name })
    if (checkName) {
        throw new apierror(400, "Product from the same name already exists")
    }
    const one=req.files.one[0].path
    const two=req.files.two[0].path
    const three=req.files.three[0].path
 
    
    const uploadone = await cloudinaryUpload(one)
    const uploadtwo = await cloudinaryUpload(two)
    const uploadthree = await cloudinaryUpload(three)


       let date=new Date()
        const month=date.getMonth()
        const desginFound =await ProductChart.findOne({month})
        if(desginFound){
            desginFound.Count=desginFound.Count+1
            await desginFound.save({ validateBeforeSave: false })
        }
        else{
            const design= await ProductChart.create({
                month,
                Count:1
            })
        }
    const product = await Product.create({
        name,
        description,
        category,
        price,
        stock,
        brand,
        color,
        images: [uploadone.url, uploadtwo.url, uploadthree.url]
    })
    if (!product) {
        throw new apierror(400, "product not created")
    }
    console.log("product success")
    return res
        .status(200)
        .json(new apiresponse(200, product, "Product created successfully"))
})

const productDelete=asynchandler(async(req,res)=>{


    const productId=req.params.id
    console.log(req.params)
    if(!productId){
        throw new apierror(400,"product id not found in the params")
    }
    const found=await Product.findOne({_id:productId})
    if(!found){
        throw new apierror(400,"No product exists with this id")
    }

    const response=await Product.deleteOne({_id:productId})
    if(!response){
        throw new apierror(400,"Someting went wrong while deleting the product after the id has found")}

        return res
        .status(200)
        .json(new apiresponse(200,"Product deleted successfully"))
    
})
export { productCreation,productDelete }