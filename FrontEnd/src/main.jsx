import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import HomePage from './Pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/login/Login';
import Signup from './Pages/Signup/Signup';
import { AuthProvider } from './Pages/AuthContext';

let allrouters = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={allrouters} />
    </AuthProvider>
  </StrictMode>,
)
