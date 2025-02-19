import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import '../App.css'



function Cart() {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)



    const [cartitem, setcartitems] = useState([])
    const [loading, setloading] = useState(true)
    const [update, setupdate] = useState(0)
    const [total_price, settotal_price] = useState(0)
    const [total_quantity, settotal_quantity] = useState(0)
    const[address,setaddress]=useState(false)
    const data = total_price == 0 ? false : true

    useEffect(() => {
        const getCartitem = async () => {
            try {
                if (userData?.address !== " ") 
                    {
                        console.log("user has address")
                        setaddress(true)
                    console.log("user address",address)
                }
                const response = await axios.post('http://localhost:8000/api/v1/users/userCart', {}, { withCredentials: true })
                if (response) {
                    setcartitems(response.data.data.cart)
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
        
    }, [update])



    const handle_Order = () => {
        console.log("logging in the order function ",address)
        if (address) {
            
            alert("in order section")
            // navigate('/order_page')
        }
        else {
            navigate('/address_form')
        }
    }
    const decreaseit = async (id) => {
        try {
            setloading(true)
            const response = await axios.post(`http://localhost:8000/api/v1/cart/decreasecart/${id}`, {}, { withCredentials: true })
            if (response) {
                setupdate(update + 1)
            }
        } catch (error) {
            console.log("something went wrong while increasing the amount of products in the cart", error)
        }
    }
    const increaseit = async (id) => {
        try {
            setloading(true)
            const response = await axios.post(`http://localhost:8000/api/v1/cart/increasecart/${id}`, {}, { withCredentials: true })
            if (response) {
                setupdate(update + 1)
            }
        } catch (error) {
            console.log("something went wrong while increasing the amount of products in the cart", error)
        }
    }
    const deleteCart = async () => {
        setloading(true)
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/cart/deletecart`, {}, { withCredentials: true })
            if (response) {
                setupdate(update + 1)
            }

        } catch (error) {
            console.log("something went wrong while deleting the cart", error)
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
        < >
            <div>

                <div className='w-[90vw] mx-auto '>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-4xl ml-2 font-bold '>Cart</h1>
                        <button onClick={deleteCart} className='text-2xl mr-3'><FaTrash /></button>
                    </div>
                    {
                        cartitem.length >= 1 ? (<div>
                            {cartitem?.map((val) => (
                                <div className='flex gap-4 rounded-md border-2 border-b-2 border-black border-t-0 border-r-0 border-l-0  mt-2 h-[8rem]  bg-Primary' key={val._id}>
                                    <img className='h-[12vh]  2xl:h-[11vh] md:h-[20vh] ml-2 mt-2' src={val.productId.images[0]} alt="" />
                                    <div className='md:flex md:flex-grow '>
                                        <p className='text-xl md:mt-5 flex-shrink-0 md:flex-grow md:text-3xl text-black '>{val.productId.name}</p>
                                        <div className='md:mr-4 md:mt-5  '>

                                            <div className='flex gap-2 '>
                                                <p className='font-bold md:text-3xl text-black  text-2xl'>{val.productId.price * val.quantity}<sup>$</sup></p>
                                                <p className='bg-accent md:text-lg text-Primary rounded-md py-1 px-2'>-10%</p>
                                            </div>
                                            <div >
                                                <p className='font-extralight md:text-xl  text-Primary  line-through'>{val.productId.price + 100}</p>
                                                <p className='text-black md:mt-1 md:ml-5'><button onClick={() => decreaseit(val.productId._id)} className='bg-accent mr-2 text-Primary h-8 w-8 rounded-full px-2'>-</button>{val.quantity}<button onClick={() => increaseit(val.productId._id)} className='bg-accent ml-2 text-Primary h-8 w-8 rounded-full px-2'>+</button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>) : (<div className='text-center md:mt-[10rem] md:text-5xl font-bold'>Cart is empty</div>)
                    }
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
                                <div className='flex text-xl  mt-5 gap-[16rem]'>
                                    <p className='font-bold ' >Number of Products</p>
                                    <p className='font-semibold'> {total_quantity}</p>
                                </div>
                                <div className='border-1 border-b-2 mt-5 w-[40vw] border-black'>

                                </div>

                                <div className='flex text-xl mt-5 gap-[20rem]'>
                                    <p className='font-bold ' >Total</p>
                                    <p className='font-semibold'>{total_price}<sup>$</sup></p>
                                </div>
                                <div>
                                    <button onClick={handle_Order} className='py-1 mt-5 px-4 bg-black text-Primary ml-[20rem]'>Proceed to checkout</button>
                                </div >

                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Cart
