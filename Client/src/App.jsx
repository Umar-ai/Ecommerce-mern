import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { login, checkAdmin } from './ReduxToolkit/authSlice'
import { useDispatch } from 'react-redux'
function App() {
 

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
