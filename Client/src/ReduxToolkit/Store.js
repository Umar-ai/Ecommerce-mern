import {configureStore,combineReducers} from "@reduxjs/toolkit"
import authreducer from './authSlice'
import productreducer from './productreducer'


const rootreducer=combineReducers({
    auth: authreducer,
    product: productreducer,
})

export const store=configureStore({
    reducer:rootreducer
})
