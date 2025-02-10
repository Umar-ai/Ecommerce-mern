import React from 'react'
import axios from 'axios'
import { FaShoppingCart} from 'react-icons/fa';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ProductMang,resetPurpose } from '../ReduxToolkit/productreducer';
function Allproducts() {

  const dispatch = useDispatch()
  const prodcutsData = useSelector((state) => state.product?.productsData)



  useEffect(() => {
    const all_product = async () => {
      const response = await axios.post('http://localhost:8000/api/v1/products/allproducts')
      if (response) {
        dispatch(ProductMang(response.data.data))
        dispatch(resetPurpose(response.data.data))
      }
      else {
        alert("Something went wrong while fetching data from the all products api")
      }

    }
    all_product()
  }, [])
  return (
    <div className='grid  bg-[#FAF0E6]   md:grid-cols-4 2xl:grid-cols-5 grid-cols-2' >
      {prodcutsData?.map((product) => (

        <div className='h-[26rem]  bg-Primary mt-4 w-[15rem] mr-9 rounded-md ml-5' key={product._id}>
          <img className=' mt-6 ml-4 w-[12rem]' src={product.images[0]} />
          <p className='mt-2 ml-4 text-xl font-semibold '>{product.name}</p>
          <p className='mt-2 ml-4 text-xl font-semibold  '>☆☆☆☆☆</p>
          <div className='flex justify-center mt-[2rem] items-center gap-[4rem] '>
            <div>
              <p className='text-xl line-through font-light   ml-1 '>{product.price + 50}$</p>
              <p className='text-2xl font-semibold ml-1 '>{product.price}$</p>

            </div>
            <button className='bg-accent rounded-lg  text-Primary px-4 py-2 text-4xl '><FaShoppingCart /></button>
          </div>
        </div>
      )

      )}

    </div>
  )
}

export default Allproducts
