import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import New from './components/New/New'
import Home from './pages/Home'
import NewsArchived from './pages/NewsArchived'


const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/create' element={<New />} />
        <Route path='/news-archived' element={<NewsArchived />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router