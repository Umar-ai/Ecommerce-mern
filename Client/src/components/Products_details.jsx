import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { change_reviewStatus } from '../ReduxToolkit/authSlice'

function Products_details() {
  const [details, setdetails] = useState([])
  const [Images, setimages] = useState([])
  const [loading, setloading] = useState(true)
  const [mainimage, setmainimages] = useState("")
  const [rating, setrating] = useState(1)
  const [starone, setstarone] = useState("☆")
  const [startwo, setstartwo] = useState("☆")
  const [starthree, setstarthree] = useState("☆")
  const [starfour, setstarfour] = useState("☆")
  const [starfive, setstarfive] = useState("☆")
  const [review, setreview] = useState("")
  const [allowed, setisAllowed] = useState(false)
  const [user_reviews, setuser_reviews] = useState([])
  const [showmessage, setshowmessage] = useState(false)
  const [showmessage2, setshowmessage2] = useState(false)
  const [show_rating, setshow_rating] = useState(0)
  const[address,setaddress]=useState(false)

  const allow_toReview = useSelector((state) => state.auth?.userData?.reviews)//user review array
  const auth_status=useSelector((state)=>state.auth.status)
  const { id } = useParams()
  const userData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
const navigate=useNavigate()

  useEffect(() => {
    const getproduct_data = async () => {
      try {
        console.log(userData.address)
        if (userData?.address !== undefined) 
          {
              setaddress(true)
      }
        const response = await axios.post(`http://localhost:8000/api/v1/products/productdetail/${id}`)
        setdetails(response.data.data)
        console.log(response.data.data.reveiws)
        setshow_rating(Math.ceil(response.data.data.rating / response.data.data.reviews.length))
        setimages(response.data.data.images)
        setmainimages(response.data.data.images[0])
        setuser_reviews(response.data.data.reviews)
        setTimeout(() => {
          setloading(false)
        }, 500);
      } catch (error) {
        console.log("something went wrong while fetching product data")
      }
    }
    getproduct_data()
    check_ifAllow()
  }, [id])
  const image1 = Images[0]
  const image2 = Images[1]
  const image3 = Images[2]
  const cartHandler = async (status) => {
    try {
      
      if (!auth_status) {
        navigate('/login')
        return 
      }
      console.log("id in the all product", details._id)
      const response=await axios.post(`http://localhost:8000/api/v1/cart/addtocart/${details._id}`, {}, { withCredentials: true })
    if(status&&response){
        setshowmessage2(true)
      setTimeout(() => {
        setshowmessage2(false)
      }, 500);
    }
    else{
      handle_Order()
    }
    } catch (error) {
      console.log("Something went wrong while adding product to user cart", error)
    }
  }
  const handle_Order = () => {
    console.log(address)
    if (address) {

        navigate('/order_page')
    }
    else {
        navigate('/address_form')
    }
}
  const changeMain_image = (image) => {
    setmainimages(image)
  }
  const check_ifAllow = () => {
    allow_toReview?.map((val) => {
      if (val.productId == id) {
        setisAllowed(true)
      }
    }
    )
  }
  const reviewHandler = async () => {
    try {
      setshowmessage(true)
      const data = {
        rating,
        review
      }
      const response = await axios.post(`http://localhost:8000/api/v1/products/addReview/${id}`, data, { withCredentials: true })
      if (response) {
        dispatch(change_reviewStatus(id))
        setisAllowed(false)
      }
      setTimeout(() => {
        setshowmessage(false)
      }, 500);
    } catch (error) {
      console.log("something went wrong while doing the review", error)
    }
  }
  const addrating = (val) => {
    setrating(val)
    if (val == 1) {
      setstarone("☆")
      setstartwo("☆")
      setstarthree("☆")
      setstarfour("☆")
      setstarfive("☆")
      setstarone("★")
    }
    else if (val == 2) {
      setstarone("☆")
      setstartwo("☆")
      setstarthree("☆")
      setstarfour("☆")
      setstarfive("☆")
      setstarone("★")
      setstartwo("★")
    }
    else if (val == 3) {
      setstarone("☆")
      setstartwo("☆")
      setstarthree("☆")
      setstarfour("☆")
      setstarfive("☆")
      setstarone("★")
      setstartwo("★")
      setstarthree("★")
    }
    else if (val == 4) {
      setstarone("☆")
      setstartwo("☆")
      setstarthree("☆")
      setstarfour("☆")
      setstarfive("☆")
      setstarone("★")
      setstartwo("★")
      setstarthree("★")
      setstarfour("★")

    }
    else if (val == 5) {
      setstarone("☆")
      setstartwo("☆")
      setstarthree("☆")
      setstarfour("☆")
      setstarfive("☆")
      setstarone("★")
      setstartwo("★")
      setstarthree("★")
      setstarfour("★")
      setstarfive("★")
    }
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#2d3142" loading={loading} size={100} />
      </div>
    )
  }

  return (
    <>
      <div>
        {showmessage && (
          <div className=' md:ml-4  md:h-10 rounded-md pt-1 mt-2 bg-accent text-Primary text-center text-2xl font-semibold'>
            Review Added Successfully
          </div>
        )}
        {showmessage2&& (
          <div className=' md:ml-4  md:h-10 rounded-md pt-1 mt-2 bg-accent text-Primary text-center text-2xl font-semibold'>
            Product Added Successfully
          </div>
        )}
      </div>
      <div className='flex ml-10 justify-center overflow-x-hidden flex-col items-start gap-10'>
        <div className='md:flex gap-10'>
          <div className='flex 2xl:flex-row md:flex-col'>

            <div className='ml-10 rounded-md flex flex-grow 2xl:h-[70vh] md:h-[80vh] mt-2 md:border-2 '>
              <img className='h-[45vh] pt-3 md:h-[65vh]' src={mainimage} alt="" />
            </div>

            <div className='flex flex-col 2xl:flex-col md:flex-row gap-4 md:gap-10 mt-2'>
              <img className='md:h-[12vh] md:ml-9 2xl:h-[8vh] 2xl:w-[4vw] h-[10vh] border-1 border-black border-opacity-[0.2]' onClick={() => changeMain_image(image1)} src={image1} alt="" />
              <img className='md:h-[12vh] 2xl:ml-9 2xl:h-[8vh] 2xl:w-[4vw]  h-[10vh] border-1 border-black border-opacity-[0.2]' onClick={() => changeMain_image(image2)} src={image2} alt="" />
              <img className='md:h-[12vh] 2xl:ml-9 2xl:h-[8vh] 2xl:w-[4vw]  h-[10vh] border-1 border-black border-opacity-[0.2]' onClick={() => changeMain_image(image3)} src={image3} alt="" />
            </div>
          </div>
          <div className='flex flex-col mt-4 gap-8'>

            <div>
              <p className='text-2xl font-semibold '>{details.name}</p>
            </div>
            <div className='flex items-center gap-36'>
              <div className='flex flex-col gap-3'>
                <p className='text-xl'>North-Store Price</p>
                <div>
                  <p className='font-bold text-3xl'>
                    {show_rating == 1 ? "★☆☆☆☆" : (show_rating == 2 ? "★★☆☆☆" : (show_rating == 3 ? "★★★☆☆" : (show_rating == 4 ? "★★★★☆" : "★★★★★")))}
                  </p>
                </div>
                <p className='text-2xl font-bold'><sup>$</sup> {details.price}</p>
                <p className='line-through font-extralight'><sup>Rs</sup> {details.price + 100}</p>
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
              <button onClick={()=>cartHandler(true)}  className='bg-accent text-Primary py-2 px-5 rounded-md'>Add to Cart</button>
              <button onClick={()=>cartHandler(false)} className=' text-accent border-2 border-accent py-2 px-5 rounded-md'>Check Out</button>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div>
        {allowed && (
          <div>
            <div className='flex ml-3 gap-1'>
              <input value={review} onChange={(e) => setreview(e.target.value)} className='border-2 border-black p-2 ' type="text" placeholder='...' name="" id="" />
              <button className='bg-accent text-white py-1 px-9' onClick={reviewHandler}>Submit</button>
            </div>
            <div className='ml-2 text-3xl'>
              <button onClick={() => addrating(1)}><p>{starone}</p></button>
              <button onClick={() => addrating(2)}><p>{startwo}</p></button>
              <button onClick={() => addrating(3)}><p>{starthree}</p></button>
              <button onClick={() => addrating(4)}><p>{starfour}</p></button>
              <button onClick={() => addrating(5)}><p>{starfive}</p></button>

            </div>
          </div>
        )}
      </div>
      <div>
        {user_reviews.length >= 1 && (
          <div className='ml-4 max-h-max '>
            <h1 className='font-bold text-center text-4xl'>Reviews</h1>
            {user_reviews.map((val,index) => (
              <div className='flex flex-col gap-2 bg-[#FAF0E6] w-[40vw] p-3 rounded-lg mt-4 ' key={index}>
                <div className='flex gap-2'>
                  <img className='h-10 w-10 rounded-full' src={val.userId?.avatar} alt="" />
                  <div>
                  <p className=' text-xl font-semibold'>{val.userId?.username}</p>
                  <p className='font-bold text-xl'>
                    {val.rating == 1 ? "★☆☆☆☆" : (val.rating == 2 ? "★★☆☆☆" : (val.rating == 3 ? "★★★☆☆" : (val.rating == 4 ? "★★★★☆" : "★★★★★")))}
                  </p>
                  </div>
                </div>
                <div>
              
                <div>{val.comment}</div>
                </div>
              </div>
            ))}
          </div>)}

      </div>
    </>
  )
}

export default Products_details
