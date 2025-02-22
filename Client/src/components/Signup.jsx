import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import login from '../ReduxToolkit/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Signup() {
    const { handleSubmit, register } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const signuphandler = async (data) => {
        console.log(data)
        const userCredentials = new FormData()
        userCredentials.append('username', data.username)
        userCredentials.append('email', data.email)
        userCredentials.append('password', data.password)
        userCredentials.append('avatar', data.avatar[0])
        const response = await axios.post('http://localhost:8000/api/v1/users/register', userCredentials, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }, withCredentials: true
        })
        dispatch(login(response.data.data))
        if (response.data.data.isAdmin == true) {
            navigate('/all_order')
            dispatch(checkAdmin())
        }
        console.log(response.data.data)
        navigate('/')
    }


    return (
        <>
            <div onSubmit={handleSubmit(signuphandler)} className=' bg-Primary max-h-max'>
                <form className='bg-secondary  mt-[7rem]  2xl:mt-[7rem] sm-w-[40vw]  lg:mt-[2rem] rounded-md lg:h-[90vh] 2xl:h-[70vh] lg:w-[35vw]   h-[70vh] 2xl:w-[30vw] w-[70vw] mx-auto flex flex-col items-center  '>

                    <div className='pt-4'>
                        <h1 className='text-Primary  font-bold md:text-3xl text-4xl'>Sign Up</h1>
                    </div>


                    <div className='pt-20 md:pt-8 2xl:pt-20  '>
                        <input
                            className='h-10 pl-5 w-[22rem] rounded-md text-secondary '
                            type="text"
                            name="username"
                            placeholder='Username'
                            {...register('username', { required: true })}
                        />

                    </div>

                    <div className='pt-12 md:pt-6 2xl:pt-12 '>
                        <input
                            className='h-10 w-[22rem] pl-5 rounded-md'
                            type="email"
                            name="email"
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                    </div>

                    <div className='pt-12 md:pt-6 2xl:pt-12 '>
                        <input
                            className='h-10 w-[22rem] pl-5 rounded-md'
                            type="password"
                            name="password"
                            placeholder='Password'
                            {...register('password', { required: true })}
                        />
                    </div>
                    <div className='pt-12 md:pt-6 2xl:pt-12'>
                        <input {...register('avatar', { required: true })} type="file" className='border-2 rounded-lg border-white placeholder-gray-100 bg-secondary text-Primary pl-10 py-2 px-7 w-[22rem] ' />

                    </div>

                    <div className='pt-12'>
                        <button className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Sign up</button>
                    </div>

                    <div className='pt-6 text-md font-bold  text-Primary'>
                        <p>Already have an account?<a>Signin</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
