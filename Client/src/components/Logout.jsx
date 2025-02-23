import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { AiOutlineLogout } from 'react-icons/ai';
import { logout } from '../ReduxToolkit/authSlice'
function Logout() {
    const dispatch=useDispatch()

    const handleLogout=async()=>{
        try {
            const response=await axios.post('http://localhost:8000/api/v1/users/logout',{},{withCredentials:true})
            if(response){
              dispatch(logout())
            }
            console.log(response)
        } catch (error) {
            console.log("something went wrong while logging out",error)
        }
    }

  return (
    <div>
      <button onClick={handleLogout} className=' text-Primary px-16 text-3xl rounded-md font-bold py-3'><AiOutlineLogout/></button>
    </div>
  )
}

export default Logout
