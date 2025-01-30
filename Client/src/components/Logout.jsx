import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logout } from '../ReduxToolkit/authSlice'
function Logout() {
    const dispatch=useDispatch()

    const handleLogout=async()=>{
        try {
            const response=await axios.post('http://localhost:8000/api/v1/users/logout',{},{withCredentials:true})
            console.log(response)
        } catch (error) {
            console.log("something went wrong while logging out",error)
        }
    }

  return (
    <div>
      <button onClick={handleLogout} className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Logout</button>
    </div>
  )
}

export default Logout
