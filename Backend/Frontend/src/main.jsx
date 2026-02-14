import React, { StrictMode } from 'react'
import ReactDOM,{ createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || 'https://chatsphereoriginal.onrender.com';
axios.defaults.withCredentials = true;
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import {SocketProvider} from './context/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
      <App />
     </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
)
