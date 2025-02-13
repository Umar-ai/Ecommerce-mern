import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import { useSelector } from 'react-redux';


function Cart() {
    const userid = useSelector((state) => state.auth.userData._id)
    const [cartitem, setcartitems] = useState([])
    const [showMessage,setshowMessage]=useState(false)
    const [loading,setloading]=useState(false)
    const[update,setupdate]=useState(0)

    const decreaseit=async(id)=>{
        try {
     setloading(true)
            const response=await axios.post(`http://localhost:8000/api/v1/cart/decreasecart/${id}`,{},{withCredentials:true})
            if(response){
                setupdate(update+1)
            }
        } catch (error) {
            console.log("something went wrong while increasing the amount of products in the cart",error)
        }
    }
    const increaseit=async(id)=>{
        try {
            setloading(true)
            const response=await axios.post(`http://localhost:8000/api/v1/cart/increasecart/${id}`,{},{withCredentials:true})
            if(response){
                setupdate(update+1)
            }
        } catch (error) {
            console.log("something went wrong while increasing the amount of products in the cart",error)
        }
    }
    const deleteCart=async()=>{
        setloading(true)
        try {
           const response= await axios.post(`http://localhost:8000/api/v1/cart/deletecart`,{},{withCredentials:true})
           if(response){
            setupdate(update+1)
           }
            
        } catch (error) {
            console.log("something went wrong while deleting the cart",error)
        }
    }

    useEffect(() => {
        const getCartitem = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/users/userCart', {}, { withCredentials: true })
                if (response) {
                    setcartitems(response.data.data.cart)
                    setloading(false)
                }
            } catch (error) {
                console.log("Something went wrong while getting the products data", error)
            }
        }
        getCartitem()
    }, [update])

    if(loading){
        return (
          <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#2d3142" loading={loading} size={100} />
           </div>
        )
      }


    return (
        < >
            <div className='w-[90vw] mx-auto '>
                <div className='flex justify-between items-center'>
                    <h1 className='text-4xl ml-2 font-bold '>Cart</h1>
                    <button onClick={deleteCart} className='text-2xl mr-3'><FaTrash /></button>
                </div>
                {
                    cartitem.length>=1?(<div>
                        {cartitem?.map((val) => (
                    <div className='flex gap-4 rounded-md  mt-2 h-[8rem]  bg-[#36454F]' key={val._id}>
                        <img className='h-[12vh] md:h-[20vh] ml-2 mt-2' src={val.productId.images[0]} alt="" />
                        <div className='md:flex md:flex-grow '>
                            <p className='text-xl md:mt-5 flex-shrink-0 md:flex-grow md:text-3xl text-Primary '>{val.productId.name}</p>
                            <div className='md:mr-4 md:mt-5  '>

                                <div className='flex gap-2 '>
                                    <p className='font-bold md:text-3xl text-accent text-2xl'>{val.productId.price}</p>
                                    <p className='bg-accent md:text-lg text-Primary rounded-md py-1 px-2'>-10%</p>
                                </div>
                                <div >
                                    <p className='font-extralight md:text-xl  text-Primary  line-through'>{val.productId.price + 100}</p>
                                    <p className='text-Primary md:mt-1 md:ml-5'><button onClick={()=>decreaseit(val.productId._id)} className='bg-accent mr-2 text-Primary h-8 w-8 rounded-full px-2'>-</button>{val.quantity}<button onClick={()=>increaseit(val.productId._id)} className='bg-accent ml-2 text-Primary h-8 w-8 rounded-full px-2'>+</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                    </div>):(<div className='text-center md:mt-[10rem] md:text-5xl font-bold'>Cart is empty</div>)
                }
            </div>
        </>
    )
}

export default Cart
