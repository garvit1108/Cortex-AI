import React, { useEffect } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import useCurrentUser from './hooks/useCurrentUser'
function App() {
  useCurrentUser()
 
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
