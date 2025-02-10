import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';


function Search() {
    const [search, setsearch] = useState("")
    const [result, setresult] = useState([])

    const fetch = async (value) => {
        try {
            setresult([])
            const response = await axios.post(`http://localhost:8000/api/v1/products/allproducts?name=${value}`)
            console.log(response)
            setresult(response.data.data)
        } catch (error) {
            console.log("something went wrong while getting search data in the search component")
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search.trim()) {
                fetch(search);
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return (
        <div className='ml-[10rem] '>
            <div className='flex gap-1 border-2 w-[19rem]'>
                <input
                    className='py-2 px-8 text-md '
                    type="text"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                />
                <label className='mt-2 text-2xl text-accent font-bold' htmlFor=""><FaSearch /></label>
            </div>
            <div>
                {search && (
                    <div className='w-[60vw] md:w-[35vw] 2xl:w-[20vw]'>
                        {result.slice(0, 5).map((val) => (
                            <div className=' flex   pt-3 bg-[#FAFAFA]' key={val._id}>

                                <div className='flex gap-2 flex-grow'>
                                    <img className='w-10 h-10' src={val.images[0]} alt="" />

                                    <div className='flex-col'>
                                        <p>{val.name}</p>
                                        <p className='font-semibold'>{val.price}<sup className='font-extrabold'>$</sup></p>

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
