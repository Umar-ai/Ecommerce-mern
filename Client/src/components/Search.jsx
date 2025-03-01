import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux'
import { ProductMang } from '../ReduxToolkit/productreducer'
import { useNavigate } from 'react-router-dom';


function Search() {
    const [search, setsearch] = useState("")
    const [result, setresult] = useState([])
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const search_Results = async (value) => {
        try {
            setresult([])
            const response = await axios.post(`http://localhost:8000/api/v1/products/allproducts?name=${value}`)
            setresult(response.data.data)
        } catch (error) {
            console.log("something went wrong while getting search data in the search component")
        }
    }
    const handleKeydown = async (event) => {
        try {
            if (event.key == 'Enter') {
                console.log("umer")
                console.log("button clicked")
                navigate('/')
                setTimeout(async() => {
                    const response = await axios.post(`http://localhost:8000/api/v1/products/allproducts?name=${search}`)
                    console.log(response)
                    dispatch(ProductMang(response.data.data))
                    setsearch("")
                }, 500);
            }
        } catch (error) {
            console.log("something went wrong while fetching data on the search button clicked", error)
        }
    }
    const onSearch = async () => {
        try {


            console.log("umer")
            console.log("button clicked")
            const response = await axios.post(`http://localhost:8000/api/v1/products/allproducts?name=${search}`)
            console.log(response)
            dispatch(ProductMang(response.data.data))
            setsearch("")


        } catch (error) {
            console.log("something went wrong while fetching data on the search button clicked", error)
        }
    }
    const show_details=async(id)=>{
    try {
       navigate(`/detail/${id}`)
       setsearch("")
    } catch (error) {
        console.log("Something went wrong while showing details of the search bar items",error)
    }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search.trim()) {
                search_Results(search);
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return (
        <div className='ml-[10rem] relative  '>
            <div className='flex gap-1 rounded-md border-2 bg-Primary w-[19rem]'>
                <input
                    className='py-2 text-secondary border-0 px-8 text-md '
                    type="text"
                    onKeyDown={handleKeydown}
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                />
                <button onClick={onSearch}><label className='mt-2 text-2xl  text-accent font-bold' htmlFor=""><FaSearch /></label></button>
            </div>
            <div>
                {search && (
                    <div className='w-[60vw] absolute top-[130%]  md:w-[35vw] 2xl:w-[20vw]'>
                        {result.slice(0, 5).map((val) => (
                            <div onClick={()=>show_details(val._id)} className=' flex   pt-3 bg-[#FAFAFA]' key={val._id}>

                                <div className='flex gap-2 flex-grow'>
                                    <img className='w-10 h-10' src={val.images[0]} alt="" />

                                    <div className='flex-col'>
                                        <p className='text-black'>{val.name}</p>
                                        <p className='font-semibold text-black'>{val.price}<sup className='font-extrabold'>$</sup></p>

                                    </div>
                                </div>
                                <div className={`${val.stock > 5 ? 'text-green-500' : 'text-red-500'} mr-5 2xl:mr-5  `} >{val.stock > 5 ? "In Stock" : "Low Stock"}</div>


                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Search
