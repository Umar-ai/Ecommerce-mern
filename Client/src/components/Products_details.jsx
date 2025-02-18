import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'

function Products_details() {
  const [details,setdetails]=useState({})
  const[Images,setimages]=useState([])
  const[loading,setloading]=useState(true)
  const [mainimage, setmainimages] = useState("")
  const {id} = useParams()
  useEffect(()=>{
    const getproduct_data=async()=>{
      try {
        const response=await axios.post(`http://localhost:8000/api/v1/products/productdetail/${id}`)
        setdetails(response.data.data)
        setimages(response.data.data.images)
        setmainimages(response.data.data.images[0])
        setTimeout(() => {
          setloading(false)
          
        }, 500);

        
      } catch (error) {
        console.log("something went wrong while fetching product data")
      }
    }
    getproduct_data()
  },[id])
  const image1 =Images[0]
  const image2 =Images[1]
  const image3 = Images[2]
  const changeMain_image = (image) => {
    setmainimages(image)
  }

if(loading){
  return (
    <div className="flex justify-center items-center min-h-screen">
    <ClipLoader color="#2d3142" loading={loading} size={100} />
     </div>
  )
}

  return (
    <div className='flex ml-10 justify-center overflow-x-hidden flex-col items-start gap-10'>
      <div className='md:flex gap-10'>
        <div className='flex 2xl:flex-row md:flex-col'>

          <div className='ml-10 rounded-md flex flex-grow 2xl:h-[70vh] md:h-[80vh] mt-2 md:border-2 '>
            <img className='h-[45vh] md:h-[65vh]' src={mainimage} alt="" />
          </div>

          <div className='flex flex-col 2xl:flex-col md:flex-row gap-4 md:gap-10 mt-2'>
            <img className='md:h-[12vh] md:ml-9 2xl:h-[8vh] 2xl:w-[4vw] h-[10vh] border-1 border-black border-opacity-[0.2]' onClick={() => changeMain_image(image1)} src={image1} alt="" />
            <img className='md:h-[12vh] 2xl:ml-9 2xl:h-[8vh] 2xl:w-[4vw]  h-[10vh] border-1 border-black border-opacity-[0.2]'         onClick={() => changeMain_image(image2)} src={image2} alt="" />
            <img className='md:h-[12vh] 2xl:ml-9 2xl:h-[8vh] 2xl:w-[4vw]  h-[10vh] border-1 border-black border-opacity-[0.2]'         onClick={() => changeMain_image(image3)} src={image3} alt="" />
          </div>
        </div>
        <div className='flex flex-col mt-4 gap-8'>

          <div>
            <p className='text-2xl font-semibold '>{details.name}</p>
          </div>
          <div className='flex items-center gap-36'>
            <div className='flex flex-col gap-3'>
              <p className='text-xl'>North-Store Price</p>
              <p className='text-2xl font-bold'><sup>$</sup> {details.price}</p>
              <p className='line-through font-extralight'><sup>Rs</sup> {details.price+100}</p>
            </div>
            <div>
              <h3 className='text-xl font-extralight'>Avability</h3>
              <p className='font-semibold'>In Stock</p>
            </div>
          </div>
          <div className='bg-yellow-100 rounded-md flex flex-col items-start p-4 h-24 w-[25rem]'>
            <p className='font-semibold'>☐ Add Gift Wrap</p>

            <p>Cost:<span className='font-semibold'>Rs 26,399</span></p>
            <p className='font-semibold'>Make it memorable- Add Gift Wrapping</p>
          </div>
          <div className='bg-green-100 rounded-md flex flex-col items-start p-4 h-24 w-[25rem]'>
            <p className='font-semibold'>☐ 
              2 Year Warranty</p>
            <p>Cost:<span className='font-semibold'>Rs 999</span></p>
            <p className='font-semibold'>1 Year Brand(free)+ 1 year North-store...</p>
          </div>
          <div className='flex justify-center items-center gap-10'>
            <button className='bg-accent text-Primary py-2 px-5 rounded-md'>Add to Cart</button>
            <button className=' text-accent border-2 border-accent py-2 px-5 rounded-md'>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products_details
