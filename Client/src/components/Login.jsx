import React from 'react'
import { useForm } from 'react-hook-form'
// import login from '../ReduxToolkit/authSlice'
// import {useDispatch} from 'react-redux'

function Login() {
    const { handleSubmit, register } = useForm()
    // const dispatch=useDispatch()



    return (
        <>
            <div className=' bg-Primary max-h-max'>
                <form className='bg-secondary  mt-[7rem]  2xl:mt-[7rem] sm-w-[40vw]  lg:mt-[2rem] rounded-md lg:h-[90vh] 2xl:h-[70vh] lg:w-[35vw]   h-[70vh] 2xl:w-[30vw] w-[70vw] mx-auto flex flex-col items-center  '>

                    <div className='pt-8'>
                        <h1 className='text-Primary  font-bold md:text-3xl text-4xl'>Login</h1>
                    </div>




                    <div className='pt-20 md:pt-16 2xl:pt-20 '>
                        <input
                            className='h-14 w-[24rem] 2xl:w-[30rem] pl-5 rounded-md'
                            type="email"
                            name="email"
                            placeholder='Email'
                            {...register('username', { required: true })}
                        />
                    </div>

                    <div className='pt-16 md:pt-16 2xl:pt-20 '>
                        <input
                            className='h-14 2xl:w-[30rem] w-[24rem] pl-5 rounded-md'
                            type="password"
                            name="password"
                            placeholder='Password'
                            {...register('username', { required: true })}
                        />
                    </div>


                    <div className='pt-12'>
                        <button className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Login In</button>
                    </div>

                    <div className='pt-6 text-md font-bold  text-Primary'>
                        <p>No Account?Singup</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
