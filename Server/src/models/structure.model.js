import mongoose from 'mongoose'

const DesignSchema=new mongoose.Schema({
month:{
    type:Number,
    required:true,
},
Count:{
    type:Number,
    required:true
}

},{timestamps:true})

export const Design=mongoose.model('Design',DesignSchema)