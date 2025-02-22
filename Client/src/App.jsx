import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'
import Products_details from './components/Products_details'
import Adressform_page from './Pages/Adressform_page'
import LoginPage from './Pages/LoginPage'
import { useSelector } from 'react-redux'
function App() {


  return (
    <>
    
   <Header/>
   <Outlet/>
   <Footer/>
    </>
  )
}

export default App
