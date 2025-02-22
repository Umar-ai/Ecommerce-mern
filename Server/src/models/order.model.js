import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    payment_method: {
        type: String,
        required: true,
    },
    order_quantity: {
        type: Number,
        required: true
    },
    customer_id: {
        type: String,
        required: true,
    },
    order_price: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }

}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)