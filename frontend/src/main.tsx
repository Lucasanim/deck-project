import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router'
import App from './App'
import './index.css'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
)
