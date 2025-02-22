import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: [String],
    brand: {
        type: String,
        default: "local"
    },
    ram: {
        type: Number,
        required:true
    },
    storage: {
        type: Number,
        required:true
    },
    color: {
        type:String,
        required:true
    },
    rating: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
    },
    reviews: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            rating: Number,
            comment: String,
            date: Date
        }
    ]


}, { timestamps: true })

export const Product = new mongoose.model('Product', productSchema)