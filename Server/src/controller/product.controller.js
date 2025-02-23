import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

const productCreation = asynchandler(async (req, res) => {
    const { name, description, ram, storage, category, price, stock, brand, color } = req.body
    console.log(req.body)

    if ([name, description, category, ram, storage, price, stock, brand, color].some((val) => val == " ")) {
        throw new apierror(400, "All these are required while creating a product")
    }
    const checkName = await Product.findOne({ name })
    if (checkName) {
        throw new apierror(400, "Product from the same name already exists")
    }
    const one = req.files.one[0].path
    const two = req.files.two[0].path
    const three = req.files.three[0].path


    const uploadone = await cloudinaryUpload(one)
    const uploadtwo = await cloudinaryUpload(two)
    const uploadthree = await cloudinaryUpload(three)


    let date = new Date()
    const month = date.getMonth()
    const desginFound = await ProductChart.findOne({ month })
    if (desginFound) {
        desginFound.Count = desginFound.Count + 1
        await desginFound.save({ validateBeforeSave: false })
    }
    else {
        const design = await ProductChart.create({
            month,
            Count: 1
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
        ram,
        storage,
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
const productDelete = asynchandler(async (req, res) => {


    const productId = req.params.id
    console.log(req.params)
    if (!productId) {
        throw new apierror(400, "product id not found in the params")
    }
    const found = await Product.findOne({ _id: productId })
    if (!found) {
        throw new apierror(400, "No product exists with this id")
    }

    const response = await Product.deleteOne({ _id: productId })
    if (!response) {
        throw new apierror(400, "Someting went wrong while deleting the product after the id has found")
    }

    return res
        .status(200)
        .json(new apiresponse(200, "Product deleted successfully"))

})
const productFind = asynchandler(async (req, res) => {
    const { name, brand } = req.query
    const queryObj = {}
    if (name) {
        queryObj.name = { $regex: name, $options: "i" }
    }


    const products = await Product.find(queryObj).populate({
        path: 'reviews.userId'
    })

    if (!products) {
        throw new apierror(500, "Products not found")
    }
    if (products.length < 1) {
        return
    }
    return res
        .status(200)
        .json(new apiresponse(200, products, "Products founded successfully"))


})
const productDeleteAll = asynchandler(async (req, res) => {
    const response = await Product.deleteMany()
    return res
        .status(200)
        .json(new apiresponse(200, {}, "All products deleted"))
})
const getPrdouct = asynchandler(async (req, res) => {
    const { id } = req.params
    const response = await Product.findOne({ _id: id })
    return res
        .status(200)
        .json(new apiresponse(200, response, "Product details found"))

})
const addReview = asynchandler(async (req, res) => {
    const product_id = req.params.id
    console.log(req.body)
    const { rating, review } = req.body
    const userid = req.user._id
    if ([rating, review].some(val => val == "")) {
        throw new apierror(205, "Fields are missing to create a review")
    }
    const user=await User.findOne({_id:userid})
    const modified=user.reviews.filter((val)=>val.productId!==product_id)
    user.reviews=modified
    
    
    const product = await Product.findOne({ _id: product_id })
    const Review = {
        userId: userid,
        rating,
        comment:review
    }
    product.reviews.push(Review)
    console.log(product)
    await product.save({ validateBeforeSave: false })
    await user.save({ validateBeforeSave: false })
    
    return res
        .status(200)
        .json(new apiresponse(200, product, "review added successfully"))
})

export { getPrdouct, productCreation, productDelete, productFind, addReview, productDeleteAll }