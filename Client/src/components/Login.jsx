import React from 'react'
import { useForm } from 'react-hook-form'
import {login,checkAdmin} from '../ReduxToolkit/authSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { handleSubmit, register } = useForm()
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const loginHandler = async (data) => {
        try {
            const userCredentials = new FormData()
            userCredentials.append('email', data.email)
            userCredentials.append('username', data.username)
            const response = await axios.post('http://localhost:8000/api/v1/users/login', data,{withCredentials:true})
            dispatch(login(response.data.data))
            if(response.data.data.isAdmin==true){
                navigate('/all_order')
                dispatch(checkAdmin())
            }
            console.log(response.data.data)
            navigate('/')
        } catch (error) {
            console.log("somethign went wrong while logging up in the frontend login handler",error)
        }

    }



    return (
        <>
            <div className=' bg-Primary max-h-max'>
                <form onSubmit={handleSubmit(loginHandler)} className='bg-[#F5F5F5]  mt-[7rem]  2xl:mt-[7rem] sm-w-[40vw]  lg:mt-[2rem] rounded-md lg:h-[90vh] 2xl:h-[70vh] lg:w-[35vw]   h-[70vh] 2xl:w-[30vw] w-[70vw] mx-auto flex flex-col items-center  '>

                    <div className='pt-8'>
                        <h1 className='text-black  font-bold md:text-3xl text-4xl'>Login</h1>
                    </div>

                    <div className='pt-20 md:pt-16 2xl:pt-20 '>
                        <input
                            className='h-14 w-[24rem] text-xl text-black border-2 border-black  2xl:w-[30rem] pl-5 rounded-md'
                            type="email"
                            name="email"
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                    </div>

                    <div className='pt-16 md:pt-16 2xl:pt-20 '>
                        <input
                            className='h-14 2xl:w-[30rem] border-2 border-black text-xl w-[24rem] pl-5 rounded-md'
                            type="password"
                            name="password"
                            placeholder='Password'
                            {...register('password', { required: true })}
                        />
                    </div>


                    <div className='pt-12'>
                        <button className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Login In</button>
                    </div>

                    <div className='pt-6 text-md font-bold  text-Primary'>
                        <p className='text-black'>No Account?Singup</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
