import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Form from '../components/Form'
import NotFound from '../components/NotFound'
function CustomRoutes() {
  return (
    <>
    <Routes>
        <Route exact path='/' element={<Form/>} />
        <Route exact path='*' element={<NotFound/>} />
    </Routes>
    </>
  )
}

export default CustomRoutes