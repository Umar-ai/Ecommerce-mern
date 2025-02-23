import React, { useEffect, useState } from 'react'
import axios from 'axios'
function All_orders() {
  const [all_orders, setall_orders] = useState([])
  const [update, setupdate] = useState(0)
  useEffect(() => {
    const All_Orders = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/order/all_orders", {}, { withCredentials: true })
        if (response) { 
          console.log(response.data.data)
          setall_orders(response.data.data)
        }
      } catch (error) {
        console.log("something went wrong while getting all orders data", error)
      }
    }
    All_Orders()
  }, [update])

  const filter = async (status) => {
    if (status == "delivered") {
      setall_orders((prev) => prev.filter((val) => val.isDelivered == true))
    }
    else if (status == "cancelled") {
      setall_orders((prev) => prev.filter((val) => val.isCancelled = true))

    }
    else if (status == "pending") {

      setall_orders((prev) => prev.filter((val) => val.isCancelled==false&&val.isDelivered == false))
    }
    else if(status=="reset") {
      const response = await axios.post("http://localhost:8000/api/v1/order/all_orders", {}, { withCredentials: true })
      if (response) {
        setall_orders(response.data.data)
      }
    }

  }
  const deliveryhandler = async (id, status_boolean) => {
    if (status_boolean == true) {
      const response = await axios.post(`http://localhost:8000/api/v1/order/changeStatus/${id}`, {}, { withCredentials: true })
      if (response) {
        setall_orders((prev) => prev.filter((val) => val._id !== id))
        setupdate(update + 1)
      }
    }
    else {
      const response = await axios.post(`http://localhost:8000/api/v1/order/cancel_Order/${id}`, {}, { withCredentials: true })
      if (response) {
        setall_orders((prev) => prev.filter((val) => val._id !== id))
        setupdate(update + 1)
      }
    }
  }


  return (
    <div>
      <h1 className='ml-10    text-center font-bold text-3xl'>All Orders</h1>
      <div className='ml-20 flex mt-2  items-center gap-10 '>
        <button onClick={()=>filter("delivered")} className='py-1 px-5 bg-black text-white'>Delivered</button>
        <button onClick={()=>filter("cancelled")} className='py-1 px-5 bg-black text-white'>Cancelled</button>
        <button onClick={()=>filter("pending")} className='py-1 px-5 bg-black text-white'>Pending</button>
        <button onClick={()=>filter("reset")} className='py-1 px-5 bg-accent text-white'>Reset</button>
      </div>
      {
        all_orders.length >= 1 ? (<div>
          {all_orders?.map((val) => (
            <div className='flex gap-4 rounded-md border-2 border-b-2 border-black border-t-0 border-r-0 border-l-0  mt-2 h-[5rem]  bg-Primary' key={val._id}>
              <div className='flex gap-[42rem] '>
                <div className='flex'>
                  <img className='h-[12vh]  2xl:h-[11vh] md:h-[12vh] ml-16 ' src={val.product_id.images[0]} alt="" />
                  <div className='md:flex flex-col md:flex-grow '>
                    <p className='text-md md:mt-5 flex-shrink-0 md:flex-grow md:text-xl text-black '>{val.product_id.name}</p>
                    <div className='md:mr-4   '>

                      <div className='flex gap-2 '>
                        <p className='font-bold md:text-xl text-black  text-2xl'>{val.order_price}<sup>$</sup></p>
                        <p className='text-black font-semibold text-sm  md:ml-5'>Quantity:{val.order_quantity}</p>
                      </div>

                    </div>
                  </div>
                </div>
                {val.isCancelled == true ? (<button className='bg-red-500 text-Primary ml-[8rem] mt-8 h-[2rem] px-4'>Cancelled</button>) : (
                  <div> {val.isDelivered == true ? (<button onClick={() => deliveryhandler(val._id, true)} className='bg-green-500 text-Primary mt-8 ml-[8rem]  px-4 h-[2rem]'>Delivered</button>) : (<div className='flex gap-10'>
                    <button onClick={() => deliveryhandler(val._id, true)} className='bg-accent text-Primary mt-8  px-4 h-[2rem]'>Delivered</button>
                    <button onClick={() => deliveryhandler(val._id, false)} className='bg-accent text-Primary mt-8 h-[2rem] px-4'>Cancelled</button>
                  </div>)}</div>
                )}






              </div>
            </div>
          ))}
        </div>) : (<div className='text-center md:mt-[10rem] md:text-5xl font-bold'>Cart is empty</div>)
      }
    </div>
  )
}

export default All_orders
