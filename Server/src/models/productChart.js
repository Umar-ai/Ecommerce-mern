import mongoose from 'mongoose'

const productChartSchema=new mongoose.Schema(
    {

        month:{
            type:Number,
            required:true,
        },
        Count:{
            type:Number,
            required:true
        }
    },{timestamps:true})


    export const ProductChart=mongoose.model('ProductChart',productChartSchema)