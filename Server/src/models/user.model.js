import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [
        {
            productId: String,
            quantity: Number
        },
    ],
    reviews:[
        {
            productId:String,
            rating:Number,
            comment:String,
            date:Date
        }
    ]

}, { timestamps: true })

export const User=new mongoose.model('User',userSchema)