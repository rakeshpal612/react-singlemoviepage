import React from 'react'
import Home from './Home'
import Error from './Error'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleMovie from './SingleMovie';
import "./App.css";

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<SingleMovie />} />
          <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App