import React from 'react'
import { useForm, } from 'react-hook-form'
import axios from 'axios'


function Productform() {
    const { handleSubmit, register } = useForm()

    const producthandler = async (data) => {
        const productdetails = new FormData()
        productdetails.append('name', data.name)
        productdetails.append('description', data.description)
        productdetails.append('category', data.category)
        productdetails.append('price', data.price)
        productdetails.append('stock', data.stock)
        productdetails.append('brand', data.brand)
        productdetails.append('color', data.color)
        productdetails.append('one', data.imageone[0])
        productdetails.append('two',  data.imagetwo[0])
        productdetails.append('three',  data.imagethree[0])
        console.log( data.imageone[0])

        const response = await axios.post(`http://localhost:8000/api/v1/products/create`, productdetails, { withCredentials: true })
        console.log(response)
    }




    return (
        <>
            <div className=' bg-Primary max-h-max'>
                <form onSubmit={handleSubmit(producthandler)} className='bg-secondary  mt-[5rem]  2xl:mt-[4rem] sm-w-[40vw]  lg:mt-[1rem] rounded-md lg:h-[100vh] 2xl:h-[80vh] lg:w-[35vw]   h-[80vh] 2xl:w-[25vw] w-[80vw] mx-auto flex flex-col items-center  '>

                    <div className='pt-1'>
                        <h1 className='text-Primary  font-bold md:text-3xl text-4xl'>Product-Form</h1>
                    </div>


                    <div className='pt-6 md:pt-3 2xl:pt-6  '>
                        <input
                            className='h-10 md:h-8  2xl:h-12 pl-5 w-[22rem] rounded-md text-secondary '
                            type="text"
                            name="username"
                            placeholder='Name'
                            {...register('name', { required: true })}
                        />

                    </div>

                    <div className='pt-6 md:pt-3 2xl:pt-6 '>
                        <input
                            className='h-10 md:h-8 2xl:h-12 w-[22rem] pl-5 rounded-md'
                            type="text"
                            name="description"
                            placeholder='Description'
                            {...register('description', { required: true })}
                        />
                    </div>

                    <div className='pt-6 md:pt-3 2xl:pt-6 '>
                        <input
                            className='h-10 md:h-8 2xl:h-12 w-[22rem] pl-5 rounded-md'
                            type="text"
                            name="category"
                            placeholder='Category'
                            {...register('category', { required: true })}
                        />
                    </div>

                    <div className='pt-6 md:pt-3 2xl:pt-6 '>
                        <input
                            className='h-10 md:h-8 2xl:h-12 w-[22rem] pl-5 rounded-md'
                            type="number"
                            name="price"
                            placeholder='Price'
                            {...register('price', { required: true })}
                        />
                    </div>
                    <div className='pt-6 md:pt-3 2xl:pt-6 '>
                        <input
                            className='h-10 md:h-8 2xl:h-12 w-[22rem] pl-5 rounded-md'
                            type="number"
                            name="Stock"
                            placeholder='Stock'
                            {...register('stock', { required: true })}
                        />
                    </div>
                    <div className='flex gap-8 '>
                        <div className="pt-6  flex  md:pt-3 2xl:pt-6">
                            <select className=' 2xl:h-10 rounded-md md:text-lg px-5 py-2 md:h-9 text-xl font-bold'  {...register('brand', { required: true })} >
                                <option value="">Brand</option>
                                <option value="tecno">tecno</option>
                                <option value="infinix">infinix</option>
                                <option value="samsung">samsung</option>
                                <option value="apple">apple</option>
                                <option value="realme">realme</option>
                            </select>
                        </div>
                        <div className="pt-6 flex  md:pt-3 2xl:pt-6">
                            <select className='rounded-md 2xl:h-10 md:h-9 px-5 py-2 md:text-lg text-xl font-bold' {...register('color', { required: true })} >
                                <option value="">Color</option>
                                <option value="Orange">Orange</option>
                                <option value="Blue">Blue</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Green">Green</option>
                                <option value="Black">Black</option>
                            </select>
                        </div>
                    </div>


                    <div className='pt-6 md:pt-2 2xl:pt-2'>

                        <input
                            {...register(`imageone`, { required: true })}
                            type="file"
                            className='border-2 rounded-lg border-white placeholder-gray-100 bg-secondary text-Primary pl-10 py-1 px-7 w-[22rem]'
                        />


                    </div>
                    <div className='pt-6 md:pt-1 2xl:pt-2'>

                        <input
                            {...register(`imagetwo`, { required: true })}
                            type="file"
                            className='border-2 rounded-lg border-white placeholder-gray-100 bg-secondary text-Primary pl-10 py-1 px-7 w-[22rem]'
                        />


                    </div>
                    <div className='pt-6 md:pt-1 2xl:pt-2'>

                        <input
                            {...register(`imagethree`, { required: true })}
                            type="file"
                            className='border-2 rounded-lg border-white placeholder-gray-100 bg-secondary text-Primary pl-10 py-1 px-7 w-[22rem]'
                        />


                    </div>

                    <div className='pt-8 2xl:pt-6 md:pt-6'>
                        <button type='submit' className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Submit</button>
                    </div>


                </form>
            </div>
        </>
    )
}

export default Productform
