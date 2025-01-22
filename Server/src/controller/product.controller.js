import { Product } from "../models/product.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

const productCreation = asynchandler(async (req, res) => {
    const { name, description, category, price, stock, brand, color } = req.body
    if ([name, description, category, price, stock, brand, color].some((val) => val == " ")) {
        throw new apierror(400, "All these are required while creating a product")
    }
    const checkName = await Product.findOne({ name })
    if (checkName) {
        throw new apierror(400, "Product from the same name already exists")
    }
    // const imagesUrl=await req.
    console.log(req.files)
    const imagesArray = req.files.map((img) => {
        return img.path
    })
    const uploadone = await cloudinaryUpload(imagesArray[0])
    const uploadtwo = await cloudinaryUpload(imagesArray[1])
    const uploadthree = await cloudinaryUpload(imagesArray[2])
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
    return res
        .status(200)
        .json(new apiresponse(200, product, "Product created successfully"))
})
export { productCreation }