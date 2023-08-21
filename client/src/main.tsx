import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './scss/index.scss'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import About from './pages/About.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Calculator from './pages/Calculator.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/calculator',
    element: <Calculator />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
