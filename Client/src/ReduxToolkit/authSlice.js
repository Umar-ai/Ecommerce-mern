import { createSlice } from "@reduxjs/toolkit";


const initialState={
    status:false,
    userData:null,
    isAdmin:false,
    productsData:null
}



export const authSlice=createSlice({
    name:'reduxAuthSlice',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null,
            state.isAdmin=false
        },
        checkAdmin:(state)=>{
            state.isAdmin=true
        },
        change_reviewStatus:(state,action)=>{
        state.userData.reviews=state.userData.reviews.filter((val)=>val.productId!==action.payload)
        }
        
    }
})

export const {login,logout,ProductMang,checkAdmin,change_reviewStatus}=authSlice.actions

export default authSlice.reducer