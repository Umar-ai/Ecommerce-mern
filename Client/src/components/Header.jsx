import React from 'react'
import Search from './Search'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaClipboardList,FaPlus } from 'react-icons/fa';
import Logout from './Logout'

function Header() {
  const navigate = useNavigate()
  const status = useSelector((state) => state.auth?.status)
  const isAdmin = useSelector((state) => state.auth?.isAdmin)
  console.log(status)
  return (
    <div className='flex   justify-around items-center  2xl:h-[11vh] md:h-[12vh] bg-secondary text-Primary'>
      <div>
        <button onClick={() => navigate('/')}><h1 className='font-bold text-2xl text-Primary'>North-Store</h1></button>
      </div>
      <div ><Search /></div>
      <div>
        <button onClick={() => navigate('/login')} className={` ${status == false ? "inline" : "hidden"} text-xl bg-accent py-1 hover:text-primary hover:border-accent hover:border-2  hover:bg-secondary rounded-md px-4 ml-20`}>Login Up</button>
        <button onClick={() => navigate('/signup')} className={`${status == false ? "inline" : "hidden"} text-xl ml-7 py-1 px-4 hover:border-0 rounded-md hover:bg-accent hover:text-Primary text-primary border-2 border-accent`}>Sign UP</button>
        <button onClick={() => navigate('/admin_orders')} className={`${isAdmin == true ? "inline" : "hidden"} text-3xl   ml-7 py-1 px-4 font-semibold text-white   rounded-md  `}><FaClipboardList /></button>
        <button onClick={() => navigate('/admin_productForm')} className={`${isAdmin == true ? "inline" : "hidden"} text-3xl   ml-7 py-1 px-4 font-semibold text-white   rounded-md  `}><FaPlus /></button>
        <button onClick={() => navigate('/login')} className={`${status == true ? "inline" : "hidden"} text-3xl   ml-7 py-1 px-4 font-semibold text-white   rounded-md  `}><Logout /></button>
        <button onClick={() => navigate('/cart')} className={`${status == true ? "inline" : "hidden"} text-3xl   ml-7 py-1 px-4 font-semibold text-white bg-accent  rounded-md  `}><FaShoppingCart /></button>

      </div>
    </div>
  )
}

export default Header
