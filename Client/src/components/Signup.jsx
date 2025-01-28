import React from 'react'
import { useForm } from 'react-hook-form'
// import login from '../ReduxToolkit/authSlice'
// import {useDispatch} from 'react-redux'

function Signup() {
    const { handleSubmit, register } = useForm()
    // const dispatch=useDispatch()



    return (
        <>
            <div className=' bg-Primary max-h-max'>
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
                            {...register('username', { required: true })}
                        />
                    </div>

                    <div className='pt-12 md:pt-6 2xl:pt-12 '>
                        <input
                        className='h-10 w-[22rem] pl-5 rounded-md'
                            type="password"
                            name="password"
                            placeholder='Password'
                            {...register('username', { required: true })}
                        />
                    </div>
                    <div className='pt-12 md:pt-6 2xl:pt-12'>
                                <input {...register('avatar', { required: true })}  type="file" className='border-2 rounded-lg border-white placeholder-gray-100 bg-secondary text-Primary pl-10 py-2 px-7 w-[22rem] '/>
                            
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
