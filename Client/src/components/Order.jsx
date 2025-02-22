import React, { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
function Order() {

  const [orderItems, setorderItems] = useState([])
  const [loading, setloading] = useState(false)
  const [total_price, settotal_price] = useState(0)
  const [total_quantity, settotal_quantity] = useState(0)
  const [payment_Method, setpayment_Method] = useState("cod")
  const data = true
  useEffect(() => {
    const getCartitem = async () => {
      try {

        const response = await axios.post('http://localhost:8000/api/v1/users/userCart', {}, { withCredentials: true })
        if (response) {
          setorderItems(response.data.data.cart)
          let price = []
          let quantity = []
          response.data.data.cart.map((item) => price?.push(item.productId.price * item.quantity))
          response.data.data.cart.map((item) => quantity?.push(item.quantity))

          settotal_quantity(quantity.reduce((acc, curr) => acc + curr, 0))
          settotal_price(price.reduce((acc, curr) => acc + curr, 0))
        }
        setloading(false)
      } catch (error) {
        console.log("Something went wrong while getting the products data", error)
      }
    }
    getCartitem()

  }, [])
  const handle_Order_Confirm = () => {
    let order_details
    orderItems.map(async(val) => (
      order_details={
        payment_method:payment_Method,
        order_price:val.productId.price * val.quantity,
        order_quantity:val.quantity,
        product_id:val.productId._id
      },
      await axios.post('http://localhost:8000/api/v1/order/create_order',order_details,{withCredentials:true})
    ))
    
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#2d3142" loading={loading} size={100} />
      </div>
    )
  }
  return (
    < >
      <div>

        <div className='w-[90vw] mx-auto '>
          <div className='flex justify-between items-center'>
            <h1 className='text-4xl ml-2 font-bold '>Order--Summary</h1>
          </div>
          <div>
            {orderItems?.map((val) => (
              <div className='flex gap-4 rounded-md border-2 border-b-2 border-black border-t-0 border-r-0 border-l-0  mt-2 h-[4rem]  bg-Primary' key={val._id}>
                <img className='h-[12vh]  2xl:h-[11vh] md:h-[8vh] ml-2 mt-2' src={val.productId.images[0]} alt="" />
                <div className='md:flex md:flex-grow '>
                  <p className='text-xl md:mt-5 flex-shrink-0 md:flex-grow md:text-xl text-black '>{val.productId.name}</p>
                  <div className='md:mr-4 md:mt-2  '>

                    <div className='flex  flex-col '>
                      <p className='font-bold md:text-xl text-black  text-lg'>{val.productId.price * val.quantity}<sup>$</sup></p>
                      <p className='text-black font-semibold text-sm  md:ml-5'>Quantity:{val.quantity}</p>
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>

          {
            data && (
              <div className='flex flex-col md:max-h-full  items-center  justify-center mt-4 mx-auto ml-[50%]  border-2 md:w-[40vw]'>
                <div className='bg-accent text-Primary h-[8vh] pt-1   font-bold text-lg w-[40vw] text-center '>
                  <h1 className=''>Cart Total</h1>
                </div>
                <div className='flex mt-2 text-xl gap-[20rem]'>
                  <p className='font-bold '>Sub-Total</p>
                  <p className='font-semibold '>{total_price}<sup>$</sup></p>
                </div>
                <div className='flex text-xl  mt-5 gap-[14rem]'>
                  <h1 className='font-semibold'>Payment Options</h1>
                  <select value={payment_Method} onChange={(e) => setpayment_Method(e.target.value)} className='text-md ' >
                    <option val="cod">COD</option>
                    <option val="card">Card</option>
                  </select>
                </div>
                <div className='border-1 border-b-2 mt-5 w-[40vw] border-black'>

                </div>

                <div className='flex text-xl mt-5 gap-[20rem]'>
                  <p className='font-bold ' >Total</p>
                  <p className='font-semibold'>{total_price}<sup>$</sup></p>
                </div>
                <div>
                  <button onClick={handle_Order_Confirm} className='py-1 mt-5 px-4 bg-black text-Primary ml-[20rem]'>Confirm</button>
                </div >

              </div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default Order
