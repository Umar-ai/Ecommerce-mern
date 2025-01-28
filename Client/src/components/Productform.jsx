import React from 'react'
import { useForm } from 'react-hook-form'
// import login from '../ReduxToolkit/authSlice'
// import {useDispatch} from 'react-redux'

function Productform() {
    const { handleSubmit, register } = useForm()



    return (
        <>
            <div className=' bg-Primary max-h-max'>
                <form className='bg-secondary  mt-[7rem]  2xl:mt-[4rem] sm-w-[40vw]  lg:mt-[1rem] rounded-md lg:h-[100vh] 2xl:h-[80vh] lg:w-[35vw]   h-[70vh] 2xl:w-[25vw] w-[70vw] mx-auto flex flex-col items-center  '>

                    <div className='pt-4'>
                        <h1 className='text-Primary  font-bold md:text-3xl text-4xl'>Product-Form</h1>
                    </div>


                    <div className='pt-6 md:pt-6 2xl:pt-10  '>
                        <input
                            className='h-10 pl-5 w-[22rem] rounded-md text-secondary '
                            type="text"
                            name="username"
                            placeholder='Name'
                            {...register('name', { required: true })}
                        />

                    </div>

                    <div className='pt-6 md:pt-4 2xl:pt-10 '>
                        <input
                            className='h-10 w-[22rem] pl-5 rounded-md'
                            type="text"
                            name="description"
                            placeholder='Description'
                            {...register('description', { required: true })}
                        />
                    </div>

                    <div className='pt-6 md:pt-4 2xl:pt-10 '>
                        <input
                            className='h-10 w-[22rem] pl-5 rounded-md'
                            type="text"
                            name="category"
                            placeholder='Category'
                            {...register('category', { required: true })}
                        />
                    </div>

                    <div className='pt-6 md:pt-4 2xl:pt-10 '>
                        <input
                            className='h-10 w-[22rem] pl-5 rounded-md'
                            type="number"
                            name="price"
                            placeholder='Price'
                            {...register('price', { required: true })}
                        />
                    </div>
                    <div className='pt-6 md:pt-4 2xl:pt-10 '>
                        <input
                            className='h-10 w-[22rem] pl-5 rounded-md'
                            type="number"
                            name="Stock"
                            placeholder='Stock'
                            {...register('stock', { required: true })}
                        />
                    </div>
                    <div className='flex gap-8 '>

                    <div className="pt-6 flex  md:pt-4 2xl:pt-10">
                    <select className='rounded-md px-5 py-2 text-xl font-bold' name="brand" {...register('brand',{required:true})} >
                        <option value="">Brand</option>
                        <option value="">tecno</option>
                        <option value="">infinix</option>
                        <option value="">samsung</option>
                        <option value="">apple</option>
                        <option value="">realme</option>
                    </select>
                    </div>
                    <div className="pt-6 flex  md:pt-4 2xl:pt-10">
                    <select name="brand" className='rounded-md px-5 py-2 text-xl font-bold' {...register('brand',{required:true})} >
                        <option value="">Color</option>
                        <option value="">Red</option>
                        <option value="">Blue</option>
                        <option value="">Yelloe</option>
                        <option value="">White</option>
                        <option value="">Black</option>
                    </select>
                    </div>
                    </div>


                    <div className='pt-6 md:pt-4 2xl:pt-8'>
                        <input {...register('avatar', { required: true })} type="file" multiple className='border-2 rounded-lg border-white placeholder-gray-100 bg-secondary text-Primary pl-10 py-2 px-7 w-[22rem] ' />

                    </div>

                    <div className='pt-8 2xl:pt-4 md:pt-3'>
                        <button className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Submit</button>
                    </div>

                    
                </form>
            </div>
        </>
    )
}

export default Productform
