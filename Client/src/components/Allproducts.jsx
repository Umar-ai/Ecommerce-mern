import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ProductMang, resetPurpose, Addto_Cart } from '../ReduxToolkit/productreducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
function Allproducts() {

  const dispatch = useDispatch()
  const prodcutsData = useSelector((state) => state.product?.productsData)
  const status = useSelector((state) => state.auth.status)
  const [loader, setloader] = useState(false)
  const [showmessage, setshowmessage] = useState(false)
  const navigate = useNavigate()

  const product_overView = (id) => {
    
    console.log(id)
    navigate(`/detail/${id}`)
  }

  const cartHandler = async (product) => {
    try {
      if (!status) {
        navigate('/login')
        return 
      }
      await axios.post(`http://localhost:8000/api/v1/cart/addtocart/${product._id}`, {}, { withCredentials: true })
      
      setshowmessage(true)
      setTimeout(() => {
        setshowmessage(false)
      }, 500);
    } catch (error) {
      console.log("Something went wrong while adding product to user cart", error)
    }
  }


  useEffect(() => {
    const all_product = async () => {
      setloader(true)
      const response = await axios.post('http://localhost:8000/api/v1/products/allproducts')
      if (response) {
        dispatch(ProductMang(response.data.data))
        dispatch(resetPurpose(response.data.data))
        setloader(false)
      }
      else {
        alert("Something went wrong while fetching data from the all products api")
      }

    }
    all_product()
  }, [])
  if (loader) {
    return (

      <div className="flex  justify-center items-center relative left-[350%] min-h-screen">
        <ClipLoader color="#2d3142" loading={loader} size={100} />
      </div>
    )

  }
  return (
    <>
      <div>
        {showmessage && (
          <div className=' md:ml-4  md:h-10 rounded-md pt-1 mt-2 bg-accent text-Primary text-center text-2xl font-semibold'>
            Product Added Successfully
          </div>
        )}
      </div>
      <div className='grid  bg-[#FAF0E6]   md:grid-cols-4 2xl:grid-cols-5 grid-cols-2' >
        {prodcutsData?.map((product) => (

          <div className='h-[26rem]  bg-Primary mt-4 w-[15rem] mr-9 rounded-md ml-5' key={product._id}>
            <img onClick={() => product_overView(product._id)} alt='latest phone images' className=' mt-6 ml-4 w-[12rem]' src={product.images[0]} />
            <p onClick={() => product_overView(product._id)} className='mt-2 ml-4 text-xl font-semibold '>{product.name}</p>
            <div className='flex gap-2'>
              <p onClick={() => product_overView(product._id)} className='mt-2 ml-4 text-xl font-semibold  '>☆☆☆☆☆</p>
              <p className='bg-accent md:text-md h-7 mt-2 pt-1 text-Primary rounded-md  px-1'>-10%</p>
            </div>
            <div className='flex justify-center mt-[2rem] items-center gap-[4rem] '>
              <div>
                <p className='text-xl line-through font-light   ml-1 '>{product.price + 50}$</p>
                <p className='text-2xl font-semibold ml-1 '>{product.price}$</p>

              </div>
              <button onClick={() => cartHandler(product)} className='bg-accent rounded-lg  text-Primary px-4 py-2 text-4xl '><FaShoppingCart /></button>
            </div>
          </div>
        )

        )}

      </div>
    </>
  )
}

export default Allproducts
