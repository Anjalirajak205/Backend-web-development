import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SendOTP from './SendOTP'
import Home from './Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/send-otp' element={<SendOTP/>}></Route>
      </Routes>
    </div>
  )
}

export default App