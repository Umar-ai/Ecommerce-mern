import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './ReduxToolkit/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LazyLoadWrapper from './components/Lazyloading.jsx'
import Productform_Page from './Pages/productform_Page.jsx'
import OrderSuccesspage from './Pages/OrderSuccesspage.jsx'

const Home = lazy(() => import('./Pages/Producwithfilter.jsx'))
const Details = lazy(() => import('./Pages/ProductDetails.jsx'))
const Login_Page = lazy(() => import('./Pages/LoginPage.jsx'))
const Cart_page = lazy(() => import('./Pages/Cart_page.jsx'))
const Signup_page = lazy(() => import('./components/Signup.jsx'))
const Address_form = lazy(() => import('./Pages/Adressform_page.jsx'))
const Order_page = lazy(() => import('./Pages/Order_page.jsx'))
const All_orders = lazy(() => import('./components/Admin/All_orders.jsx'))
const OrderrSuccess_Page=lazy(()=>import('./Pages/OrderSuccesspage.jsx'))

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: (
          <LazyLoadWrapper>
            <Home />
          </LazyLoadWrapper>

        ),
        path: '/'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Login_Page />
          </LazyLoadWrapper>
        ),
        path: '/login'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Cart_page />
          </LazyLoadWrapper>
        ),
        path: '/cart'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Signup_page />
          </LazyLoadWrapper>
        ),
        path: '/signup'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Details />
          </LazyLoadWrapper>
        ),
        path: '/detail/:id'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Order_page />
          </LazyLoadWrapper>
        ),
        path: '/order_page'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Address_form />
          </LazyLoadWrapper>
        ),
        path: '/address_form'
      },
      {
        element: (
        <LazyLoadWrapper>
          <OrderrSuccess_Page/>
        </LazyLoadWrapper>
        ) ,    
        path: '/order_success'
      },
      //!admin 
      {
        element: (
          <LazyLoadWrapper>
            <All_orders />
          </LazyLoadWrapper>
        ),
        path: '/admin_orders'
      },
      {
        element: (
          <LazyLoadWrapper>
            <Productform_Page />
          </LazyLoadWrapper>
        ),
        path: '/admin_productForm'
      },

    ]

  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}

)

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </StrictMode>,
)
