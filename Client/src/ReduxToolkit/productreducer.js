import { createSlice } from "@reduxjs/toolkit";


const initialState={

    productsData:null,
    resetData:null,
    Cart:[]
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
        },
        Addto_Cart:(state,action)=>{
            state.Cart=[...state.Cart,action.payload]
        },
        deletefrom_Cart:(state,action)=>{
        state.Cart=state.Cart.filter((val)=>val._id!==action.payload)
        },
        Clear_Cart:(state)=>{
            state.Cart=[]
        }

    }
})

export const {ProductMang,resetPurpose,Addto_Cart,deletefrom_Cart,Clear_Cart

}=productSlice.actions

export default productSlice.reducer