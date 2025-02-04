import React from 'react'
import Home from './components/home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound.jsx'

import { Toaster } from 'react-hot-toast'
import "./App.css"
function App() {
  const token = localStorage.getItem("jwt")
  return (
    <div>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
