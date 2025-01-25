import mongoose, { Schema } from 'mongoose'
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'
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
    refreshToken:{
        type:String,
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
    reviews: [
        {
            productId: String,
            rating: Number,
            comment: String,
            date: Date
        }
    ]

}, { timestamps: true })



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.createAccesstoken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY

    })
}
userSchema.methods.createRefreshtoken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY

    })
}

export const User = new mongoose.model('User', userSchema)


