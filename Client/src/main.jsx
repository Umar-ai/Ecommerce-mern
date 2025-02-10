import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './ReduxToolkit/Store.js'
import Contextprovide from './context/Contextprovide.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contextprovide>

      <Provider store={store}>
        <App />
      </Provider>

    </Contextprovide>
  </StrictMode>,
)
