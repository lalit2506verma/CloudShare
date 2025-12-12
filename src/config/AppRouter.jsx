import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Landing from '../pages/Landing'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <Landing/> }/>
    </Routes>
  )
}

export default AppRouter