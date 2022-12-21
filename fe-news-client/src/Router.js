import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import New from './components/New/New'
import Home from './pages/Home'


const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/create' element={<New />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router