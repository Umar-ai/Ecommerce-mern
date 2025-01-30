import { createSlice } from "@reduxjs/toolkit";


const initialState={
    status:false,
    userData:null,
    isAdmin:false
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
            state.userData=null
        }
    }
})

export const {login,logout}=authSlice.actions

export default authSlice.reducer