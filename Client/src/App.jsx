import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'
import Products_details from './components/Products_details'
function App() {

  return (
    <>
   <Header/>
   <Outlet/>
   <Footer/>
   {/* <Products_details/> */}
    </>
  )
}

export default App
