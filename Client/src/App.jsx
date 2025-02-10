import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import CHart from './components/Admin/Chart'
import AdminPanel from './components/Admin/AdminPanel'
import Productform from './components/Productform'
import AdminPanel_product from './components/Admin_product/adminpanel_product'
import Logout from './components/Logout'
import Allproducts from './components/Allproducts'
import Search from './components/Search'
import Filter from './components/Filter'
import Producwithfilter from './Pages/Producwithfilter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Producwithfilter/>
    </>
  )
}

export default App
