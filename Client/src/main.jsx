import { StrictMode,Suspense,lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ClipLoader } from 'react-spinners'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './ReduxToolkit/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Allproducts from './components/Allproducts.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import LoginPage from './Pages/LoginPage.jsx'

const Home=lazy(()=>import ('./Pages/Producwithfilter.jsx'))
const Details=lazy(()=>import('./Pages/ProductDetails.jsx'))
const Login_Page=lazy(()=>import('./Pages/LoginPage.jsx'))
const Cart_page=lazy(()=>import('./Pages/Cart_page.jsx'))





const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: (
          <Suspense fallback={   <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#2d3142"  size={100} />
                     </div>}>
            <Home/>
          </Suspense>
        ),
        path: '/'
      },
      {
        element: (
          <Suspense fallback={   <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#2d3142"  size={100} />
                     </div>}>
            <Login_Page/>
          </Suspense>
        ),
        path: '/login'
      },
      {
        element: (
          <Suspense fallback={   <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#2d3142"  size={100} />
                     </div>}>
            <Cart_page/>
          </Suspense>
        ),
        path: '/cart'
      },
      {
        element: <Signup />,
        path: '/signup'
      },
      {
        element:(
          <Suspense fallback={   <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#2d3142"  size={100} />
                     </div>}>
            <Details/>
          </Suspense>
        ),
        path:'/detail/:id'
      }

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
        {/* <App/> */}
      </Provider>

  </StrictMode>,
)
