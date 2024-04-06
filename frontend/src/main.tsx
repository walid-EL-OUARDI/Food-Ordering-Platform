import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider as Router } from 'react-router-dom'
import {router} from './AppRoutes';
import "./global.css"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Router router={router} />
  </React.StrictMode>,
)
