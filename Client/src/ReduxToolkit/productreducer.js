import { createSlice } from "@reduxjs/toolkit";


const initialState={

    productsData:null,
    resetData:null
}



export const productSlice=createSlice({
    name:'reduxProductSlice',
    initialState,
    reducers:{
       
        ProductMang:(state,action)=>{
            state.productsData=action.payload
        },
        resetPurpose:(state,action)=>{
            state.resetData=action.payload
        }
    }
})

export const {ProductMang,resetPurpose}=productSlice.actions

export default productSlice.reducer