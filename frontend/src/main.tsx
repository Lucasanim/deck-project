import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store/Store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
