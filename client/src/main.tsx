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
import Lists from './pages/Lists.tsx'
import store, { persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AllLists from './pages/AllLists.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/lists',
    element: <Lists />
  },
  {
    path: '/calculator',
    element: <Calculator />
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
    path: '/allLists',
    element: <AllLists />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate persistor={persistor}> 
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
